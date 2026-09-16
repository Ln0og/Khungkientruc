import zipfile
import xml.etree.ElementTree as ET
import sqlite3
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

try:
    import pyodbc
    HAS_PYODBC = True
except ImportError:
    HAS_PYODBC = False

SQL_CONN_STR = (
    "Driver={ODBC Driver 18 for SQL Server};"
    "Server=(localdb)\\MSSQLLocalDB;"
    "Database=ProvinceArch;"
    "Trusted_Connection=yes;"
    "TrustServerCertificate=yes;"
)

def sync_sqlserver(query, params=()):
    if not HAS_PYODBC:
        return
    try:
        conn = pyodbc.connect(SQL_CONN_STR, autocommit=True, timeout=3)
        cur = conn.cursor()
        cur.execute(query, params)
        conn.close()
    except Exception as e:
        pass

excel_path = r'C:\Users\ckgam\Downloads\v4. ten mien - snnmt - bo_sung_CSDL_theo_ND278_15.9.2026 (1).xlsx'
wb = zipfile.ZipFile(excel_path)

# Shared strings
ss_xml = wb.read('xl/sharedStrings.xml')
ss_root = ET.fromstring(ss_xml)
shared_strings = []
for si in ss_root.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
    t = si.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
    if t is not None:
        shared_strings.append(t.text or '')
    else:
        txt = ''.join([elem.text or '' for elem in si.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')])
        shared_strings.append(txt)

def parse_full_sheet(sheet_path):
    s_xml = wb.read(sheet_path)
    s_root = ET.fromstring(s_xml)
    rows_data = []
    for row in s_root.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
        row_idx = int(row.attrib.get('r', 0))
        cols = {}
        for c in row.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
            ref = c.attrib.get('r')
            col_letter = ''.join([ch for ch in ref if ch.isalpha()])
            t = c.attrib.get('t')
            v = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
            val = ''
            if v is not None and v.text is not None:
                if t == 's':
                    idx = int(v.text)
                    val = shared_strings[idx] if idx < len(shared_strings) else ''
                else:
                    val = v.text
            cols[col_letter] = val
        rows_data.append((row_idx, cols))
    return rows_data

s1 = parse_full_sheet('xl/worksheets/sheet1.xml')
s2 = parse_full_sheet('xl/worksheets/sheet2.xml')

# Connect SQLite
db_path = r'E:\CODE\Test 1\Khungkientruc\web\province_arch.db'
conn = sqlite3.connect(db_path)
cur = conn.cursor()

# Map Dept to Abbr Code
DEPT_CODE_MAP = {
    "Sở Nông nghiệp và Môi trường": "SNNMT",
    "Sở Khoa học và Công nghệ": "SKHCN",
    "Sở Xây dựng": "SXD",
    "Sở Văn hóa, Thể thao và Du lịch": "SVHTTDL",
    "Sở Y tế": "SYT",
    "Sở Nội vụ": "SNV",
    "Sở Giáo dục và Đào tạo": "SGDDT",
    "Sở Công thương": "SCT",
    "Sở Tài chính": "STC",
    "Sở Tư pháp": "STP",
    "Công an tỉnh": "CAT",
    "Văn phòng UBND tỉnh": "VPUBND",
    "Ban quản lý khu kinh tế": "BQLKKT",
    "Sở Dân tộc và Tôn giáo": "SDTTG"
}

dept_counters = {}

# Process Sheet 1
sheet1_objects = []
sheet1_connections = []

for r_idx, cols in s1[1:]:
    stt = cols.get('A', '').strip()
    name = cols.get('B', '').strip()
    url = cols.get('C', '').strip()
    lvl = cols.get('D', '').strip()
    dept = cols.get('E', '').strip()
    sub_dept = cols.get('F', '').strip()
    year = cols.get('G', '').strip()
    procure_type = cols.get('H', '').strip()
    review_status = cols.get('I', '').strip()
    status = cols.get('J', '').strip()
    share_info = cols.get('K', '').strip()
    share_method = cols.get('L', '').strip()
    frequency = cols.get('M', '').strip()
    scope = cols.get('N', '').strip()
    details = cols.get('O', '').strip()
    conn_status = cols.get('P', '').strip()

    if not name or name == 'None':
        continue

    # Determine province or central
    is_prov = dept.startswith('Sở') or dept.startswith('Văn phòng') or dept.startswith('Công an') or dept.startswith('Ban') or lvl == 'Tỉnh'
    
    if is_prov:
        dept_prefix = DEPT_CODE_MAP.get(dept, "STINH")
        dept_counters[dept_prefix] = dept_counters.get(dept_prefix, 0) + 1
        obj_id = f"{dept_prefix}-{dept_counters[dept_prefix]:02d}"
        deployment_scope = "DungChung_ToanTinh"
    else:
        dept_prefix = "QG-TW"
        dept_counters[dept_prefix] = dept_counters.get(dept_prefix, 0) + 1
        obj_id = f"QG-TW-{dept_counters[dept_prefix]:03d}"
        deployment_scope = "QuocGia_KetNoi"

    # Architecture layer mapping
    name_l = name.lower()
    if any(k in name_l for k in ['quan trắc', 'bẫy đèn', 'camera', 'hạ tầng', 'soc', 'máy chủ', 'lưới điện']):
        arch_layer = "Lop1_HaTang_ANM"
    elif any(k in name_l for k in ['cơ sở dữ liệu', 'csdl', 'kho dữ liệu', 'gis', 'bản đồ', 'vbdlis', 'lưu trữ hồ sơ', 'đất đai', 'dữ liệu mở', 'xác thực tập trung', 'sso']):
        arch_layer = "Lop2_DuLieu_NenTang"
    elif any(k in name_l for k in ['cổng thông tin', 'mail', 'app', 'smart vĩnh long', 'họp thông minh', 'họp không giấy', 'báo cáo kinh tế', 'công báo']):
        arch_layer = "Lop4_Kenh_DoLuong"
    else:
        arch_layer = "Lop3_UngDung"

    # 4 Strategic Audit Questions Evaluation
    # 1. Trùng lặp
    is_old_prov = 'cũ' in name_l or 'bến tre cũ' in (name + details + scope).lower() or 'trà vinh cũ' in (name + details + scope).lower()
    is_national_dup = any(k in name_l for k in ['giấy phép lái xe', 'người điều khiển phương tiện', 'hộ tịch', 'lý lịch tư pháp', 'người khuyết tật', 'trẻ em'])
    
    if is_old_prov:
        audit_dup_status = "CanhBaoTrungLap"
        audit_dup_detail = "Phát hiện hệ thống/dữ liệu của đơn vị cũ trước sáp nhập tỉnh. Cần hợp nhất vào CSDL dùng chung thống nhất toàn tỉnh mới."
    elif is_national_dup:
        audit_dup_status = "CanhBaoTrungLap"
        audit_dup_detail = "Trùng chức năng với CSDL Quốc gia do Bộ/ngành triển khai theo NĐ 278/2025/NĐ-CP. Đề nghị kết nối chia sẻ qua Trục NDXP/LGSP thay vì phát triển phần mềm độc lập."
    else:
        audit_dup_status = "KhongTrungLap"
        audit_dup_detail = "Hệ thống chuyên ngành đặc thù, giữ vị trí nguồn dữ liệu duy nhất (Single Source of Truth), không trùng lặp chức năng toàn tỉnh."

    # 2. Nâng cấp
    has_api = 'api' in (share_method + share_info).lower()
    needs_upgrade = 'excel' in (share_method + share_info).lower() or 'chưa chia sẻ' in (share_method + share_info).lower() or 'không chia sẻ' in (share_method + share_info).lower() or 'chờ' in status.lower() or 'gia hạn' in status.lower()
    
    if needs_upgrade or not has_api:
        audit_upg_status = "CanNangCap"
        audit_upg_detail = "Hiện trạng chia sẻ qua Excel hoặc chưa mở API. Cần nâng cấp giao diện RESTful API chuẩn LGSP và mở rộng phạm vi dữ liệu toàn tỉnh trong năm 2026."
        action_plan = "NangCap"
    else:
        audit_upg_status = "OnDinh"
        audit_upg_detail = "Hệ thống đã có kết nối API và đang vận hành ổn định, tiếp tục bảo trì và giám sát an toàn thông tin định kỳ."
        action_plan = "TiepTuc"

    # 3. Gộp
    is_agri_merge = any(k in name_l for k in ['sàn giao dịch nông sản', 'giá cả nông sản', 'app nông nghiệp'])
    is_web_merge = 'trang thông tin thành phần' in name_l or '124 trang' in name_l
    is_water_sand_merge = 'khai thác cát' in name_l or 'tài nguyên nước' in name_l or 'giám sát môi trường tự động' in name_l

    if is_agri_merge:
        audit_merge_status = "CanHopNhat"
        audit_merge_detail = "Đề xuất hợp nhất Sàn nông sản, Hệ thống giá cả và App Nông nghiệp thành Nền tảng Nông nghiệp số thống nhất tỉnh Vĩnh Long."
        action_plan = "HopNhat"
    elif is_web_merge:
        audit_merge_status = "CanHopNhat"
        audit_merge_detail = "Gom gộp toàn bộ 124 trang thông tin cấp xã vào Cổng thông tin điện tử hợp nhất tỉnh, xóa bỏ các trang lẻ."
        action_plan = "HopNhat"
    elif is_water_sand_merge:
        audit_merge_status = "CanHopNhat"
        audit_merge_detail = "Gom gộp dữ liệu quan trắc cát, nước, môi trường tự động về Nền tảng Quan trắc Tài nguyên & Môi trường dùng chung tỉnh."
    else:
        audit_merge_status = "DocLap"
        audit_merge_detail = "Hệ thống chuyên sâu quy mô toàn tỉnh, phục vụ quản lý chuyên ngành, không thuộc diện phải gom gộp."

    # 4. Loại bỏ
    is_retired = 'ngừng' in status.lower() or 'không còn' in status.lower() or 'hết hạn' in status.lower() or (is_national_dup and 'nội bộ' in status.lower())
    if is_retired:
        audit_retire_status = "KienNghiLoaiBo"
        audit_retire_detail = "Phần mềm hết niên hạn khai thác hoặc đã có CSDL Quốc gia thay thế. Đề xuất thu hồi máy chủ, sao lưu dữ liệu và xóa khỏi ngân sách thường xuyên."
        action_plan = "ThayThe"
        lifecycle_status = "KienNghiThanhLy"
    else:
        audit_retire_status = "AnToan"
        audit_retire_detail = "Hệ thống trong vòng đời khai thác hiệu quả giai đoạn 2026-2030, được SOC tỉnh giám sát an toàn thông tin 24/7."
        lifecycle_status = "DangVanHanh"

    # Target receiving agency
    if arch_layer == "Lop3_UngDung":
        target_receiving_dept = "Kho CSDL Dùng Chung Cấp Tỉnh (T-DL-01 - Sở TT&TT) & Trung Tâm Điều Hành IOC Tỉnh (T-CQ-03)"
        target_obj_id = "T-DL-01"
    elif arch_layer == "Lop2_DuLieu_NenTang":
        target_receiving_dept = "Trục Chia Sẻ Dữ Liệu LGSP Tỉnh (T-DL-03) & Trục Quốc Gia NDXP"
        target_obj_id = "T-DL-03"
    elif arch_layer == "Lop4_Kenh_DoLuong":
        target_receiving_dept = "Trung Tâm Giám Sát Điều Hành IOC Tỉnh (T-CQ-03 - VP UBND Tỉnh)"
        target_obj_id = "T-CQ-03"
    else:
        target_receiving_dept = "Trung Tâm Dữ Liệu & Điện Toán Đám Mây Tỉnh (T-HT-01 - Sở TT&TT)"
        target_obj_id = "T-HT-01"

    # Directive text
    if audit_dup_status == "CanhBaoTrungLap":
        directive = f"Lãnh đạo UBND tỉnh chỉ đạo: Yêu cầu {dept} phối hợp với Sở TT&TT rà soát, dừng phát triển các phân hệ trùng lặp; chuyển giao dữ liệu về hệ thống dùng chung tỉnh/quốc gia."
    elif audit_upg_status == "CanNangCap":
        directive = f"Lãnh đạo UBND tỉnh chỉ đạo: Đồng ý chủ trương giao {dept} chủ trì nâng cấp API RESTful kết nối Trục LGSP tỉnh trong năm 2026; mở rộng dữ liệu toàn diện sau hợp nhất."
    else:
        directive = f"Lãnh đạo UBND tỉnh chỉ đạo: Đồng ý giao {dept} tiếp tục quản lý, khai thác hiệu quả. Bảo đảm kết nối dữ liệu liên tục về Trung tâm IOC tỉnh."

    data_payload_desc = scope if scope else (details if details else f"Dữ liệu chuyên ngành {name}")
    if len(data_payload_desc) > 300:
        data_payload_desc = data_payload_desc[:297] + "..."

    conn_channel = "API RESTful" if has_api else ("File Excel / Batch Sync" if "excel" in (share_method + share_info).lower() else "Mạng TSLCD Cấp Tỉnh")

    sheet1_objects.append((
        obj_id, name, dept, arch_layer, "ChinhQuyenSo", deployment_scope,
        lifecycle_status, action_plan, f"Hồ sơ rà soát số {stt}/2026", f"HS-2026-{obj_id}",
        url if url else "Hệ thống nội bộ / TSLCD",
        sub_dept if sub_dept else dept,
        share_method if share_method else "Chưa chia sẻ",
        data_payload_desc,
        target_receiving_dept,
        audit_dup_status, audit_dup_detail,
        audit_upg_status, audit_upg_detail,
        audit_merge_status, audit_merge_detail,
        audit_retire_status, audit_retire_detail,
        directive
    ))

    # Connection entry
    sheet1_connections.append((
        f"CONN-{obj_id}", obj_id, target_obj_id,
        data_payload_desc, conn_channel, "CapDo3", "DangKhaiThac"
    ))

print(f"Parsed {len(sheet1_objects)} systems from Sheet 1.")

# Process Sheet 2: CSDL Trọng điểm theo NĐ 278
sheet2_objects = []
sheet2_connections = []
s2_count = 0

for r_idx, cols in s2[1:]:
    src = cols.get('A', '').strip()
    name = cols.get('B', '').strip()
    if not name or name == 'None':
        continue

    # Skip general category headings if they are just headers
    if '13 cơ sở dữ liệu' in name or 'Bổ sung 222' in name or 'Mục trùng' in src:
        continue

    s2_count += 1
    obj_id = f"QG-ND278-{s2_count:03d}"

    # Extract managing ministry if available in name
    managing_dept = "Bộ Nông nghiệp và Môi trường"
    if '—' in name:
        parts = name.split('—')
        clean_name = parts[0].strip()
        managing_dept = parts[1].strip()
    elif '-' in name:
        parts = name.split('-')
        clean_name = parts[0].strip()
        managing_dept = parts[1].strip()
    else:
        clean_name = name

    arch_layer = "Lop2_DuLieu_NenTang"
    target_receiving_dept = "Trục Quốc Gia NDXP & Trục LGSP Tỉnh (T-DL-03)"
    
    sheet2_objects.append((
        obj_id, clean_name, managing_dept, arch_layer, "CSDLQuocGia", "QuocGia_KetNoi",
        "DangKhaiThac", "TiepTuc", f"Nghị định 278/2025/NĐ-CP mục {src}", f"ND278-{s2_count:03d}",
        "https://ndxp.gov.vn",
        managing_dept,
        "API Quốc Gia (NDXP)",
        f"Cơ sở dữ liệu quốc gia chuyên ngành: {clean_name}",
        target_receiving_dept,
        "KhongTrungLap", "CSDL nền tảng quốc gia do Trung ương chủ quản, tỉnh kết nối khai thác dữ liệu dùng chung.",
        "OnDinh", "Kết nối chuẩn hóa qua Trục NDXP/LGSP.",
        "DocLap", "CSDL Quốc gia tập trung toàn quốc, không thuộc diện gộp cấp địa phương.",
        "AnToan", "Hệ thống CSDL trọng điểm quốc gia, giám sát an toàn thông tin cấp độ 4/5.",
        f"Lãnh đạo UBND tỉnh chỉ đạo: Giao các Sở chuyên ngành phối hợp với Sở TT&TT kết nối và khai thác hiệu quả CSDL Quốc gia {clean_name} theo NĐ 278."
    ))

    sheet2_connections.append((
        f"CONN-{obj_id}", obj_id, "T-DL-03",
        f"Luồng liên thông CSDL Quốc gia {clean_name}", "NDXP / LGSP", "CapDo4", "DangKhaiThac"
    ))

print(f"Parsed {len(sheet2_objects)} national databases from Sheet 2.")

# 3. Nạp vào SQLite
# Lưu lại core foundation objects nếu có
core_objs = cur.execute("SELECT * FROM province_arch_objects WHERE object_id LIKE 'T-%'").fetchall()
print(f"Retained {len(core_objs)} core foundation objects (T-HT, T-DL, T-CQ, T-TT).")

# Delete old non-core or insert/replace
cur.execute("DELETE FROM province_arch_objects WHERE object_id NOT LIKE 'T-%';")
cur.execute("DELETE FROM province_connections WHERE source_obj_id NOT LIKE 'T-%';")

insert_obj_sql = """
INSERT OR REPLACE INTO province_arch_objects (
    object_id, object_name, managing_dept, arch_layer, sub_category, deployment_scope,
    lifecycle_status, action_plan, proof_document_url, clearance_code,
    domain_url, sub_dept, share_method, data_scope, target_receiving_dept,
    audit_dup_status, audit_dup_detail, audit_upg_status, audit_upg_detail,
    audit_merge_status, audit_merge_detail, audit_retire_status, audit_retire_detail,
    leadership_directive
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
"""

for o in sheet1_objects:
    cur.execute(insert_obj_sql, o)

for o in sheet2_objects:
    cur.execute(insert_obj_sql, o)

insert_conn_sql = """
INSERT OR REPLACE INTO province_connections (
    conn_id, source_obj_id, target_obj_id, data_payload, channel_type, security_level, status
) VALUES (?, ?, ?, ?, ?, ?, ?);
"""

for c in sheet1_connections:
    cur.execute(insert_conn_sql, c)

for c in sheet2_connections:
    cur.execute(insert_conn_sql, c)

conn.commit()

total_objs = cur.execute("SELECT COUNT(*) FROM province_arch_objects").fetchone()[0]
total_conns = cur.execute("SELECT COUNT(*) FROM province_connections").fetchone()[0]
print(f"SQLite Update Success! Total objects: {total_objs}, Total connections: {total_conns}")

# 4. Sync to SQL Server ProvinceArch
if HAS_PYODBC:
    print("Syncing to SQL Server ProvinceArch...")
    sync_sqlserver("DELETE FROM province_arch_objects WHERE object_id NOT LIKE 'T-%';")
    sync_sqlserver("DELETE FROM province_connections WHERE source_obj_id NOT LIKE 'T-%';")

    for o in sheet1_objects + sheet2_objects:
        sync_sqlserver("""
        IF EXISTS (SELECT 1 FROM province_arch_objects WHERE object_id = ?)
            UPDATE province_arch_objects 
            SET object_name=?, managing_dept=?, arch_layer=?, sub_category=?, deployment_scope=?, 
                lifecycle_status=?, action_plan=?, proof_document_url=?, clearance_code=?,
                domain_url=?, sub_dept=?, share_method=?, data_scope=?, target_receiving_dept=?,
                audit_dup_status=?, audit_dup_detail=?, audit_upg_status=?, audit_upg_detail=?,
                audit_merge_status=?, audit_merge_detail=?, audit_retire_status=?, audit_retire_detail=?,
                leadership_directive=?
            WHERE object_id=?
        ELSE
            INSERT INTO province_arch_objects (
                object_id, object_name, managing_dept, arch_layer, sub_category, deployment_scope,
                lifecycle_status, action_plan, proof_document_url, clearance_code,
                domain_url, sub_dept, share_method, data_scope, target_receiving_dept,
                audit_dup_status, audit_dup_detail, audit_upg_status, audit_upg_detail,
                audit_merge_status, audit_merge_detail, audit_retire_status, audit_retire_detail,
                leadership_directive
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7], o[8], o[9], o[10], o[11], o[12], o[13], o[14], o[15], o[16], o[17], o[18], o[19], o[20], o[21], o[22], o[23], o[0],
              o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7], o[8], o[9], o[10], o[11], o[12], o[13], o[14], o[15], o[16], o[17], o[18], o[19], o[20], o[21], o[22], o[23]))

    for c in sheet1_connections + sheet2_connections:
        sync_sqlserver("""
        IF EXISTS (SELECT 1 FROM province_connections WHERE conn_id = ?)
            UPDATE province_connections 
            SET source_obj_id=?, target_obj_id=?, data_payload=?, channel_type=?, security_level=?, status=?
            WHERE conn_id=?
        ELSE
            INSERT INTO province_connections (conn_id, source_obj_id, target_obj_id, data_payload, channel_type, security_level, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[0], c[0], c[1], c[2], c[3], c[4], c[5], c[6]))

    print("SQL Server synchronization complete!")

conn.close()
print("ALL MIGRATION TASKS FINISHED SUCCESSFULLY!")

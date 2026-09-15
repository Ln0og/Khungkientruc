# HỆ THỐNG QUẢN LÝ KHUNG KIẾN TRÚC SỐ
### Vietnam Digital Government Architecture Management System
**Căn cứ pháp lý & Kỹ thuật**:
- **Quyết định số 1425/QĐ-TTg** của Thủ tướng Chính phủ ban hành Khung kiến trúc tổng thể quốc gia số (Phiên bản 1.0).
- **Hướng dẫn xây dựng Khung kiến trúc số của Bộ Khoa học và Công nghệ** (Bộ hồ sơ 03 Mẫu: Mẫu số 01 - Tài liệu, Mẫu số 02 - Bộ sơ đồ, Mẫu số 03 - Bộ dữ liệu XLSX).

---

## 🌟 TỔNG QUAN HỆ THỐNG
Hệ thống cung cấp nền tảng quản trị và số hóa toàn diện Khung kiến trúc số dành cho các Bộ, Ban, Ngành và Ủy ban nhân dân các tỉnh/thành phố, giải quyết triệt để bài toán đồng bộ hóa giữa hồ sơ văn bản, sơ đồ kỹ thuật và cơ sở dữ liệu tài sản số.

Hệ thống được thiết kế để trả lời trực tiếp **05 Câu hỏi cốt lõi** theo tiêu chuẩn của Bộ Khoa học và Công nghệ:
1. **Cần đạt kết quả gì?** (Rà soát mục tiêu, chỉ tiêu định lượng, bài toán ưu tiên và phạm vi kiến trúc 04 lớp).
2. **Hiện đang có những thành phần số nào, ai quản lý và kết nối ra sao?** (Đánh giá hiện trạng 04 lớp, chủ quản, vận hành, luồng kết nối và phát hiện điểm nghẽn/trùng lặp).
3. **Kiến trúc số mục tiêu cần có những thành phần nào, những thành phần nào sẽ sử dụng chung?** (Phân định rõ thành phần dùng chung cấp quốc gia/bộ/tỉnh và thành phần dùng riêng).
4. **Nội dung nào phải tiếp tục, chuẩn hóa, nâng cấp, hợp nhất, thay thế hoặc bổ sung?** (Đối chiếu hiện trạng với kiến trúc mục tiêu để lựa chọn 01 trong 06 phương án xử lý).
5. **Đơn vị nào thực hiện thành phần nào, khi nào hoàn thành, đo lường và cập nhật bằng dữ liệu nào?** (Ma trận nhiệm vụ chuyển đổi kiến trúc, lộ trình Gantt/Kanban, đơn vị chủ trì và tiêu chí/nguồn dữ liệu kiểm chứng).

---

## 🏛️ CẤU TRÚC 04 VÙNG GIAO DIỆN & CÁC MÀN HÌNH CHỨC NĂNG

### 1. Bố cục khung Trang tổng thể (Global Layout)
- **Top Header**: Logo cơ quan, thanh tìm kiếm toàn hệ thống (`KT-x`, `QG-x`), chuông thông báo cảnh báo sai khác, avatar và bộ chuyển đổi vai trò **Cán bộ / Admin (Nội bộ)** vs **Bản công khai (Public Portal)**.
- **Sidebar Navigation**: Menu truy cập nhanh 04 bảng của Mẫu số 03, Thư viện sơ đồ (Mẫu 02) và Quản trị / NAS.
- **Main Content Area**: Điều hướng phân cấp (Breadcrumb) và vùng nội dung hiển thị linh hoạt.
- **Footer Bar**: Cố định thông tin trạng thái hệ thống, phiên bản Khung `v1.0`, ngày chốt dữ liệu `2026-09-15` và trạng thái kết nối NAS.

### 2. Các màn hình chức năng chính
- **Màn hình 1: Dashboard Điều hành Tổng quan**
  - Khối **05 Câu hỏi cốt lõi** tương tác trực tiếp.
  - 04 Thẻ KPI: 128 tài sản số, 85% kết nối chia sẻ qua LGSP/NDXP, 92% tuân thủ kiến trúc, 12/18 nhiệm vụ đang chạy.
  - Mô hình kiến trúc mục tiêu 04 Lớp tương tác (Lớp 1 đến Lớp 4).
  - Biểu đồ tỷ lệ 06 phương án xử lý kiến trúc (Doughnut Chart).
  - Danh sách cảnh báo điểm nghẽn và hệ thống trùng lặp.
- **Màn hình 2: Bảng 1 (DM_DOITUONG)**
  - Quản lý danh mục đối tượng kiến trúc, phân định rõ Bản ghi gốc và Tham chiếu.
  - Bộ lọc đa tiêu chí (Lớp kiến trúc, Loại đối tượng, Đơn vị chủ quản).
  - Drawer Side Panel: Thẻ thông tin tài sản số chi tiết, phạm vi, căn cứ pháp lý và cấu hình kỹ thuật.
- **Màn hình 3: Bảng 2 (QH_KETNOI)**
  - Chuyển đổi linh hoạt: Bảng dữ liệu / Sơ đồ kết nối trực quan (Visual Topology Canvas) / Cả hai.
  - Mô phỏng các luồng liên thông dữ liệu qua NDXP, LGSP, TSLCD.
- **Màn hình 4: Bảng 4 (HOANTHIEN_NV)**
  - Quản lý nhiệm vụ theo 03 chế độ xem: Ma trận Bảng, Lộ trình Gantt Chart (Q2/2026 - Q4/2027) và Kanban Tiến độ.
  - Modal Tiêu chí kiểm chứng, nguồn dữ liệu kiểm chứng và nút đính kèm hồ sơ minh chứng có ký số.
- **Màn hình 5: Trung tâm Quản trị Hồ sơ & Đồng bộ NAS**
  - Quản lý phiên bản thống nhất 03 Mẫu - 01 Hồ sơ.
  - **Data Validator**: Công cụ tự động quét và kiểm thử **08 Quy tắc chất lượng dữ liệu**.
  - Cấu hình API đồng bộ với Hệ thống NAS Quốc gia (Bộ KH&CN).
  - Nhật ký kiểm toán hệ thống (Audit Log).

---

## 📂 CẤU TRÚC THƯ MỤC DỰ ÁN

```
KIEN TRUC/
├── web/                                # Ứng dụng Web hoàn chỉnh
│   ├── index.html                      # Giao diện chính (HTML5 + Tailwind CSS + FontAwesome + Chart.js)
│   ├── app.js                          # Dữ liệu mẫu, logic điều khiển, Canvas topology, Data Validator, Gantt, Kanban
│   ├── styles.css                      # Giao diện chuẩn Cổng thông tin điện tử hành chính
│   └── server.py                       # Máy chủ HTTP & REST API Python
├── extracted_texts/                    # Dữ liệu văn bản trích xuất từ tài liệu nguồn BCA & QĐ 1425
│   ├── 3_QD_1425_clean.txt
│   ├── 4_DU_THAO_BKHCN_clean.txt
│   ├── 5. Tai lieu BCA.txt
│   ├── 6_PL_Lo_trinh_nhiem_vu_BCA_2.txt
│   └── 6_table_data.json
├── 3. QD.1425. KHUNG KTTT QGS (PB 1.0) BAN HANH_F.pdf
├── 4.DU THAO_BKHCN_HD XAYDUNG KHUNG KTS COQUAN TOCHUC.pdf
├── 5. Tai lieu BCA.doc
├── 6. PL Lo trinh nhiem vu BCA 2.doc
├── README.md
└── .gitignore
```

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY WEB APPLICATION

### Cách 1: Khởi chạy bằng Python Web Server (Được khuyến nghị)
Chạy lệnh sau tại thư mục gốc của dự án:
```powershell
python web/server.py
```
Hoặc với công cụ `uv`:
```powershell
uv run python web/server.py
```
Sau đó truy cập trên trình duyệt tại: **`http://127.0.0.1:8888`**

### Cách 2: Mở trực tiếp
Mở trực tiếp tệp `web/index.html` bằng bất kỳ trình duyệt web hiện đại nào (Chrome, Edge, Firefox).

# HỆ THỐNG QUẢN TRỊ & THẨM TRA KHUNG KIẾN TRÚC SỐ CẤP TỈNH
### Vietnam Provincial Digital Architecture & Audit Management System

**Căn cứ pháp lý & Kỹ thuật**:
- **Quyết định số 1425/QĐ-TTg** của Thủ tướng Chính phủ ban hành Khung kiến trúc tổng thể quốc gia số (Phiên bản 1.0) - Trọng tâm Hình 7 & Hình 8.
- **Nghị định số 278/2025/NĐ-CP** về danh mục Cơ sở dữ liệu quốc gia và Cơ sở dữ liệu chuyên ngành trọng điểm của các Bộ/ngành Trung ương.
- **Nghị định số 224/2026/NĐ-CP** về tiêu chí thẩm tra, kiểm soát trùng lặp và phân bổ ngân sách CNTT/CĐS.
- **Hướng dẫn xây dựng Khung kiến trúc số của Bộ Khoa học và Công nghệ** (Mẫu số 01, 02, 03).

---

## 🌟 CÁC PHƯƠNG ÁN MÀN HÌNH HỆ THỐNG

Hệ thống được thiết kế với hai phương án giao diện linh hoạt:

### 🏛️ 1. PHƯƠNG ÁN B: Màn Hình Khung Kiến Trúc Sống & Thẩm Tra Trực Quan (`unified.html`)
> **Mục tiêu:** Màn hình hợp nhất để **Lãnh đạo UBND tỉnh và các Sở, Ban, Ngành cùng xem**, đối soát và ra quyết định chỉ đạo điều hành trực tiếp.

- **Checklist Selector (Bên trái):**
  - Danh mục 646 hệ thống/phần mềm/website và CSDL thực tế của toàn tỉnh và Trung ương.
  - Dropdown chọn nhanh theo từng Sở/Ban/Ngành (Sở Nông nghiệp & Môi trường, Sở KH&CN, Sở Xây dựng, Sở Y tế, Sở GD&ĐT, Sở Nội vụ, Sở Tài chính, Công an tỉnh, VP UBND tỉnh...) hoặc chọn CSDL Quốc gia theo NĐ 278.
  - Nhận diện nhãn trực tiếp: 🔴 Trùng lặp, 🔵 Cần nâng cấp API, 🟣 Cần gộp, ⚫ Đề xuất loại bỏ, 🟢 Đang sử dụng.
  - Hiển thị tên miền/link URL truy cập trực tiếp.
- **Bộ Khung Kiến Trúc 4 Lớp (Chính giữa):**
  - **Khung Đỉnh - ĐÂU LÀ CƠ QUAN CHỦ QUẢN (CHỦ TRÌ)?**: Hiển thị rõ cơ quan chủ trì, đơn vị trực tiếp vận hành, link website, cấp triển khai.
  - **Bộ Khung 4 Tầng (Hình 8 - QĐ 1425)**: Tự động highlight vị trí lớp kiến trúc (Lớp 1 Hạ tầng, Lớp 2 Dữ liệu lõi, Lớp 3 Ứng dụng nghiệp vụ, Lớp 4 Kênh tương tác).
  - **Khung Đáy - ĐÂU LÀ CƠ QUAN TIẾP NHẬN ĐẦU CUỐI?**: Hiển thị đơn vị tiếp nhận dữ liệu (Kho CSDL tỉnh, IOC tỉnh, Trục LGSP, CSDL Quốc gia), phương thức kết nối và gói dữ liệu tiếp nhận.
- **Trạm Thẩm Tra Chiến Lược Lãnh Đạo (Bên phải):**
  - Đánh giá tự động **Bộ 4 câu hỏi chiến lược**:
    1. **Có trùng lặp không?** (Đối soát với CSDL Quốc gia theo NĐ 278 và phần mềm của các tỉnh cũ trước sáp nhập).
    2. **Có cần nâng cấp không?** (Nâng cấp từ Excel/cục bộ lên chuẩn RESTful API kết nối Trục LGSP tỉnh).
    3. **Có cần gộp không?** (Gộp các hệ thống đơn lẻ cùng ngành vào nền tảng dùng chung tỉnh).
    4. **Có bị cũ quá loại bỏ không?** (Đánh giá niên hạn, dừng vận hành phần mềm lỗi thời).
  - **Ý kiến chỉ đạo của Lãnh đạo UBND tỉnh** và nút `[Duyệt Chủ Trương]`, `[Xuất Phiếu Thẩm Tra]`.

### 📊 2. PHƯƠNG ÁN A: Phân Tách Hai Màn Hình
- **Trang Nhập Liệu & Kê Khai (`entry.html`):** Dành cho chuyên viên các Sở/ngành kê khai danh mục tài sản số, phần mềm, tên miền, thông số kết nối và hồ sơ minh chứng.
- **Trang Lãnh Đạo & Điều Hành (`index.html`):** Dashboard tổng quan điều hành 5 câu hỏi cốt lõi, ma trận nhiệm vụ chuyển đổi Gantt/Kanban, topo kết nối LGSP và kiểm định chất lượng dữ liệu.

---

## 🗄️ CƠ SỞ DỮ LIỆU KÉP (SQLITE & MS SQL SERVER LOCALDB)

Hệ thống hỗ trợ đồng bộ dữ liệu song song (dual-database synchronization):
- **SQLite 3:** `web/province_arch.db` (lưu trữ nhẹ, chạy ngay không cần cài đặt).
- **Microsoft SQL Server LocalDB:** Database `ProvinceArch` (chuẩn công nghiệp cho các cơ quan chính quyền).

### Dữ liệu thực tế đã tích hợp:
- **143** phần mềm, hệ thống, website cấp tỉnh từ 14 Sở, Ban, Ngành.
- **235** Cơ sở dữ liệu quốc gia và chuyên ngành theo Nghị định 278/2025/NĐ-CP.
- **32** nền tảng hạ tầng & dùng chung cốt lõi (Cloud tỉnh, Mạng TSLCD, SOC, Kho dữ liệu, LGSP...).
- **620** luồng liên thông kết nối đầu cuối (`province_connections`).

---

## 📂 CẤU TRÚC THƯ MỤC DỰ ÁN

```
Khungkientruc/
├── web/                                # Ứng dụng Web hoàn chỉnh
│   ├── unified.html                    # [Phương án B] Màn hình Khung Kiến Trúc Sống & Thẩm Tra
│   ├── index.html                      # [Phương án A] Dashboard Lãnh đạo & Topo kết nối
│   ├── entry.html                      # [Phương án A] Trang Nhập liệu & Kê khai Sở ngành
│   ├── app.js                          # Logic điều khiển, Canvas topology, Gantt, Kanban
│   ├── chart.js                        # Thư viện vẽ biểu đồ kiến trúc độc lập
│   ├── styles.css                      # Giao diện chuẩn hành chính
│   ├── server.py                       # Máy chủ HTTP đa luồng & REST API Python
│   └── province_arch.db                # CSDL SQLite lưu trữ 646 hệ thống thực tế
├── extracted_texts/                    # Dữ liệu văn bản trích xuất từ tài liệu nguồn
├── 3. QD.1425. KHUNG KTTT QGS (PB 1.0) BAN HANH_F.pdf
├── 4.DU THAO_BKHCN_HD XAYDUNG KHUNG KTS COQUAN TOCHUC.pdf
├── README.md
└── .gitignore
```

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY HỆ THỐNG

### Khởi chạy máy chủ:
Chạy lệnh tại thư mục `web/`:
```powershell
py server.py
```
Hoặc từ thư mục gốc:
```powershell
py web/server.py
```

### Truy cập trên trình duyệt:
- **Phương án B (Khung Kiến Trúc Sống & Thẩm Tra Trực Quan):**
  👉 **`http://127.0.0.1:8888/unified.html`**
- **Phương án A - Trang Lãnh Đạo:**
  👉 **`http://127.0.0.1:8888/index.html`**
- **Phương án A - Trang Nhập Liệu:**
  👉 **`http://127.0.0.1:8888/entry.html`**

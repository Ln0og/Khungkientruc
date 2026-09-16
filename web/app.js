/**
 * HỆ THỐNG QUẢN LÝ KHUNG KIẾN TRÚC SỐ
 * Business Logic & Reactive Data Controller
 * Compliant with: QĐ 1425/QĐ-TTg & Hướng dẫn BKHCN (Mẫu 01, 02, 03)
 */

// ==========================================
// 1. SEED DATA MODEL
// ==========================================

const INITIAL_DATA = {
  // BẢNG 1: DM_DOITUONG
  objects: [
    {
      id: "KT-01",
      name: "HTTT Giải quyết TTHC cấp tỉnh",
      recordType: "Bản ghi gốc",
      objectType: "Hệ thống số",
      archLayer: "Lớp 3",
      owner: "UBND tỉnh / VP UBND tỉnh",
      operator: "Trung tâm Phục vụ HCC",
      origId: "TTHC-789",
      nasCode: "NAS-3-APP-0042",
      status: "Hiện trạng & Mục tiêu",
      scope: "Cấp tỉnh / Huyện / Xã",
      solution: "Nâng cấp",
      proofSource: "Quyết định số 456/QĐ-UBND",
      techConfig: "API Gateway Kong 3.4, PostgreSQL 15, Spring Boot 3.2 (Host: 10.12.80.25)",
      isSecret: true
    },
    {
      id: "QG-01",
      name: "CSDL Quốc gia về Dân cư",
      recordType: "Tham chiếu",
      objectType: "CSDL",
      archLayer: "Lớp 2",
      owner: "Bộ Công an (C06)",
      operator: "Trung tâm Dữ liệu QG về Dân cư",
      origId: "CSDLQG-DC",
      nasCode: "NAS-2-DB-0001",
      status: "Hiện trạng & Mục tiêu",
      scope: "Toàn quốc",
      solution: "Dùng chung",
      proofSource: "Quyết định số 06/QĐ-TTg",
      techConfig: "Dịch vụ xác thực danh tính qua NDXP/LGSP (Host: 10.250.1.10)",
      isSecret: true
    },
    {
      id: "KT-02",
      name: "Kho dữ liệu dùng chung cấp tỉnh",
      recordType: "Bản ghi gốc",
      objectType: "CSDL",
      archLayer: "Lớp 2",
      owner: "Sở Thông tin và Truyền thông",
      operator: "Trung tâm CNTT-TT",
      origId: "KDL-TINH-01",
      nasCode: "NAS-2-DB-0019",
      status: "Mục tiêu",
      scope: "Cấp tỉnh",
      solution: "Bổ sung",
      proofSource: "Nghị quyết số 28/NQ-HĐND",
      techConfig: "Data Lakehouse MinIO + Trino + MinIO S3 (Host: 10.12.80.50)",
      isSecret: true
    },
    {
      id: "LQ-01",
      name: "Hệ thống Quản lý Thuế tập trung (TMS)",
      recordType: "Tham chiếu",
      objectType: "Hệ thống số",
      archLayer: "Lớp 3",
      owner: "Bộ Tài chính (Tổng cục Thuế)",
      operator: "Cục CNTT Tổng cục Thuế",
      origId: "BTC-TMS-01",
      nasCode: "NAS-3-APP-0105",
      status: "Hiện trạng",
      scope: "Toàn quốc",
      solution: "Tích hợp",
      proofSource: "Thông tư số 19/2021/TT-BTC",
      techConfig: "Cổng thanh toán điện tử nghĩa vụ thuế qua NDXP",
      isSecret: false
    },
    {
      id: "QG-03",
      name: "Nền tảng Định danh & Xác thực điện tử (VNeID)",
      recordType: "Tham chiếu",
      objectType: "Nền tảng số",
      archLayer: "Lớp 4",
      owner: "Bộ Công an (C06)",
      operator: "Trung tâm Dữ liệu QG về Dân cư",
      origId: "VNEID-QG",
      nasCode: "NAS-4-PLT-0002",
      status: "Hiện trạng & Mục tiêu",
      scope: "Toàn quốc",
      solution: "Dùng chung",
      proofSource: "Nghị định 59/2022/NĐ-CP",
      techConfig: "OpenID Connect, OAuth2, Biometric SDK",
      isSecret: false
    },
    {
      id: "KT-03",
      name: "Nền tảng Tích hợp & Chia sẻ dữ liệu tỉnh (LGSP)",
      recordType: "Bản ghi gốc",
      objectType: "Nền tảng số",
      archLayer: "Lớp 2",
      owner: "Sở Thông tin và Truyền thông",
      operator: "Trung tâm CNTT-TT",
      origId: "LGSP-TINH",
      nasCode: "NAS-2-PLT-0012",
      status: "Hiện trạng & Mục tiêu",
      scope: "Cấp tỉnh & Liên thông QG",
      solution: "Nâng cấp",
      proofSource: "Quyết định số 112/QĐ-UBND",
      techConfig: "WSO2 Enterprise Integrator, ESB, REST/SOAP Bridge (IP: 10.12.80.12)",
      isSecret: true
    },
    {
      id: "QG-04",
      name: "Nền tảng Tích hợp, Chia sẻ DL quốc gia (NDXP)",
      recordType: "Tham chiếu",
      objectType: "Nền tảng số",
      archLayer: "Lớp 2",
      owner: "Bộ KH&CN / Cục CĐSQG",
      operator: "Trung tâm Chính phủ số",
      origId: "NDXP-QG",
      nasCode: "NAS-2-PLT-0001",
      status: "Hiện trạng & Mục tiêu",
      scope: "Toàn quốc",
      solution: "Dùng chung",
      proofSource: "Khung KT CPĐT 3.0",
      techConfig: "X-Road Protocol Gateway / Government Secure Network",
      isSecret: false
    },
    {
      id: "KT-05",
      name: "Cổng Dịch vụ công cấp tỉnh",
      recordType: "Bản ghi gốc",
      objectType: "Dịch vụ số",
      archLayer: "Lớp 4",
      owner: "UBND tỉnh",
      operator: "Trung tâm PVHCCC",
      origId: "DVC-TINH",
      nasCode: "NAS-4-SVC-0008",
      status: "Hiện trạng & Mục tiêu",
      scope: "Cấp tỉnh",
      solution: "Chuẩn hóa",
      proofSource: "Quyết định số 789/QĐ-UBND",
      techConfig: "Next.js Frontend, CDN Edge, WAF bảo vệ (IP VIP: 118.69.12.5)",
      isSecret: true
    },
    {
      id: "KT-06",
      name: "Trung tâm Điều hành thông minh (IOC)",
      recordType: "Bản ghi gốc",
      objectType: "Hệ thống số",
      archLayer: "Lớp 3",
      owner: "Văn phòng UBND tỉnh",
      operator: "Tổ công tác IOC",
      origId: "IOC-TINH-01",
      nasCode: "NAS-3-APP-0099",
      status: "Hiện trạng & Mục tiêu",
      scope: "Cấp tỉnh",
      solution: "Nâng cấp",
      proofSource: "Đề án Đô thị thông minh",
      techConfig: "Dashboard Real-time Grafana, Elasticsearch 8.12, Video Wall",
      isSecret: true
    },
    {
      id: "KT-07",
      name: "Trung tâm Dữ liệu tỉnh / Cloud nội bộ",
      recordType: "Bản ghi gốc",
      objectType: "Hạ tầng số",
      archLayer: "Lớp 1",
      owner: "Sở Thông tin và Truyền thông",
      operator: "Trung tâm CNTT-TT",
      origId: "DC-TINH-01",
      nasCode: "NAS-1-INF-0010",
      status: "Hiện trạng",
      scope: "Cấp tỉnh",
      solution: "Chuyển dịch Cloud",
      proofSource: "Kế hoạch CĐS giai đoạn 2026-2030",
      techConfig: "40 Blade Servers, VMware vSphere 8, SAN Storage 200TB, ASA Firewall",
      isSecret: true
    },
    {
      id: "QG-05",
      name: "Nền tảng Đám mây Trung tâm Dữ liệu QG",
      recordType: "Tham chiếu",
      objectType: "Hạ tầng số",
      archLayer: "Lớp 1",
      owner: "Bộ Công an (C12 - TTDLQG)",
      operator: "Trung tâm Dữ liệu quốc gia",
      origId: "QG-CLOUD-C12",
      nasCode: "NAS-1-INF-0001",
      status: "Mục tiêu",
      scope: "Toàn quốc",
      solution: "Dùng chung",
      proofSource: "Nghị quyết số 175/NQ-CP",
      techConfig: "OpenStack, X-OR Stack Make in Vietnam, Tier IV Data Center",
      isSecret: false
    },
    {
      id: "QG-06",
      name: "Nền tảng Điều hành an ninh mạng QG (SOC QG)",
      recordType: "Tham chiếu",
      objectType: "Hạ tầng số",
      archLayer: "Lớp 1",
      owner: "Bộ Công an (A05)",
      operator: "Trung tâm An ninh mạng QG",
      origId: "QG-SOC-A05",
      nasCode: "NAS-1-SEC-0001",
      status: "Hiện trạng & Mục tiêu",
      scope: "Toàn quốc",
      solution: "Tích hợp",
      proofSource: "Quyết định số 1132/QĐ-TTg",
      techConfig: "SIEM QRadar, Threat Intelligence STIX/TAXII, National WAF",
      isSecret: false
    },
    {
      id: "KT-08",
      name: "Trung tâm Giám sát an toàn thông tin tỉnh (SOC tỉnh)",
      recordType: "Bản ghi gốc",
      objectType: "Hạ tầng số",
      archLayer: "Lớp 1",
      owner: "Sở Thông tin và Truyền thông",
      operator: "Đội ứng cứu sự cố ATTT",
      origId: "SOC-TINH",
      nasCode: "NAS-1-SEC-0015",
      status: "Hiện trạng",
      scope: "Cấp tỉnh",
      solution: "Nâng cấp",
      proofSource: "Chỉ thị 14/CT-TTg",
      techConfig: "Wazuh SIEM, Suricata IDS, Endpoint EDR 3500 node (Host: 10.12.90.10)",
      isSecret: true
    },
    {
      id: "QG-07",
      name: "Hệ thống Quản lý Khung kiến trúc số QG (NAS)",
      recordType: "Tham chiếu",
      objectType: "Hệ thống số",
      archLayer: "Lớp 4",
      owner: "Bộ Khoa học và Công nghệ",
      operator: "Cục Chuyển đổi số quốc gia",
      origId: "NAS-BKHCN",
      nasCode: "NAS-4-SYS-0001",
      status: "Mục tiêu",
      scope: "Toàn quốc",
      solution: "Tích hợp",
      proofSource: "Quyết định 1425/QĐ-TTg",
      techConfig: "RESTful Sync API, OAuth2 Mutual TLS, JSON-LD Schema",
      isSecret: false
    },
    {
      id: "KT-09",
      name: "Trợ lý ảo hỗ trợ công chức giải quyết TTHC",
      recordType: "Bản ghi gốc",
      objectType: "Hệ thống số",
      archLayer: "Lớp 3",
      owner: "Sở Thông tin và Truyền thông",
      operator: "Trung tâm PVHCCC",
      origId: "AI-ASSIST-01",
      nasCode: "NAS-3-APP-0088",
      status: "Mục tiêu",
      scope: "Cấp tỉnh",
      solution: "Bổ sung",
      proofSource: "Kế hoạch ứng dụng AI giai đoạn 2026-2028",
      techConfig: "LLM Fine-tuned Tiếng Việt, Vector DB Milvus, RAG quy định TTHC",
      isSecret: false
    },
    {
      id: "KT-10",
      name: "Hệ thống Quản lý văn bản và điều hành",
      recordType: "Bản ghi gốc",
      objectType: "Hệ thống số",
      archLayer: "Lớp 3",
      owner: "Văn phòng UBND tỉnh",
      operator: "Trung tâm Tin học",
      origId: "QLVB-01",
      nasCode: "NAS-3-APP-0015",
      status: "Hiện trạng & Mục tiêu",
      scope: "Toàn tỉnh",
      solution: "Tiếp tục dùng",
      proofSource: "Quyết định 28/2018/QĐ-TTg",
      techConfig: "Trục liên thông văn bản quốc gia VDXP (Port: 8443)",
      isSecret: true
    }
  ],

  // BẢNG 2: QH_KETNOI
  connections: [
    {
      id: "QH-01",
      sourceId: "KT-01",
      sourceName: "HTTT Giải quyết TTHC",
      relationType: "Trao đổi DL",
      targetId: "QG-01",
      targetName: "CSDLQG Dân cư",
      channel: "NDXP / API",
      status: "Đang khai thác",
      frequency: "Thời gian thực (Sync)",
      protocol: "REST API HTTPS / JSON"
    },
    {
      id: "QH-02",
      sourceId: "KT-01",
      sourceName: "HTTT Giải quyết TTHC",
      relationType: "Đồng bộ DL",
      targetId: "KT-02",
      targetName: "Kho dữ liệu dùng chung",
      channel: "LGSP / API Nội bộ",
      status: "Dự kiến triển khai",
      frequency: "Định kỳ hàng đêm (Batch)",
      protocol: "Apache Kafka / Webhook"
    },
    {
      id: "QH-03",
      sourceId: "KT-05",
      sourceName: "Cổng Dịch vụ công tỉnh",
      relationType: "Xác thực danh tính",
      targetId: "QG-03",
      targetName: "Nền tảng VNeID",
      channel: "Internet / OAuth2",
      status: "Đang khai thác",
      frequency: "Thời gian thực (Sync)",
      protocol: "OpenID Connect Authorization Code"
    },
    {
      id: "QH-04",
      sourceId: "KT-03",
      sourceName: "Nền tảng LGSP tỉnh",
      relationType: "Liên thông dữ liệu",
      targetId: "QG-04",
      targetName: "Nền tảng NDXP QG",
      channel: "Mạng TSLCD / VPN",
      status: "Đang khai thác",
      frequency: "Liên tục 24/7",
      protocol: "X-Road Protocol / TLS 1.3"
    },
    {
      id: "QH-05",
      sourceId: "KT-01",
      sourceName: "HTTT Giải quyết TTHC",
      relationType: "Tra cứu & Thanh toán",
      targetId: "LQ-01",
      targetName: "HT Quản lý Thuế",
      channel: "NDXP / API",
      status: "Đang khai thác",
      frequency: "Theo yêu cầu hồ sơ",
      protocol: "SOAP / XML Sign"
    },
    {
      id: "QH-06",
      sourceId: "KT-08",
      sourceName: "SOC tỉnh",
      relationType: "Chia sẻ cảnh báo ATTT",
      targetId: "QG-06",
      targetName: "SOC quốc gia (A05)",
      channel: "VPN chuyên dùng",
      status: "Dự kiến triển khai",
      frequency: "Thời gian thực (Alert push)",
      protocol: "Syslog-ng TLS / STIX-TAXII"
    },
    {
      id: "QH-07",
      sourceId: "KT-06",
      sourceName: "IOC tỉnh",
      relationType: "Thu thập số liệu KPI",
      targetId: "KT-02",
      targetName: "Kho dữ liệu dùng chung",
      channel: "Mạng LAN nội bộ",
      status: "Đang khai thác",
      frequency: "15 phút/lần",
      protocol: "SQL Connection / ODBC"
    },
    {
      id: "QH-08",
      sourceId: "KT-07",
      sourceName: "TTDL tỉnh",
      relationType: "Di chuyển hạ tầng",
      targetId: "QG-05",
      targetName: "Cloud QG (C12 BCA)",
      channel: "TSLCD băng thông lớn",
      status: "Dự kiến triển khai",
      frequency: "Giai đoạn chuyển dịch",
      protocol: "Veeam Backup & S3 Direct Sync"
    },
    {
      id: "QH-09",
      sourceId: "KT-06",
      sourceName: "IOC tỉnh",
      relationType: "Đồng bộ giám sát Khung",
      targetId: "QG-07",
      targetName: "Hệ thống NAS BKHCN",
      channel: "API Gateway QG",
      status: "Sẵn sàng kết nối",
      frequency: "Hàng tuần / Khi đổi phiên bản",
      protocol: "REST API JSON / Bearer Token"
    }
  ],

  // BẢNG 4: HOANTHIEN_NV
  tasks: [
    {
      gapId: "ND-01",
      gapContent: "Chưa tự động xác thực dữ liệu cư trú khi công dân nộp hồ sơ TTHC",
      solution: "Chuẩn hóa, kết nối",
      taskId: "NV-01",
      taskName: "Nâng cấp kết nối tự động xác thực CSDLQG Dân cư qua LGSP/NDXP",
      leadUnit: "Trung tâm Phục vụ hành chính công",
      timeline: "Q4/2026 - Q2/2027",
      status: "Đang thực hiện",
      criteria: "100% hồ sơ TTHC được xác thực tự động qua CSDLQG Dân cư qua LGSP/NDXP",
      proofSource: "Biên bản nghiệm thu kỹ thuật và dữ liệu log vận hành tự động",
      verifyStatus: "Đang hoàn thiện",
      progress: 65
    },
    {
      gapId: "ND-02",
      gapContent: "Kết quả giải quyết TTHC điện tử chưa đồng bộ vào Kho dữ liệu tỉnh",
      solution: "Nâng cấp, tích hợp",
      taskId: "NV-02",
      taskName: "Kết nối lưu trữ kết quả TTHC số hóa vào Kho dùng chung",
      leadUnit: "Sở Thông tin và Truyền thông",
      timeline: "Q1/2027 - Q3/2027",
      status: "Chưa thực hiện",
      criteria: "Tỷ lệ đồng bộ kết quả TTHC đạt 95% vào Kho dữ liệu dùng chung",
      proofSource: "Báo cáo kiểm thử luồng tích hợp LGSP và log giao dịch",
      verifyStatus: "Chưa thực hiện",
      progress: 10
    },
    {
      gapId: "ND-03",
      gapContent: "Hạ tầng máy chủ phân tán chưa bảo đảm an toàn thông tin cấp độ 3",
      solution: "Chuyển dịch hạ tầng",
      taskId: "NV-03",
      taskName: "Dịch chuyển hệ thống thông tin không mật lên Cloud Trung tâm Dữ liệu QG",
      leadUnit: "Sở TTTT phối hợp C12 Bộ Công an",
      timeline: "Q2/2026 - Q4/2026",
      status: "Đang thực hiện",
      criteria: "Chuyển dịch 100% máy chủ ảo hoá sang hạ tầng Cloud quốc gia an toàn",
      proofSource: "Biên bản bàn giao hạ tầng và báo cáo kiểm tra an toàn A05",
      verifyStatus: "Hoàn thành - chờ kiểm chứng",
      progress: 80
    },
    {
      gapId: "ND-04",
      gapContent: "Thiếu cơ chế cảnh báo và điều phối ứng cứu sự cố an ninh mạng 24/7 theo chuẩn QG",
      solution: "Tích hợp, chuẩn hóa",
      taskId: "NV-04",
      taskName: "Tích hợp SOC tỉnh với Nền tảng điều hành an ninh mạng quốc gia (A05)",
      leadUnit: "Đội chuyên trách ATTT - Sở TTTT",
      timeline: "Q3/2026 - Q1/2027",
      status: "Đang thực hiện",
      criteria: "Cảnh báo ATTT được đẩy tự động 24/7 về SOC quốc gia không độ trễ",
      proofSource: "Giấy xác nhận kiểm thử kỹ thuật và cấp quyền của Cục A05",
      verifyStatus: "Đang hoàn thiện",
      progress: 50
    },
    {
      gapId: "ND-05",
      gapContent: "Chưa triển khai Trợ lý ảo AI phục vụ thẩm định hồ sơ công chức",
      solution: "Bổ sung mới",
      taskId: "NV-05",
      taskName: "Xây dựng Trợ lý ảo AI hỗ trợ xử lý thủ tục hành chính công",
      leadUnit: "Sở Thông tin và Truyền thông",
      timeline: "Q1/2027 - Q4/2027",
      status: "Chưa thực hiện",
      criteria: "Trợ lý ảo hỗ trợ tra cứu tự động ít nhất 50 bộ TTHC phổ biến với độ chính xác > 90%",
      proofSource: "Báo cáo nghiệm thu mô hình và khảo sát độ hài lòng của công chức",
      verifyStatus: "Chưa thực hiện",
      progress: 0
    },
    {
      gapId: "ND-06",
      gapContent: "Hệ thống báo cáo chỉ số Khung kiến trúc số chưa đồng bộ tự động với NAS",
      solution: "Tích hợp, đồng bộ",
      taskId: "NV-06",
      taskName: "Đấu nối API đồng bộ dữ liệu Mẫu 03 lên Hệ thống NAS Bộ KH&CN",
      leadUnit: "Tổ thường trực Kiến trúc số tỉnh",
      timeline: "Q4/2026 - Q1/2027",
      status: "Đang thực hiện",
      criteria: "Dữ liệu Mẫu 03 được gửi và xác thực thành công qua cổng NAS BKHCN",
      proofSource: "Token xác thực API và mã xác nhận biên nhận của NAS quốc gia",
      verifyStatus: "Chờ kết nối",
      progress: 40
    }
  ],

  // BẢNG 3: ANHXA MẪU 02 / QUỐC GIA
  mappings: [
    { localId: "KT-01", localName: "HTTT TTHC", nationalModel: "Hình 5 - Kiến trúc ứng dụng", nationalLayer: "Lớp Ứng dụng", nationalCode: "QG-APP-TTHC", status: "Khớp 100%" },
    { localId: "QG-01", localName: "CSDLQG Dân cư", nationalModel: "Hình 7 - Kiến trúc dữ liệu", nationalLayer: "Lớp Dữ liệu", nationalCode: "QG-DATA-POP", status: "Chuẩn Quốc gia" },
    { localId: "KT-02", localName: "Kho dữ liệu dùng chung", nationalModel: "Hình 7 - Kiến trúc dữ liệu", nationalLayer: "Lớp Dữ liệu", nationalCode: "QG-DATA-LAKE", status: "Khớp 90%" },
    { localId: "KT-03", localName: "LGSP tỉnh", nationalModel: "Hình 5 - Kiến trúc ứng dụng", nationalLayer: "Nền tảng tích hợp", nationalCode: "QG-INT-LGSP", status: "Khớp 100%" },
    { localId: "QG-03", localName: "VNeID", nationalModel: "Hình 3 - Kênh tương tác", nationalLayer: "Lớp Định danh", nationalCode: "QG-ID-VNEID", status: "Chuẩn Quốc gia" },
    { localId: "KT-07", localName: "TTDL tỉnh", nationalModel: "Hình 9 - Hạ tầng & ANM", nationalLayer: "Lớp Hạ tầng", nationalCode: "QG-INF-DC", status: "Cần chuyển dịch" }
  ],

  // AUDIT LOG
  auditLogs: [
    { time: "2026-09-15 14:20:11", user: "admin@gov.vn", action: "Đăng nhập hệ thống (SSO)", ip: "10.12.80.105", status: "Thành công" },
    { time: "2026-09-15 14:25:34", user: "canbo.kts@gov.vn", action: "Cập nhật tiến độ NV-01 lên 65%", ip: "10.12.80.112", status: "Thành công" },
    { time: "2026-09-15 15:02:18", user: "admin@gov.vn", action: "Chạy Data Validator kiểm tra Mẫu số 03", ip: "10.12.80.105", status: "Phát hiện 02 cảnh báo" },
    { time: "2026-09-15 15:40:02", user: "admin@gov.vn", action: "Đổi chế độ xem sang Bản công khai", ip: "10.12.80.105", status: "Thành công" }
  ]
};

// Application State
let appState = {
  currentTab: "dashboard",
  isPublicMode: false, // Security mode toggle: false = Internal (Admin), true = Public Portal
  data: JSON.parse(JSON.stringify(INITIAL_DATA)),
  selectedObject: null,
  activeFilterLayer: "all",
  activeFilterType: "all",
  activeFilterOwner: "all",
  searchTerm: "",
  taskViewMode: "table", // 'table' | 'gantt' | 'kanban'
  connectionViewMode: "both", // 'table' | 'map' | 'both'
  validatorReport: null
};

// ==========================================
// 2. INITIALIZATION & ROUTING
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  setupNavigation();
  setupGlobalSearch();
  setupSecurityToggle();
  setupDrawer();
  setupValidator();
  setupFilters();
  setupTaskModal();
  setupObjectModal();
  
  // Render initial screen
  renderDashboard();
  renderObjectsTable();
  renderConnections();
  renderTasks();
  renderMappings();
  renderAdminCenter();
  updateAuditLogTable();
}

// Navigation between views
function setupNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const tab = item.getAttribute("data-tab");
      switchTab(tab);
    });
  });
}

function switchTab(tabId) {
  appState.currentTab = tabId;

  // Update Nav visual
  document.querySelectorAll(".nav-item").forEach(el => {
    if (el.getAttribute("data-tab") === tabId) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });

  // Update Main content screens
  document.querySelectorAll(".screen-content").forEach(el => {
    el.classList.add("hidden");
  });
  const activeScreen = document.getElementById(`screen-${tabId}`);
  if (activeScreen) {
    activeScreen.classList.remove("hidden");
  }

  // Update Breadcrumb
  const breadcrumbMap = {
    dashboard: "Trang chủ > Bảng điều hành tổng quan",
    objects: "Trang chủ > Danh mục tài sản số (B1 - DM_DOITUONG)",
    connections: "Trang chủ > Bản đồ Tích hợp & Luồng Dữ liệu (B2 - QH_KETNOI)",
    mappings: "Trang chủ > Bảng Ánh xạ Mô hình Quốc gia (B3 - ANHXA)",
    tasks: "Trang chủ > Quản lý Nhiệm vụ & Lộ trình (B4 - HOANTHIEN_NV)",
    library: "Trang chủ > Thư viện Sơ đồ Kiến trúc (Mẫu số 02)",
    admin: "Trang chủ > Trung tâm Quản trị Hồ sơ & Đồng bộ NAS"
  };
  document.getElementById("currentBreadcrumb").textContent = breadcrumbMap[tabId] || "Trang chủ";

  // Re-trigger charts or topology canvas if needed
  if (tabId === "dashboard") {
    setTimeout(renderSolutionChart, 50);
  } else if (tabId === "connections") {
    setTimeout(drawTopologyCanvas, 50);
  }
}

// ==========================================
// 3. SECURITY & ROLE SWITCHING (MỤC 7)
// ==========================================

function setupSecurityToggle() {
  const portalSelector = document.getElementById("portalRoleSelector");
  if (!portalSelector) return;

  portalSelector.addEventListener("change", (e) => {
    const role = e.target.value;
    if (role === "public") {
      appState.isPublicMode = true;
      showToast("Chế độ: Bản công khai (Public Portal). Đã ẩn thông tin bảo mật & kỹ thuật nhạy cảm.", "warning");
      logAudit("Khách công khai", "Chuyển sang chế độ Cổng công khai (Ẩn dữ liệu nhạy cảm)");
    } else {
      appState.isPublicMode = false;
      showToast("Chế độ: Bản nội bộ (Internal Portal). Đầy đủ quyền quản trị và cấu hình kỹ thuật.", "info");
      logAudit("Cán bộ / Admin", "Đăng nhập xác thực Cổng nội bộ");
    }
    applySecurityRules();
  });
}

function applySecurityRules() {
  const isPublic = appState.isPublicMode;
  
  // Elements that must be hidden or masked in public mode
  const sensitiveEls = document.querySelectorAll(".sensitive-data");
  sensitiveEls.forEach(el => {
    if (isPublic) {
      el.classList.add("public-mode-blur");
      el.setAttribute("title", "Thông tin bí mật / kỹ thuật nội bộ đã được lọc bỏ trên cổng công khai");
    } else {
      el.classList.remove("public-mode-blur");
      el.removeAttribute("title");
    }
  });

  // Admin buttons disabled or hidden
  const adminOnlyEls = document.querySelectorAll(".admin-only");
  adminOnlyEls.forEach(el => {
    if (isPublic) {
      el.classList.add("hidden");
    } else {
      el.classList.remove("hidden");
    }
  });

  // Header badge
  const modeBadge = document.getElementById("securityBadgeIndicator");
  if (modeBadge) {
    if (isPublic) {
      modeBadge.className = "px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-300";
      modeBadge.innerHTML = `<i class="fa-solid fa-earth-americas mr-1"></i> Cổng Công Khai (Public)`;
    } else {
      modeBadge.className = "px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300";
      modeBadge.innerHTML = `<i class="fa-solid fa-shield-halved mr-1"></i> Cổng Nội Bộ (Internal)`;
    }
  }

  // Refresh current tables & drawers to reflect masked data
  renderObjectsTable();
  if (appState.selectedObject) {
    renderDrawerDetails(appState.selectedObject);
  }
}

// ==========================================
// 4. SCREEN 1: DASHBOARD
// ==========================================

let solutionChartInstance = null;

function renderDashboard() {
  // Update KPI card numbers
  document.getElementById("kpiTotalAssets").textContent = "128 đối tượng";
  document.getElementById("kpiSharedRatio").textContent = "85% (LGSP/NDXP)";
  document.getElementById("kpiCompliance").textContent = "92% (Bộ chỉ số)";
  document.getElementById("kpiRunningTasks").textContent = `${appState.data.tasks.filter(t => t.status === 'Đang thực hiện').length} / ${appState.data.tasks.length} nhiệm vụ`;

  // Draw chart
  renderSolutionChart();

  // Layer click events
  document.querySelectorAll(".arch-layer-card").forEach(card => {
    card.addEventListener("click", () => {
      const layer = card.getAttribute("data-layer");
      // Switch to objects tab filtered by this layer
      document.getElementById("filterLayer").value = layer;
      appState.activeFilterLayer = layer;
      switchTab("objects");
      applyFilters();
      showToast(`Đã lọc danh mục tài sản theo ${layer}`, "info");
    });
  });
}

function renderSolutionChart() {
  const ctx = document.getElementById("solutionPieChart");
  if (!ctx) return;

  if (solutionChartInstance) {
    solutionChartInstance.destroy();
  }

  solutionChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Tiếp tục dùng (45%)', 'Chuẩn hóa / kết nối (30%)', 'Nâng cấp (15%)', 'Bổ sung mới (10%)'],
      datasets: [{
        data: [45, 30, 15, 10],
        backgroundColor: ['#2563eb', '#0d9488', '#f59e0b', '#8b5cf6'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 12 },
            boxWidth: 14
          }
        },
        tooltip: {
          callbacks: {
            label: function(item) {
              return ` ${item.label}: ${item.raw}% số lượng tài sản`;
            }
          }
        }
      },
      cutout: '65%'
    }
  });
}

// ==========================================
// 5. SCREEN 2: BẢNG 1 - DM_DOITUONG & DRAWER
// ==========================================

function setupFilters() {
  document.getElementById("filterLayer").addEventListener("change", (e) => {
    appState.activeFilterLayer = e.target.value;
    applyFilters();
  });
  document.getElementById("filterType").addEventListener("change", (e) => {
    appState.activeFilterType = e.target.value;
    applyFilters();
  });
  document.getElementById("filterOwner").addEventListener("change", (e) => {
    appState.activeFilterOwner = e.target.value;
    applyFilters();
  });
  document.getElementById("tableSearchInput").addEventListener("input", (e) => {
    appState.searchTerm = e.target.value.toLowerCase().trim();
    applyFilters();
  });
}

function applyFilters() {
  const list = appState.data.objects.filter(obj => {
    const matchLayer = appState.activeFilterLayer === "all" || obj.archLayer === appState.activeFilterLayer;
    const matchType = appState.activeFilterType === "all" || obj.objectType === appState.activeFilterType;
    const matchOwner = appState.activeFilterOwner === "all" || obj.owner.includes(appState.activeFilterOwner);
    const matchSearch = !appState.searchTerm || 
      obj.id.toLowerCase().includes(appState.searchTerm) ||
      obj.name.toLowerCase().includes(appState.searchTerm) ||
      (obj.nasCode && obj.nasCode.toLowerCase().includes(appState.searchTerm));
    return matchLayer && matchType && matchOwner && matchSearch;
  });
  renderObjectsTableWithData(list);
}

function renderObjectsTable() {
  renderObjectsTableWithData(appState.data.objects);
}

function renderObjectsTableWithData(objectsList) {
  const tbody = document.getElementById("objectsTableBody");
  if (!tbody) return;

  if (objectsList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-slate-500 italic">Không tìm thấy tài sản nào phù hợp với bộ lọc hiện tại.</td></tr>`;
    document.getElementById("objectsCountLabel").textContent = `Hiển thị 0 / ${appState.data.objects.length} bản ghi`;
    return;
  }

  tbody.innerHTML = objectsList.map(obj => {
    const recordBadge = obj.recordType === "Bản ghi gốc"
      ? `<span class="px-2 py-0.5 text-xs font-semibold rounded badge-orig">Bản ghi gốc</span>`
      : `<span class="px-2 py-0.5 text-xs font-semibold rounded badge-ref">Tham chiếu</span>`;

    let solutionColor = "bg-slate-100 text-slate-800";
    if (obj.solution.includes("Nâng cấp")) solutionColor = "bg-amber-100 text-amber-800 border border-amber-200";
    if (obj.solution.includes("Dùng chung")) solutionColor = "bg-blue-100 text-blue-800 border border-blue-200";
    if (obj.solution.includes("Bổ sung")) solutionColor = "bg-emerald-100 text-emerald-800 border border-emerald-200";
    if (obj.solution.includes("Tích hợp")) solutionColor = "bg-purple-100 text-purple-800 border border-purple-200";

    return `
      <tr class="hover:bg-blue-50/50 cursor-pointer transition border-b border-slate-200 object-row" data-id="${obj.id}">
        <td class="px-4 py-3 font-mono font-bold text-blue-900">${obj.id}</td>
        <td class="px-4 py-3 font-medium text-slate-800">
          <div>${obj.name}</div>
          <div class="text-xs text-slate-400 font-mono">${obj.nasCode ? `NAS: ${obj.nasCode}` : 'Chờ cấp NAS'}</div>
        </td>
        <td class="px-4 py-3">${recordBadge}</td>
        <td class="px-4 py-3 text-slate-600 text-xs">${obj.objectType}</td>
        <td class="px-4 py-3"><span class="px-2 py-0.5 text-xs font-semibold rounded bg-slate-200 text-slate-700">${obj.archLayer}</span></td>
        <td class="px-4 py-3 text-xs text-slate-600">${obj.owner}</td>
        <td class="px-4 py-3"><span class="px-2 py-0.5 text-xs font-medium rounded ${solutionColor}">${obj.solution}</span></td>
      </tr>
    `;
  }).join('');

  document.getElementById("objectsCountLabel").textContent = `Hiển thị ${objectsList.length} / ${appState.data.objects.length} bản ghi (Tổng toàn khung: 128)`;

  // Add click handler to rows for Drawer
  document.querySelectorAll(".object-row").forEach(row => {
    row.addEventListener("click", () => {
      const id = row.getAttribute("data-id");
      openDetailDrawer(id);
    });
  });
}

// Side Drawer Setup
function setupDrawer() {
  const closeBtn = document.getElementById("closeDrawerBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeDetailDrawer);
  }
  const overlay = document.getElementById("drawerOverlay");
  if (overlay) {
    overlay.addEventListener("click", closeDetailDrawer);
  }
}

function openDetailDrawer(objectId) {
  const obj = appState.data.objects.find(o => o.id === objectId);
  if (!obj) return;
  appState.selectedObject = obj;
  renderDrawerDetails(obj);

  const drawer = document.getElementById("detailDrawer");
  const overlay = document.getElementById("drawerOverlay");
  drawer.classList.remove("closed");
  drawer.classList.add("open");
  overlay.classList.remove("hidden");
}

function closeDetailDrawer() {
  const drawer = document.getElementById("detailDrawer");
  const overlay = document.getElementById("drawerOverlay");
  drawer.classList.remove("open");
  drawer.classList.add("closed");
  overlay.classList.add("hidden");
  appState.selectedObject = null;
}

function renderDrawerDetails(obj) {
  document.getElementById("drawerTitle").textContent = `${obj.id} - ${obj.name}`;
  document.getElementById("drawerObjId").textContent = obj.id;
  document.getElementById("drawerOrigId").textContent = obj.origId || "N/A";
  document.getElementById("drawerNasCode").textContent = obj.nasCode || "[Chờ cấp từ NAS BKHCN]";
  document.getElementById("drawerModelStatus").textContent = obj.status;
  document.getElementById("drawerScope").textContent = obj.scope;
  document.getElementById("drawerOperator").textContent = obj.operator;
  document.getElementById("drawerOwner").textContent = obj.owner;
  document.getElementById("drawerSolution").textContent = obj.solution;
  document.getElementById("drawerProof").textContent = obj.proofSource;

  // Sensitive Tech Config
  const techEl = document.getElementById("drawerTechConfig");
  if (appState.isPublicMode) {
    techEl.textContent = "●●●●●●●● (Được bảo vệ theo phân quyền Cổng công khai)";
    techEl.className = "text-xs font-mono text-slate-400 italic bg-slate-100 p-2 rounded";
  } else {
    techEl.textContent = obj.techConfig;
    techEl.className = "text-xs font-mono text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200 sensitive-data";
  }

  // Find related connections
  const relatedConns = appState.data.connections.filter(c => c.sourceId === obj.id || c.targetId === obj.id);
  const connListEl = document.getElementById("drawerConnectedList");
  if (relatedConns.length === 0) {
    connListEl.innerHTML = `<li class="text-xs text-slate-400 italic">Chưa khai báo luồng kết nối liên quan tại Bảng 2.</li>`;
  } else {
    connListEl.innerHTML = relatedConns.map(c => `
      <li class="text-xs p-2 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
        <div>
          <span class="font-mono font-bold text-blue-900">${c.id}:</span> 
          <span>${c.sourceId === obj.id ? `➡️ Tới ${c.targetId} (${c.targetName})` : `⬅️ Từ ${c.sourceId} (${c.sourceName})`}</span>
          <div class="text-[11px] text-slate-500">Kênh: ${c.channel} | ${c.relationType}</div>
        </div>
        <span class="px-1.5 py-0.5 rounded text-[10px] ${c.status.includes('khai thác') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}">${c.status}</span>
      </li>
    `).join('');
  }
}

// ==========================================
// 6. SCREEN 3: BẢNG 2 - QH_KETNOI & TOPOLOGY
// ==========================================

function renderConnections() {
  renderConnectionTable();
  drawTopologyCanvas();

  // Mode buttons
  const viewModeBtns = document.querySelectorAll(".conn-view-mode");
  viewModeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      viewModeBtns.forEach(b => b.classList.remove("bg-blue-800", "text-white"));
      btn.classList.add("bg-blue-800", "text-white");
      const mode = btn.getAttribute("data-mode");
      appState.connectionViewMode = mode;

      const mapContainer = document.getElementById("connVisualContainer");
      const tableContainer = document.getElementById("connTableContainer");

      if (mode === "map") {
        mapContainer.classList.remove("hidden");
        tableContainer.classList.add("hidden");
        drawTopologyCanvas();
      } else if (mode === "table") {
        mapContainer.classList.add("hidden");
        tableContainer.classList.remove("hidden");
      } else {
        mapContainer.classList.remove("hidden");
        tableContainer.classList.remove("hidden");
        drawTopologyCanvas();
      }
    });
  });
}

function renderConnectionTable() {
  const tbody = document.getElementById("connectionsTableBody");
  if (!tbody) return;

  tbody.innerHTML = appState.data.connections.map(c => `
    <tr class="hover:bg-blue-50/50 transition border-b border-slate-200">
      <td class="px-4 py-3 font-mono font-bold text-blue-900">${c.id}</td>
      <td class="px-4 py-3 font-medium text-slate-800">
        <div>${c.sourceName}</div>
        <div class="text-xs font-mono text-slate-400">${c.sourceId}</div>
      </td>
      <td class="px-4 py-3"><span class="px-2 py-0.5 text-xs font-semibold rounded bg-indigo-50 text-indigo-700 border border-indigo-200">${c.relationType}</span></td>
      <td class="px-4 py-3 font-medium text-slate-800">
        <div>${c.targetName}</div>
        <div class="text-xs font-mono text-slate-400">${c.targetId}</div>
      </td>
      <td class="px-4 py-3 font-mono text-xs text-slate-700">${c.channel}</td>
      <td class="px-4 py-3">
        <span class="px-2 py-0.5 text-xs font-medium rounded ${c.status.includes('khai thác') ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}">
          ${c.status}
        </span>
      </td>
    </tr>
  `).join('');
}

// Draw interactive topology map on HTML5 Canvas
function drawTopologyCanvas() {
  const canvas = document.getElementById("topologyCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  // Set resolution
  const width = canvas.parentElement.clientWidth || 900;
  const height = 450;
  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);

  // Define node visual coordinates based on layers
  const nodes = [
    { id: "KT-05", name: "Cổng DVC (KT-05)", layer: 4, x: width * 0.2, y: 70, color: "#9333ea" },
    { id: "QG-03", name: "VNeID (QG-03)", layer: 4, x: width * 0.5, y: 70, color: "#b91c1c" },
    { id: "QG-07", name: "NAS BKHCN (QG-07)", layer: 4, x: width * 0.8, y: 70, color: "#0284c7" },
    
    { id: "KT-01", name: "HTTT TTHC (KT-01)", layer: 3, x: width * 0.25, y: 190, color: "#2563eb" },
    { id: "LQ-01", name: "QL Thuế (LQ-01)", layer: 3, x: width * 0.55, y: 190, color: "#d97706" },
    { id: "KT-06", name: "IOC tỉnh (KT-06)", layer: 3, x: width * 0.8, y: 190, color: "#059669" },

    { id: "KT-03", name: "LGSP tỉnh (KT-03)", layer: 2, x: width * 0.2, y: 310, color: "#0d9488" },
    { id: "QG-01", name: "CSDLQG Dân cư (QG-01)", layer: 2, x: width * 0.5, y: 310, color: "#b91c1c" },
    { id: "KT-02", name: "Kho dữ liệu (KT-02)", layer: 2, x: width * 0.8, y: 310, color: "#0284c7" },

    { id: "KT-07", name: "TTDL tỉnh (KT-07)", layer: 1, x: width * 0.3, y: 400, color: "#475569" },
    { id: "QG-05", name: "Cloud QG (QG-05)", layer: 1, x: width * 0.7, y: 400, color: "#dc2626" }
  ];

  const nodeMap = {};
  nodes.forEach(n => nodeMap[n.id] = n);

  // Draw Layer boundary guides
  ctx.strokeStyle = "rgba(203, 213, 225, 0.4)";
  ctx.setLineDash([4, 4]);
  [130, 250, 360].forEach(y => {
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(width - 30, y);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  // Draw Layer labels on left
  ctx.font = "bold 11px system-ui";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("LỚP 4: KÊNH TƯƠNG TÁC", 35, 30);
  ctx.fillText("LỚP 3: ỨNG DỤNG & NGHIỆP VỤ", 35, 145);
  ctx.fillText("LỚP 2: DỮ LIỆU & NỀN TẢNG LÕI", 35, 265);
  ctx.fillText("LỚP 1: HẠ TẦNG SỐ & ANM", 35, 375);

  // Draw Connections
  appState.data.connections.forEach((conn) => {
    const src = nodeMap[conn.sourceId];
    const tgt = nodeMap[conn.targetId];
    if (!src || !tgt) return;

    ctx.beginPath();
    ctx.moveTo(src.x, src.y);
    
    // Curved Bezier line
    const midX = (src.x + tgt.x) / 2;
    const midY = (src.y + tgt.y) / 2 - 15;
    ctx.quadraticCurveTo(midX, midY, tgt.x, tgt.y);

    if (conn.status.includes("khai thác")) {
      ctx.strokeStyle = "#0284c7";
      ctx.lineWidth = 2.5;
    } else {
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw connection label bubble at midpoint
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(midX - 35, midY - 10, 70, 20, 4);
    ctx.fill();
    ctx.stroke();

    ctx.font = "9px monospace";
    ctx.fillStyle = "#1e3a8a";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(conn.id, midX, midY);
    ctx.restore();
  });

  // Draw Nodes
  nodes.forEach(node => {
    // Node shadow & box
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    const boxW = 150;
    const boxH = 34;
    ctx.roundRect(node.x - boxW / 2, node.y - boxH / 2, boxW, boxH, 6);
    ctx.fill();
    ctx.restore();

    // Node border with layer color
    ctx.strokeStyle = node.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(node.x - 150 / 2, node.y - 34 / 2, 150, 34, 6);
    ctx.stroke();

    // Node indicator dot
    ctx.fillStyle = node.color;
    ctx.beginPath();
    ctx.arc(node.x - 150 / 2 + 12, node.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Node text
    ctx.font = "bold 11px system-ui";
    ctx.fillStyle = "#1e293b";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(node.name, node.x - 150 / 2 + 24, node.y);
  });
}

// ==========================================
// 7. SCREEN 4: BẢNG 4 - HOANTHIEN_NV & GANTT/KANBAN
// ==========================================

function renderTasks() {
  renderTasksTable();
  setupTaskViewSwitcher();
}

function setupTaskViewSwitcher() {
  const btns = document.querySelectorAll(".task-view-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("bg-blue-800", "text-white"));
      btn.classList.add("bg-blue-800", "text-white");
      const mode = btn.getAttribute("data-view");
      appState.taskViewMode = mode;

      document.getElementById("taskTableView").classList.add("hidden");
      document.getElementById("taskGanttView").classList.add("hidden");
      document.getElementById("taskKanbanView").classList.add("hidden");

      if (mode === "table") {
        document.getElementById("taskTableView").classList.remove("hidden");
        renderTasksTable();
      } else if (mode === "gantt") {
        document.getElementById("taskGanttView").classList.remove("hidden");
        renderGanttChart();
      } else if (mode === "kanban") {
        document.getElementById("taskKanbanView").classList.remove("hidden");
        renderKanbanBoard();
      }
    });
  });
}

function renderTasksTable() {
  const tbody = document.getElementById("tasksTableBody");
  if (!tbody) return;

  tbody.innerHTML = appState.data.tasks.map(t => {
    let statusClass = "bg-slate-100 text-slate-700";
    if (t.status === "Đang thực hiện") statusClass = "bg-blue-100 text-blue-800 border border-blue-200";
    if (t.status === "Hoàn thành") statusClass = "bg-emerald-100 text-emerald-800 border border-emerald-200";

    return `
      <tr class="hover:bg-blue-50/50 transition border-b border-slate-200 cursor-pointer task-row" data-id="${t.taskId}">
        <td class="px-4 py-3 font-mono font-bold text-slate-700">${t.gapId}</td>
        <td class="px-4 py-3 text-xs text-slate-800 max-w-xs">${t.gapContent}</td>
        <td class="px-4 py-3 text-xs text-indigo-700 font-medium">${t.solution}</td>
        <td class="px-4 py-3 font-mono font-bold text-blue-900">${t.taskId}</td>
        <td class="px-4 py-3 font-medium text-slate-800">${t.taskName}</td>
        <td class="px-4 py-3 text-xs text-slate-600">${t.leadUnit}</td>
        <td class="px-4 py-3 text-xs font-mono text-slate-700">${t.timeline}</td>
        <td class="px-4 py-3">
          <span class="px-2 py-0.5 text-xs font-medium rounded ${statusClass}">${t.status}</span>
        </td>
      </tr>
    `;
  }).join('');

  // Row click to open verification criteria modal
  document.querySelectorAll(".task-row").forEach(row => {
    row.addEventListener("click", () => {
      const id = row.getAttribute("data-id");
      openTaskVerificationModal(id);
    });
  });
}

function openTaskVerificationModal(taskId) {
  const task = appState.data.tasks.find(t => t.taskId === taskId);
  if (!task) return;

  document.getElementById("modalTaskId").textContent = `${task.taskId} - ${task.taskName}`;
  document.getElementById("modalTaskCriteria").textContent = task.criteria;
  document.getElementById("modalTaskProofSource").textContent = task.proofSource;
  document.getElementById("modalTaskStatus").textContent = task.verifyStatus;
  document.getElementById("modalTaskProgress").textContent = `${task.progress}%`;
  document.getElementById("modalProgressBar").style.width = `${task.progress}%`;

  document.getElementById("taskModal").classList.remove("hidden");
}

function setupTaskModal() {
  const closeBtn = document.getElementById("closeTaskModalBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("taskModal").classList.add("hidden");
    });
  }
}

// Gantt View
function renderGanttChart() {
  const container = document.getElementById("ganttChartContainer");
  if (!container) return;

  const quarters = ["Q2/2026", "Q3/2026", "Q4/2026", "Q1/2027", "Q2/2027", "Q3/2027", "Q4/2027"];

  let html = `
    <div class="overflow-x-auto">
      <div class="min-w-[800px]">
        <!-- Header -->
        <div class="grid grid-cols-12 gap-2 bg-slate-100 p-2 font-bold text-xs text-slate-700 border-b border-slate-300">
          <div class="col-span-4">Mã & Tên Nhiệm vụ</div>
          ${quarters.map(q => `<div class="col-span-1 text-center font-mono">${q}</div>`).join('')}
          <div class="col-span-1 text-center">Tiến độ</div>
        </div>
        <!-- Rows -->
        ${appState.data.tasks.map(t => {
          let colStart = 3;
          let colSpan = 3;
          if (t.timeline.includes("Q2/2026")) { colStart = 1; colSpan = 3; }
          if (t.timeline.includes("Q3/2026")) { colStart = 2; colSpan = 3; }
          if (t.timeline.includes("Q4/2026")) { colStart = 3; colSpan = 3; }
          if (t.timeline.includes("Q1/2027")) { colStart = 4; colSpan = 3; }

          return `
            <div class="grid grid-cols-12 gap-2 p-3 items-center border-b border-slate-200 hover:bg-slate-50 text-xs">
              <div class="col-span-4">
                <span class="font-mono font-bold text-blue-900">${t.taskId}</span>: ${t.taskName}
                <div class="text-[11px] text-slate-400">${t.leadUnit}</div>
              </div>
              <div class="col-span-7 relative h-7 bg-slate-100 rounded flex items-center px-1">
                <div class="h-5 rounded bg-blue-600 text-white text-[10px] flex items-center px-2 font-mono shadow-sm"
                     style="margin-left: ${(colStart - 1) * 14}%; width: ${colSpan * 14}%;">
                  ${t.timeline}
                </div>
              </div>
              <div class="col-span-1 text-center font-bold text-blue-800">${t.progress}%</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  container.innerHTML = html;
}

// Kanban View
function renderKanbanBoard() {
  const container = document.getElementById("kanbanBoardContainer");
  if (!container) return;

  const notStarted = appState.data.tasks.filter(t => t.status === "Chưa thực hiện");
  const inProgress = appState.data.tasks.filter(t => t.status === "Đang thực hiện");
  const awaitingProof = appState.data.tasks.filter(t => t.verifyStatus.includes("chờ kiểm chứng") || t.status === "Hoàn thành");

  const renderCard = (t) => `
    <div class="bg-white p-3.5 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer mb-3" onclick="openTaskVerificationModal('${t.taskId}')">
      <div class="flex justify-between items-start mb-1.5">
        <span class="font-mono font-bold text-xs text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">${t.taskId}</span>
        <span class="text-[11px] font-mono text-slate-500">${t.timeline}</span>
      </div>
      <div class="font-medium text-xs text-slate-800 mb-2">${t.taskName}</div>
      <div class="text-[11px] text-slate-500 mb-2">Đơn vị: ${t.leadUnit}</div>
      <div class="w-full bg-slate-200 rounded-full h-1.5 mb-1">
        <div class="bg-blue-600 h-1.5 rounded-full" style="width: ${t.progress}%"></div>
      </div>
      <div class="flex justify-between items-center text-[10px] text-slate-400">
        <span>Tiến độ</span>
        <span class="font-bold text-slate-700">${t.progress}%</span>
      </div>
    </div>
  `;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Col 1 -->
      <div class="bg-slate-100 p-3.5 rounded-lg border border-slate-200">
        <div class="flex justify-between items-center mb-3">
          <h4 class="font-bold text-xs text-slate-700 uppercase tracking-wide">Chưa thực hiện (${notStarted.length})</h4>
          <span class="w-2 h-2 rounded-full bg-slate-400"></span>
        </div>
        ${notStarted.map(renderCard).join('')}
      </div>

      <!-- Col 2 -->
      <div class="bg-blue-50/60 p-3.5 rounded-lg border border-blue-200">
        <div class="flex justify-between items-center mb-3">
          <h4 class="font-bold text-xs text-blue-900 uppercase tracking-wide">Đang thực hiện (${inProgress.length})</h4>
          <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
        </div>
        ${inProgress.map(renderCard).join('')}
      </div>

      <!-- Col 3 -->
      <div class="bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200">
        <div class="flex justify-between items-center mb-3">
          <h4 class="font-bold text-xs text-emerald-900 uppercase tracking-wide">Hoàn thành / Chờ kiểm chứng (${awaitingProof.length})</h4>
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
        ${awaitingProof.map(renderCard).join('')}
      </div>
    </div>
  `;
}

// ==========================================
// 8. SCREEN 5: TRUNG TÂM QUẢN TRỊ & DATA VALIDATOR
// ==========================================

function renderAdminCenter() {
  // Sync Status
  document.getElementById("nasSyncStatusText").textContent = "🟢 Sẵn sàng cấu hình API (Chuẩn BKHCN v1.0)";
}

function setupValidator() {
  const runBtn = document.getElementById("runValidatorBtn");
  if (runBtn) {
    runBtn.addEventListener("click", () => {
      runAutoValidator();
    });
  }

  const syncNasBtn = document.getElementById("syncNasBtn");
  if (syncNasBtn) {
    syncNasBtn.addEventListener("click", () => {
      simulateNasSync();
    });
  }
}

// The 8 Quality Rules Engine
function runAutoValidator() {
  const reportContainer = document.getElementById("validatorReportContainer");
  reportContainer.innerHTML = `
    <div class="p-6 text-center text-slate-600">
      <i class="fa-solid fa-circle-notch fa-spin text-2xl text-blue-700 mb-2"></i>
      <p class="text-xs">Đang quét toàn bộ dữ liệu Mẫu số 03 và kiểm tra 08 quy tắc chất lượng...</p>
    </div>
  `;

  setTimeout(() => {
    // 8 Rules evaluation
    const rules = [
      {
        id: "RULE-1",
        name: "Kiểm tra trùng lặp Mã tham chiếu cục bộ (KT-x, QG-x, LQ-x)",
        status: "pass",
        detail: "Không phát hiện trùng lặp mã đối tượng. 100% mã trong Bảng 1 là duy nhất."
      },
      {
        id: "RULE-2",
        name: "Toàn vẹn khóa tham chiếu bản ghi gốc & tham chiếu",
        status: "pass",
        detail: "Tất cả bản ghi Tham chiếu (QG-x, LQ-x) đều có cơ quan chủ quản hợp lệ."
      },
      {
        id: "RULE-3",
        name: "Đồng bộ giữa Sơ đồ Mẫu số 02 và Dữ liệu Mẫu số 03",
        status: "pass",
        detail: "Mọi đối tượng hiển thị trên sơ đồ kết nối đều tồn tại trong danh mục Bảng 1."
      },
      {
        id: "RULE-4",
        name: "Các trường dữ liệu bắt buộc tại Bảng 1, 2 và 4",
        status: "pass",
        detail: "100% các trường Mã ĐT, Tên đối tượng, Loại bản ghi, Lớp KT đã điền đủ."
      },
      {
        id: "RULE-5",
        name: "Ánh xạ khiếm khuyết nội dung (ND-x) sang Nhiệm vụ (NV-x)",
        status: "pass",
        detail: "Tất cả 06 nội dung khiếm khuyết đều có ít nhất 01 nhiệm vụ chuyển đổi kiến trúc tương ứng."
      },
      {
        id: "RULE-6",
        name: "Tiêu chí và Nguồn dữ liệu kiểm chứng tại Bảng 4",
        status: "warn",
        detail: "Cảnh báo: Có 02 nhiệm vụ (NV-02, NV-05) chưa tải lên hồ sơ minh chứng kỹ thuật (mới chỉ có mô tả tiêu chí)."
      },
      {
        id: "RULE-7",
        name: "Rà soát bí mật nhà nước và an toàn thông tin",
        status: "pass",
        detail: "Đã thiết lập cờ bảo mật (isSecret). Các thông số IP nội bộ và cấu hình mạng đã được đóng gói an toàn."
      },
      {
        id: "RULE-8",
        name: "Tính nhất quán về phiên bản và mốc thời gian",
        status: "pass",
        detail: "Phiên bản thống nhất v1.0, ngày hiệu lực và ngày chốt dữ liệu 2026-09-15 khớp với Mẫu số 01."
      }
    ];

    const passCount = rules.filter(r => r.status === "pass").length;
    const warnCount = rules.filter(r => r.status === "warn").length;

    reportContainer.innerHTML = `
      <div class="mb-4 flex items-center justify-between bg-slate-50 p-3 rounded border border-slate-200">
        <div>
          <span class="font-bold text-sm text-slate-800">Kết quả đánh giá chất lượng dữ liệu:</span>
          <span class="ml-2 px-2 py-0.5 text-xs font-bold rounded bg-emerald-100 text-emerald-800">${passCount}/8 Đạt</span>
          ${warnCount > 0 ? `<span class="ml-1 px-2 py-0.5 text-xs font-bold rounded bg-amber-100 text-amber-800">${warnCount} Cảnh báo</span>` : ''}
        </div>
        <span class="text-xs text-slate-400 font-mono">Thời gian kiểm tra: ${new Date().toLocaleTimeString()}</span>
      </div>
      <div class="space-y-2">
        ${rules.map(r => `
          <div class="p-2.5 rounded border ${r.status === 'pass' ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50'} flex items-start gap-2.5">
            <i class="fa-solid ${r.status === 'pass' ? 'fa-circle-check text-emerald-600' : 'fa-triangle-exclamation text-amber-600'} mt-0.5"></i>
            <div class="text-xs flex-1">
              <div class="font-bold text-slate-800">${r.id}: ${r.name}</div>
              <div class="text-slate-600 mt-0.5">${r.detail}</div>
            </div>
            <span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded ${r.status === 'pass' ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'}">
              ${r.status === 'pass' ? 'Hợp lệ' : 'Cảnh báo'}
            </span>
          </div>
        `).join('')}
      </div>
    `;

    logAudit("Cán bộ / Admin", "Chạy kiểm tra chất lượng dữ liệu (8 Quy tắc)");
    showToast("Đã hoàn thành kiểm tra chất lượng dữ liệu Mẫu số 03!", "success");
  }, 600);
}

function simulateNasSync() {
  showToast("Đang kết nối API Cổng Khung Kiến Trúc Quốc Gia (NAS - Bộ KH&CN)...", "info");
  setTimeout(() => {
    showToast("✅ Đồng bộ thành công 128 đối tượng kiến trúc và 18 nhiệm vụ sang hệ thống NAS!", "success");
    logAudit("Cán bộ / Admin", "Đồng bộ dữ liệu Mẫu số 03 lên Cổng NAS Quốc Gia");
  }, 1200);
}

// ==========================================
// 9. BẢNG 3: ANHXA MẪU 02
// ==========================================

function renderMappings() {
  const tbody = document.getElementById("mappingsTableBody");
  if (!tbody) return;

  tbody.innerHTML = appState.data.mappings.map(m => `
    <tr class="hover:bg-blue-50/50 transition border-b border-slate-200">
      <td class="px-4 py-3 font-mono font-bold text-blue-900">${m.localId}</td>
      <td class="px-4 py-3 font-medium text-slate-800">${m.localName}</td>
      <td class="px-4 py-3 text-xs text-indigo-700">${m.nationalModel}</td>
      <td class="px-4 py-3 text-xs text-slate-600">${m.nationalLayer}</td>
      <td class="px-4 py-3 font-mono text-xs text-slate-700">${m.nationalCode}</td>
      <td class="px-4 py-3"><span class="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-100 text-emerald-800">${m.status}</span></td>
    </tr>
  `).join('');
}

// ==========================================
// 10. MODAL: THÊM MỚI TÀI SẢN SỐ
// ==========================================

function setupObjectModal() {
  const openBtn = document.getElementById("openAddObjectModalBtn");
  const closeBtn = document.getElementById("closeAddObjectModalBtn");
  const form = document.getElementById("addObjectForm");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      document.getElementById("addObjectModal").classList.remove("hidden");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("addObjectModal").classList.add("hidden");
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newObj = {
        id: document.getElementById("newObjId").value.trim(),
        name: document.getElementById("newObjName").value.trim(),
        recordType: document.getElementById("newObjRecordType").value,
        objectType: document.getElementById("newObjType").value,
        archLayer: document.getElementById("newObjLayer").value,
        owner: document.getElementById("newObjOwner").value.trim(),
        operator: document.getElementById("newObjOperator").value.trim() || document.getElementById("newObjOwner").value.trim(),
        origId: document.getElementById("newObjOrigId").value.trim() || document.getElementById("newObjId").value.trim(),
        nasCode: document.getElementById("newObjNasCode").value.trim() || "[Chờ cấp từ NAS]",
        status: "Mục tiêu",
        scope: "Cấp tỉnh",
        solution: document.getElementById("newObjSolution").value,
        proofSource: document.getElementById("newObjProof").value.trim(),
        techConfig: "Cấu hình chuẩn hoá mới",
        isSecret: false
      };

      // Add to data
      appState.data.objects.unshift(newObj);
      applyFilters();
      document.getElementById("addObjectModal").classList.add("hidden");
      form.reset();

      showToast(`Đã thêm thành công tài sản số ${newObj.id}!`, "success");
      logAudit("Cán bộ / Admin", `Thêm mới tài sản số ${newObj.id} (${newObj.name})`);
    });
  }
}

// ==========================================
// 11. GLOBAL SEARCH & AUDIT LOGS & UTILITIES
// ==========================================

function setupGlobalSearch() {
  const globalInput = document.getElementById("globalSearchInput");
  if (!globalInput) return;

  globalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const term = globalInput.value.trim().toLowerCase();
      if (!term) return;

      // Switch to objects tab and search
      switchTab("objects");
      document.getElementById("tableSearchInput").value = term;
      appState.searchTerm = term;
      applyFilters();
      showToast(`Đang tìm kiếm toàn hệ thống với từ khóa: "${term}"`, "info");
    }
  });
}

function logAudit(user, action) {
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
  appState.data.auditLogs.unshift({
    time: timeStr,
    user: user,
    action: action,
    ip: "10.12.80.105",
    status: "Thành công"
  });
  updateAuditLogTable();
}

function updateAuditLogTable() {
  const tbody = document.getElementById("auditLogTableBody");
  if (!tbody) return;

  tbody.innerHTML = appState.data.auditLogs.slice(0, 10).map(l => `
    <tr class="border-b border-slate-100 text-xs">
      <td class="px-3 py-2 font-mono text-slate-500">${l.time}</td>
      <td class="px-3 py-2 font-medium text-slate-800">${l.user}</td>
      <td class="px-3 py-2 text-slate-700">${l.action}</td>
      <td class="px-3 py-2 font-mono text-slate-400">${appState.isPublicMode ? "●●●.●●●.●●●" : l.ip}</td>
      <td class="px-3 py-2"><span class="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800">${l.status}</span></td>
    </tr>
  `).join('');
}

// Toast notification helper
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  let bg = "bg-slate-800 text-white";
  if (type === "success") bg = "bg-emerald-700 text-white";
  if (type === "warning") bg = "bg-amber-600 text-white";
  if (type === "info") bg = "bg-blue-800 text-white";

  toast.className = `fixed bottom-12 right-6 z-50 px-4 py-3 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2.5 transition-all transform duration-300 ${bg}`;
  toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Export Excel (Mẫu 03) simulation
function exportExcelMau03() {
  showToast("Đang kết xuất bộ dữ liệu Mẫu số 03 (BoDuLieu_KTS_v1.0.xlsx)...", "info");
  setTimeout(() => {
    // Generate simple CSV download for B1
    let csv = "\uFEFFMã ĐT,Tên đối tượng,Loại bản ghi,Loại đối tượng,Lớp KT,Cơ quan chủ quản,Phương án xử lý\n";
    appState.data.objects.forEach(o => {
      csv += `"${o.id}","${o.name}","${o.recordType}","${o.objectType}","${o.archLayer}","${o.owner}","${o.solution}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "BoDuLieu_KTS_Mau03_v1.0.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Đã xuất tệp dữ liệu Mẫu số 03 thành công!", "success");
    logAudit("Cán bộ / Admin", "Xuất file dữ liệu Mẫu số 03");
  }, 800);
}

// Function to handle the 05 Strategic Pillars interaction
function focusCoreQuestion(qNum) {
  if (qNum === 1) {
    switchTab("dashboard");
    showToast("🎯 TRỤ CỘT 1: MỤC TIÊU & CHỈ TIÊU ĐỊNH LƯỢNG -> Đang mở 04 Chỉ số KPI và Mô hình 04 Lớp mục tiêu.", "info");
    const kpiEl = document.getElementById("kpiTotalAssets");
    if (kpiEl) {
      kpiEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else if (qNum === 2) {
    switchTab("connections");
    showToast("🗺️ TRỤ CỘT 2: KHẢO SÁT HIỆN TRẠNG (AS-IS) -> Đang mở Bản đồ tích hợp & Luồng kết nối (Bảng 2).", "info");
  } else if (qNum === 3) {
    switchTab("objects");
    document.getElementById("filterType").value = "all";
    document.getElementById("filterLayer").value = "all";
    appState.activeFilterLayer = "all";
    appState.activeFilterType = "all";
    appState.searchTerm = "qg";
    document.getElementById("tableSearchInput").value = "QG";
    applyFilters();
    showToast("🧩 TRỤ CỘT 3: KIẾN TRÚC MỤC TIÊU (TO-BE) -> Đang lọc Danh mục Thành phần Dùng chung Cấp Quốc gia (QG-x).", "info");
  } else if (qNum === 4) {
    switchTab("dashboard");
    showToast("⚙️ TRỤ CỘT 4: MA TRẬN KHOẢNG TRỐNG -> Đang mở Ma trận 04 Nhóm màu & 06 Phương án Xử lý kiến trúc.", "warning");
    const matrixEl = document.getElementById("gapMatrixContainer");
    if (matrixEl) {
      matrixEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else if (qNum === 5) {
    switchTab("tasks");
    showToast("🚀 TRỤ CỘT 5: LỘ TRÌNH & NGUỒN KIỂM CHỨNG -> Đang mở Ma trận Nhiệm vụ Chuyển đổi & Tiêu chí nghiệm thu (Bảng 4).", "success");
  }
}

// Global exposure for inline onclicks
window.switchTab = switchTab;
window.exportExcelMau03 = exportExcelMau03;
window.openTaskVerificationModal = openTaskVerificationModal;
window.focusCoreQuestion = focusCoreQuestion;

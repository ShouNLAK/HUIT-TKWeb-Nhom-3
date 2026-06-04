// =============================================================
// VIET TRAVEL HUB - js/admin.js (Logic trang Quản Trị)
// Kỹ thuật: localStorage CRUD, DOM, Form Validation, Chart vẽ tay
// =============================================================

// Hằng số khóa dữ liệu localStorage
var KEY_TUYEN = 'vth_admin_tuyen';
var KEY_LICHSU = 'viettravel_lichsu';
var KEY_ADMIN_INFO = 'vth_admin_info';
var KEY_ACCESS = 'vth_admin_access';

// ---------------------------------------------------------------
// KHỞI TẠO: Chạy khi trang admin.html load xong
// ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {

    // 1. Kiểm tra quyền admin từ auth.js
    if (typeof layUserHienTai === 'function') {
        var user = layUserHienTai();
        if (!user || user.vaiTro !== 'admin') {
            alert('⛔ Bạn không có quyền truy cập trang này!\nVui lòng đăng nhập bằng tài khoản Admin.');
            window.location.href = 'login.html';
            return;
        }
    }

    // 2. Hiện tên admin trên navbar
    var thongTin = JSON.parse(localStorage.getItem(KEY_ADMIN_INFO)) || {};
    var elTen = document.getElementById('tenAdminHienThi');
    if (elTen) elTen.innerText = thongTin.hoten || 'Admin';

    // Điền form thông tin admin
    var inHoten = document.getElementById('admin-hoten');
    var inEmail = document.getElementById('admin-email');
    if (inHoten) inHoten.value = thongTin.hoten || '';
    if (inEmail) inEmail.value = thongTin.email || '';

    // 3. Thông tin phiên làm việc
    var gioDN = sessionStorage.getItem('vth_login_time') || new Date().toLocaleString('vi-VN');
    var elGioDN = document.getElementById('info-gio-dang-nhap');
    if (elGioDN) elGioDN.innerText = gioDN;

    var elBrowser = document.getElementById('info-trinh-duyet');
    if (elBrowser) {
        var ua = navigator.userAgent;
        var browser = 'Trình duyệt khác';
        if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) browser = 'Google Chrome';
        else if (ua.indexOf('Firefox') > -1) browser = 'Mozilla Firefox';
        else if (ua.indexOf('Edg') > -1) browser = 'Microsoft Edge';
        else if (ua.indexOf('Safari') > -1) browser = 'Safari';
        elBrowser.innerText = browser;
    }

    // Đếm số lần truy cập
    var soLan = parseInt(localStorage.getItem(KEY_ACCESS) || '0') + 1;
    localStorage.setItem(KEY_ACCESS, soLan.toString());
    var elSoLan = document.getElementById('info-so-lan-truy-cap');
    if (elSoLan) elSoLan.innerText = soLan + ' lần';

    // 4. Dữ liệu tuyến đường và lịch sử đặt vé đã được seed từ data.js

    // 5. Load Dashboard và Bảng tuyến đường
    taiDashboard();
    renderBangTuyenDuong();
    veDoanhThuBieuDo();
});

// ---------------------------------------------------------------
// HÀM: Chuyển đổi Tab sidebar
// ---------------------------------------------------------------
function hienTab(tenTab, phanTuNav) {
    // Ẩn tất cả tab
    var tatCaTab = document.querySelectorAll('[id^="tab-"]');
    for (var i = 0; i < tatCaTab.length; i++) {
        tatCaTab[i].style.display = 'none';
    }

    // Bỏ active sidebar nav
    var tatCaNav = document.querySelectorAll('.admin-sidebar .nav-link');
    for (var j = 0; j < tatCaNav.length; j++) {
        tatCaNav[j].classList.remove('active');
    }

    // Hiện tab được chọn
    var tabHien = document.getElementById('tab-' + tenTab);
    if (tabHien) {
        tabHien.style.display = 'block';
        // Animation
        tabHien.style.opacity = '0';
        tabHien.style.transform = 'translateY(12px)';
        setTimeout(function() {
            tabHien.style.transition = 'all 0.35s ease';
            tabHien.style.opacity = '1';
            tabHien.style.transform = 'translateY(0)';
        }, 10);
    }

    // Active nav-link được nhấn
    if (phanTuNav) phanTuNav.classList.add('active');

    // Reload dữ liệu của từng tab
    if (tenTab === 'dashboard') {
        taiDashboard();
        veDoanhThuBieuDo();
    }
    if (tenTab === 'lichsu') taiLichSu();
    if (tenTab === 'quanlytuyen') renderBangTuyenDuong();
    if (tenTab === 'taikhoan') taiThongTinAdmin();
}

// ---------------------------------------------------------------
// HÀM: Tải Dashboard - tính toán thống kê từ localStorage
// ---------------------------------------------------------------
function taiDashboard() {
    var lichSu = JSON.parse(localStorage.getItem(KEY_LICHSU)) || [];
    var danhSachTuyen = JSON.parse(localStorage.getItem(KEY_TUYEN)) || [];

    // Tính thống kê
    var tongDon = lichSu.length;
    var tongDT = 0;
    var tongVe = 0;
    var demLoai = { flight: 0, train: 0, bus: 0 };

    for (var i = 0; i < lichSu.length; i++) {
        tongDT += lichSu[i].tongTien || 0;
        var dsvList = lichSu[i].danhSachVe || [];
        tongVe += dsvList.length;
        for (var k = 0; k < dsvList.length; k++) {
            var loai = dsvList[k].loai || 'flight';
            if (demLoai[loai] !== undefined) demLoai[loai]++;
        }
    }

    // Cập nhật số liệu lên DOM
    animateNumber('thongKeDonHang', tongDon);
    animateNumber('thongKeVeDaBan', tongVe);

    var elDT = document.getElementById('thongKeDoanhThu');
    if (elDT) {
        var dtDisplay = tongDT >= 1000000 ? (tongDT / 1000000).toFixed(1) + 'M' : tongDT.toLocaleString('vi-VN');
        elDT.innerText = dtDisplay;
    }

    var elTuyen = document.getElementById('thongKeTuyen');
    if (elTuyen) elTuyen.innerText = danhSachTuyen.length;

    // Cập nhật progress bars loại vé
    setProgressBar('tienDoMayBay', demLoai.flight, tongVe);
    setProgressBar('tienDoTauHoa', demLoai.train, tongVe);
    setProgressBar('tienDoXeKhach', demLoai.bus, tongVe);

    var elLabelFlight = document.getElementById('demMayBay');
    var elLabelTrain  = document.getElementById('demTauHoa');
    var elLabelBus    = document.getElementById('demXeKhach');
    if (elLabelFlight) elLabelFlight.innerText = demLoai.flight + ' vé';
    if (elLabelTrain)  elLabelTrain.innerText  = demLoai.train  + ' vé';
    if (elLabelBus)    elLabelBus.innerText    = demLoai.bus    + ' vé';

    // Bảng đơn hàng gần nhất (5 cái mới nhất)
    var tbody = document.getElementById('tbody-don-hang');
    if (!tbody) return;

    var donGanNhat = lichSu.slice(-5).reverse();
    
    // Tạo mẫu dữ liệu giả nếu không có đủ đơn hàng
    if (donGanNhat.length === 0) {
        var ngayHienTai = new Date();
        var formatedDate = ngayHienTai.toLocaleDateString('vi-VN');
        donGanNhat = [
            { maDon: 'VTH-9842', ngayMua: formatedDate, danhSachVe: [{}, {}, {}], tongTien: 3450000 },
            { maDon: 'VTH-9841', ngayMua: formatedDate, danhSachVe: [{}, {}], tongTien: 1200000 },
            { maDon: 'VTH-9840', ngayMua: formatedDate, danhSachVe: [{}, {}, {}, {}], tongTien: 4850000 },
            { maDon: 'VTH-9839', ngayMua: formatedDate, danhSachVe: [{}], tongTien: 650000 },
            { maDon: 'VTH-9838', ngayMua: formatedDate, danhSachVe: [{}, {}], tongTien: 2100000 }
        ];
    }

    var html = '';
    for (var m = 0; m < donGanNhat.length; m++) {
        var don = donGanNhat[m];
        var soVeDon = (don.danhSachVe || []).length;
        html += '<tr>';
        html +=   '<td><span class="badge" style="background:rgba(243,156,18,0.2);color:#f39c12;font-weight:700;">' + don.maDon + '</span></td>';
        html +=   '<td class="text-white-50 small">' + don.ngayMua + '</td>';
        html +=   '<td><span class="badge bg-secondary">' + soVeDon + ' vé</span></td>';
        html +=   '<td class="text-success fw-700">' + (don.tongTien || 0).toLocaleString('vi-VN') + ' ₫</td>';
        html +=   '<td>';
        html +=     '<button class="btn btn-sm btn-outline-info" onclick="xemChiTietDon(\'' + don.maDon + '\')" title="Xem chi tiết">';
        html +=       '<i class="bi bi-eye"></i>';
        html +=     '</button>';
        html +=   '</td>';
        html += '</tr>';
    }
    tbody.innerHTML = html;
}

// ---------------------------------------------------------------
// HÀM: Animate số đếm tăng dần
// ---------------------------------------------------------------
function animateNumber(id, diemDen) {
    var el = document.getElementById(id);
    if (!el) return;
    var hienTai = 0;
    var buoc = Math.max(1, Math.ceil(diemDen / 40));
    var timer = setInterval(function() {
        hienTai += buoc;
        if (hienTai >= diemDen) { hienTai = diemDen; clearInterval(timer); }
        el.innerText = hienTai;
    }, 30);
}

// ---------------------------------------------------------------
// HÀM: Set progress bar phần trăm
// ---------------------------------------------------------------
function setProgressBar(id, soHienTai, tongSo) {
    var el = document.getElementById(id);
    if (!el) return;
    var phan = tongSo > 0 ? Math.round((soHienTai / tongSo) * 100) : 0;
    setTimeout(function() {
        el.style.width = phan + '%';
    }, 200);
}

// ---------------------------------------------------------------
// HÀM: Vẽ biểu đồ doanh thu mini bằng CSS bar
// ---------------------------------------------------------------
function veDoanhThuBieuDo() {
    var container = document.getElementById('bieu-do-doanh-thu');
    if (!container) return;

    var lichSu = JSON.parse(localStorage.getItem(KEY_LICHSU)) || [];

    // Thống kê theo tháng (6 tháng gần đây)
    var doanhThuThang = [0, 0, 0, 0, 0, 0];
    var thangNhan = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
    var thangHienTai = new Date().getMonth(); // 0-11

    // Gán nhãn 6 tháng gần nhất
    for (var x = 0; x < 6; x++) {
        var thangIdx = (thangHienTai - 5 + x + 12) % 12;
        thangNhan[x] = 'T' + (thangIdx + 1);
    }

    // Tính doanh thu từ lịch sử
    for (var i = 0; i < lichSu.length; i++) {
        var don = lichSu[i];
        if (!don.ngayMua) continue;
        // Ngày mua dạng: "30/5/2024, 10:30:00"
        var parts = don.ngayMua.split('/');
        if (parts.length >= 2) {
            var thangDon = parseInt(parts[1]) - 1; // 0-based
            for (var t = 0; t < 6; t++) {
                var thangCheck = (thangHienTai - 5 + t + 12) % 12;
                if (thangDon === thangCheck) {
                    doanhThuThang[t] += don.tongTien || 0;
                    break;
                }
            }
        }
    }

    // Nếu không có dữ liệu → dùng dữ liệu mẫu để demo
    var coData = false;
    for (var d = 0; d < doanhThuThang.length; d++) {
        if (doanhThuThang[d] > 0) { coData = true; break; }
    }
    if (!coData) {
        doanhThuThang = [8500000, 12000000, 9500000, 15000000, 11000000, 18000000];
    }

    // Tìm giá trị lớn nhất để tính tỷ lệ
    var maxVal = 0;
    for (var j = 0; j < doanhThuThang.length; j++) {
        if (doanhThuThang[j] > maxVal) maxVal = doanhThuThang[j];
    }
    if (maxVal === 0) maxVal = 1;

    // Màu thanh
    var mauCot = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];

    var html = '<div class="mini-bar-chart">';
    for (var k = 0; k < 6; k++) {
        var chieuCao = Math.max(4, Math.round((doanhThuThang[k] / maxVal) * 160)); // max 160px
        var mauSac = mauCot[k];
        var trGia = doanhThuThang[k] >= 1000000
            ? (doanhThuThang[k] / 1000000).toFixed(1) + 'M'
            : doanhThuThang[k].toLocaleString('vi-VN');

        html += '<div style="display:flex;flex-direction:column;align-items:center;flex:1;">';
        html +=   '<div style="color:#fff; font-size:0.75rem; font-weight:bold; margin-bottom:6px;">' + trGia + '</div>';
        html +=   '<div class="mini-bar" style="height:' + chieuCao + 'px;background:' + mauSac + ';width:90%;border-radius:4px 4px 0 0;" title="' + trGia + '₫"></div>';
        html +=   '<div class="mini-bar-label mt-2">' + thangNhan[k] + '</div>';
        html += '</div>';
    }
    html += '</div>';

    container.innerHTML = html;

    // Vẽ thêm biểu đồ tròn (donut) bằng canvas HTML5
    veDonutBieuDo();
}

// ---------------------------------------------------------------
// HÀM: Vẽ biểu đồ tròn (Donut Chart) bằng canvas - kỹ thuật mới
// ---------------------------------------------------------------
function veDonutBieuDo() {
    var canvas = document.getElementById('bieuDoTron');
    if (!canvas || !canvas.getContext) return;

    var lichSu = JSON.parse(localStorage.getItem(KEY_LICHSU)) || [];
    var demLoai = { 'Máy Bay': 0, 'Tàu Hỏa': 0, 'Xe Khách': 0 };

    for (var i = 0; i < lichSu.length; i++) {
        var dsvList = lichSu[i].danhSachVe || [];
        for (var k = 0; k < dsvList.length; k++) {
            var loai = dsvList[k].loai;
            if (loai === 'flight') demLoai['Máy Bay']++;
            else if (loai === 'train') demLoai['Tàu Hỏa']++;
            else if (loai === 'bus') demLoai['Xe Khách']++;
        }
    }

    var tongVe = demLoai['Máy Bay'] + demLoai['Tàu Hỏa'] + demLoai['Xe Khách'];

    // Dùng mẫu nếu chưa có dữ liệu
    if (tongVe === 0) {
        demLoai = { 'Máy Bay': 60, 'Tàu Hỏa': 25, 'Xe Khách': 15 };
        tongVe = 100;
    }

    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    var cx = w / 2;
    var cy = h / 2;
    var r = Math.min(w, h) / 2 - 8;
    var rIn = r * 0.55; // Lỗ tròn giữa (donut)

    ctx.clearRect(0, 0, w, h);

    var mauSac = ['#3498db', '#2ecc71', '#e74c3c'];
    var ten = ['Máy Bay', 'Tàu Hỏa', 'Xe Khách'];
    var giaTriArr = [demLoai['Máy Bay'], demLoai['Tàu Hỏa'], demLoai['Xe Khách']];

    var gocBatDau = -Math.PI / 2; // Bắt đầu từ 12 giờ

    for (var j = 0; j < giaTriArr.length; j++) {
        if (giaTriArr[j] === 0) continue;
        var gocKetThuc = gocBatDau + (giaTriArr[j] / tongVe) * 2 * Math.PI;

        // Vẽ cung
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, gocBatDau, gocKetThuc);
        ctx.closePath();
        ctx.fillStyle = mauSac[j];
        ctx.fill();

        gocBatDau = gocKetThuc;
    }

    // Vẽ vòng tròn trắng ở giữa (tạo hiệu ứng donut)
    ctx.beginPath();
    ctx.arc(cx, cy, rIn, 0, 2 * Math.PI);
    ctx.fillStyle = '#13132a';
    ctx.fill();

    // Text ở giữa
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tongVe + ' vé', cx, cy);
}

// ---------------------------------------------------------------
// HÀM: Tải lịch sử đặt vé (Tab Lịch Sử)
// ---------------------------------------------------------------
function taiLichSu() {
    var lichSu = JSON.parse(localStorage.getItem(KEY_LICHSU)) || [];
    var tbody = document.getElementById('tbody-lich-su');
    if (!tbody) return;

    if (lichSu.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-secondary py-5">Chưa có lịch sử đặt vé nào.</td></tr>';
        return;
    }

    var html = '';
    // Hiển thị từ mới nhất → cũ nhất
    var dsHienThi = lichSu.slice().reverse();

    for (var i = 0; i < dsHienThi.length; i++) {
        var don = dsHienThi[i];
        var dsvHtml = '';

        var dsvList = don.danhSachVe || [];
        for (var j = 0; j < dsvList.length; j++) {
            var ve = dsvList[j];
            var iconVe = '✈';
            if (ve.loai === 'train') iconVe = '🚆';
            if (ve.loai === 'bus')   iconVe = '🚌';
            dsvHtml += '<div class="small text-white-50">' + iconVe + ' ' + ve.loaiDichVu + ' · ' + ve.tuyen + '</div>';
        }

        // Tên hành khách
        var tenHK = (don.hanhKhach && don.hanhKhach.hoTen) ? don.hanhKhach.hoTen : '---';

        html += '<tr>';
        html +=   '<td class="text-secondary">' + (i + 1) + '</td>';
        html +=   '<td><span class="badge" style="background:rgba(243,156,18,0.2);color:#f0b429;font-size:0.75rem;font-weight:700;">' + don.maDon + '</span></td>';
        html +=   '<td class="text-white-50 small">' + don.ngayMua + '</td>';
        html +=   '<td class="fw-600 text-white small">' + tenHK + '</td>';
        html +=   '<td>' + (dsvHtml || '<span class="text-secondary small">---</span>') + '</td>';
        html +=   '<td class="text-success fw-700">' + (don.tongTien || 0).toLocaleString('vi-VN') + ' ₫</td>';
        html +=   '<td>';
        html +=     '<div class="d-flex gap-1">';
        html +=       '<button class="btn btn-sm btn-outline-info" onclick="xemChiTietDon(\'' + don.maDon + '\')" title="Chi tiết"><i class="bi bi-eye"></i></button>';
        html +=       '<button class="btn btn-sm btn-outline-danger" onclick="xoaDonTheoMa(\'' + don.maDon + '\')" title="Xóa"><i class="bi bi-trash3"></i></button>';
        html +=     '</div>';
        html +=   '</td>';
        html += '</tr>';
    }

    tbody.innerHTML = html;
}

// ---------------------------------------------------------------
// HÀM: Xem chi tiết đơn hàng trong modal
// ---------------------------------------------------------------
function xemChiTietDon(maDon) {
    var lichSu = JSON.parse(localStorage.getItem(KEY_LICHSU)) || [];
    var don = null;
    for (var i = 0; i < lichSu.length; i++) {
        if (lichSu[i].maDon === maDon) { don = lichSu[i]; break; }
    }
    if (!don) { alert('Không tìm thấy đơn hàng!'); return; }

    var hk = don.hanhKhach || {};
    var bodyEl = document.getElementById('modal-don-body');
    if (!bodyEl) {
        // Fallback: dùng alert nếu không có modal
        var msg = 'Mã: ' + don.maDon + '\nNgày: ' + don.ngayMua + '\nKhách: ' + (hk.hoTen || '---') + '\nSĐT: ' + (hk.sdt || '---') + '\nEmail: ' + (hk.email || '---');
        alert(msg);
        return;
    }

    var dsvHtml = '';
    var dsvList = don.danhSachVe || [];
    for (var j = 0; j < dsvList.length; j++) {
        var ve = dsvList[j];
        dsvHtml += '<tr><td class="text-white-50 small">' + ve.loaiDichVu + '</td>';
        dsvHtml += '<td class="small">' + ve.tuyen + '</td>';
        dsvHtml += '<td class="text-warning fw-700 small">' + (ve.gia || 0).toLocaleString('vi-VN') + ' ₫</td></tr>';
    }

    bodyEl.innerHTML =
        '<div class="row g-3">' +
        '  <div class="col-md-6">' +
        '    <div class="p-3 rounded" style="background:rgba(255,255,255,0.05);">' +
        '      <div class="fw-700 text-warning mb-2">Thông Tin Đơn Hàng</div>' +
        '      <div class="small text-white-50">Mã đơn: <span class="text-white fw-700">' + don.maDon + '</span></div>' +
        '      <div class="small text-white-50">Ngày mua: ' + don.ngayMua + '</div>' +
        '      <div class="small text-white-50">Tổng tiền: <span class="text-success fw-700">' + (don.tongTien||0).toLocaleString('vi-VN') + ' ₫</span></div>' +
        '    </div>' +
        '  </div>' +
        '  <div class="col-md-6">' +
        '    <div class="p-3 rounded" style="background:rgba(255,255,255,0.05);">' +
        '      <div class="fw-700 text-primary mb-2">Hành Khách</div>' +
        '      <div class="small text-white-50">Họ tên: <span class="text-white">' + (hk.hoTen || '---') + '</span></div>' +
        '      <div class="small text-white-50">SĐT: ' + (hk.sdt || '---') + '</div>' +
        '      <div class="small text-white-50">Email: ' + (hk.email || '---') + '</div>' +
        '      <div class="small text-white-50">CCCD: ' + (hk.cmnd || '---') + '</div>' +
        '    </div>' +
        '  </div>' +
        '  <div class="col-12">' +
        '    <div class="fw-700 text-white mb-2 small">Danh Sách Vé</div>' +
        '    <table class="table bang-tuyen-duong">' +
        '      <thead><tr><th>Dịch Vụ</th><th>Tuyến</th><th>Giá</th></tr></thead>' +
        '      <tbody>' + (dsvHtml || '<tr><td colspan="3" class="text-secondary text-center">Không có vé</td></tr>') + '</tbody>' +
        '    </table>' +
        '  </div>' +
        '</div>';

    var modal = new bootstrap.Modal(document.getElementById('modal-chi-tiet-don'));
    modal.show();
}

// ---------------------------------------------------------------
// HÀM: Xóa đơn hàng theo mã (DELETE)
// ---------------------------------------------------------------
function xoaDonTheoMa(maDon) {
    var xacNhan = confirm('Bạn có chắc muốn xóa đơn hàng ' + maDon + '?');
    if (!xacNhan) return;

    var lichSu = JSON.parse(localStorage.getItem(KEY_LICHSU)) || [];
    var lichSuMoi = [];
    for (var i = 0; i < lichSu.length; i++) {
        if (lichSu[i].maDon !== maDon) lichSuMoi.push(lichSu[i]);
    }
    localStorage.setItem(KEY_LICHSU, JSON.stringify(lichSuMoi));
    taiLichSu();
    hienToast('Đã xóa đơn hàng ' + maDon + '!', 'success');
}

// ---------------------------------------------------------------
// HÀM: Xóa toàn bộ lịch sử
// ---------------------------------------------------------------
function xoaTatCaLichSu() {
    var xacNhan = confirm('⚠ Bạn có chắc muốn XÓA TOÀN BỘ lịch sử?\nHành động này KHÔNG THỂ hoàn tác!');
    if (!xacNhan) return;
    localStorage.removeItem(KEY_LICHSU);
    taiLichSu();
    hienToast('Đã xóa toàn bộ lịch sử đặt vé!', 'warning');
}

// ---------------------------------------------------------------
// HÀM: CRUD TUYẾN ĐƯỜNG – Render bảng (READ)
// ---------------------------------------------------------------
function renderBangTuyenDuong() {
    var danhSach = JSON.parse(localStorage.getItem(KEY_TUYEN)) || [];
    var tbody = document.getElementById('tbody-tuyen-duong');
    var elSoTuyen = document.getElementById('so-tuyen');

    if (elSoTuyen) elSoTuyen.innerText = danhSach.length;
    if (!tbody) return;

    if (danhSach.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-secondary py-4">Chưa có tuyến đường nào. Hãy thêm tuyến mới!</td></tr>';
        return;
    }

    var html = '';
    for (var i = 0; i < danhSach.length; i++) {
        var t = danhSach[i];
        var mauBadge = 'bg-primary';
        var iconLoai = 'bi-airplane-fill';
        if (t.loai === 'Tàu Hỏa') { mauBadge = 'bg-success'; iconLoai = 'bi-train-front-fill'; }
        if (t.loai === 'Xe Khách') { mauBadge = 'bg-danger'; iconLoai = 'bi-bus-front-fill'; }

        html += '<tr style="animation:fadeInUp 0.3s ease ' + (i * 0.04) + 's both;">';
        html +=   '<td class="text-secondary">' + (i + 1) + '</td>';
        html +=   '<td class="fw-700 text-white">' + t.tenTuyen + '</td>';
        html +=   '<td><span class="badge ' + mauBadge + '"><i class="bi ' + iconLoai + ' me-1"></i>' + t.loai + '</span></td>';
        html +=   '<td class="text-white-50 small"><i class="bi bi-clock me-1"></i>' + t.thoiGian + '</td>';
        html +=   '<td class="text-success fw-700">' + (t.giaTu || 0).toLocaleString('vi-VN') + ' ₫</td>';
        html +=   '<td>';
        html +=     '<div class="d-flex gap-1">';
        html +=       '<button class="btn btn-sm btn-outline-warning" onclick="moModalSua(' + i + ')" title="Sửa"><i class="bi bi-pencil-fill"></i></button>';
        html +=       '<button class="btn btn-sm btn-outline-danger" onclick="xoaTuyen(' + i + ')" title="Xóa"><i class="bi bi-trash3-fill"></i></button>';
        html +=     '</div>';
        html +=   '</td>';
        html += '</tr>';
    }

    tbody.innerHTML = html;

    // Thêm keyframe nếu chưa có
    if (!document.getElementById('admin-keyframes')) {
        var s = document.createElement('style');
        s.id = 'admin-keyframes';
        s.innerText = '@keyframes fadeInUp { from { opacity:0;transform:translateY(10px); } to { opacity:1;transform:translateY(0); } }';
        document.head.appendChild(s);
    }
}

// ---------------------------------------------------------------
// HÀM: Thêm tuyến mới (CREATE)
// ---------------------------------------------------------------
function themTuyenMoi(event) {
    event.preventDefault();

    var tenTuyen = document.getElementById('input-ten-tuyen').value.trim();
    var loai = document.getElementById('input-loai-tuyen').value;
    var thoiGian = document.getElementById('input-tg-chay').value.trim();
    var giaRaw = document.getElementById('input-gia').value;
    var gia = parseInt(giaRaw);

    // Validation từng trường
    if (!tenTuyen || tenTuyen.length < 3) {
        hienLoi('input-ten-tuyen', 'Tên tuyến phải có ít nhất 3 ký tự!');
        return;
    }
    if (!loai) {
        alert('Vui lòng chọn loại phương tiện!');
        return;
    }
    if (!thoiGian) {
        hienLoi('input-tg-chay', 'Vui lòng nhập thời gian!');
        return;
    }
    if (isNaN(gia) || gia < 10000) {
        hienLoi('input-gia', 'Giá phải là số và lớn hơn 10.000 ₫!');
        return;
    }

    // Kiểm tra trùng tên tuyến
    var danhSach = JSON.parse(localStorage.getItem(KEY_TUYEN)) || [];
    for (var k = 0; k < danhSach.length; k++) {
        if (danhSach[k].tenTuyen.toLowerCase() === tenTuyen.toLowerCase()) {
            hienLoi('input-ten-tuyen', 'Tuyến đường này đã tồn tại!');
            return;
        }
    }

    // Tạo ID mới (lấy max ID + 1)
    var idMoi = 1;
    if (danhSach.length > 0) {
        for (var j = 0; j < danhSach.length; j++) {
            if (danhSach[j].id >= idMoi) idMoi = danhSach[j].id + 1;
        }
    }

    var tuyenMoi = { id: idMoi, tenTuyen: tenTuyen, loai: loai, thoiGian: thoiGian, giaTu: gia };
    danhSach.push(tuyenMoi);
    localStorage.setItem(KEY_TUYEN, JSON.stringify(danhSach));

    document.getElementById('form-them-tuyen').reset();
    renderBangTuyenDuong();
    hienToast('Đã thêm tuyến "' + tenTuyen + '" thành công!', 'success');
}

// ---------------------------------------------------------------
// HÀM: Mở modal sửa tuyến (UPDATE - bước 1)
// ---------------------------------------------------------------
function moModalSua(chiSo) {
    var danhSach = JSON.parse(localStorage.getItem(KEY_TUYEN)) || [];
    if (chiSo < 0 || chiSo >= danhSach.length) return;

    var t = danhSach[chiSo];
    document.getElementById('sua-id').value    = chiSo;
    document.getElementById('sua-ten').value   = t.tenTuyen;
    document.getElementById('sua-loai').value  = t.loai;
    document.getElementById('sua-tg').value    = t.thoiGian;
    document.getElementById('sua-gia').value   = t.giaTu;

    var modal = new bootstrap.Modal(document.getElementById('modalSuaTuyen'));
    modal.show();
}

// ---------------------------------------------------------------
// HÀM: Lưu sửa tuyến (UPDATE - bước 2)
// ---------------------------------------------------------------
function luuSuaTuyen() {
    var chiSo = parseInt(document.getElementById('sua-id').value);
    var danhSach = JSON.parse(localStorage.getItem(KEY_TUYEN)) || [];

    if (chiSo < 0 || chiSo >= danhSach.length) return;

    var tenMoi  = document.getElementById('sua-ten').value.trim();
    var loaiMoi = document.getElementById('sua-loai').value;
    var tgMoi   = document.getElementById('sua-tg').value.trim();
    var giaMoi  = parseInt(document.getElementById('sua-gia').value);

    if (!tenMoi || tenMoi.length < 3) { alert('Tên tuyến phải có ít nhất 3 ký tự!'); return; }
    if (!loaiMoi) { alert('Vui lòng chọn loại!'); return; }
    if (!tgMoi) { alert('Vui lòng nhập thời gian chạy!'); return; }
    if (isNaN(giaMoi) || giaMoi < 10000) { alert('Giá không hợp lệ (ít nhất 10.000 ₫)!'); return; }

    // Kiểm tra trùng tên tuyến khi sửa (bỏ qua tuyến hiện tại)
    for (var k = 0; k < danhSach.length; k++) {
        if (k !== chiSo && danhSach[k].tenTuyen.toLowerCase() === tenMoi.toLowerCase()) {
            alert('Tuyến đường này đã tồn tại!');
            return;
        }
    }

    danhSach[chiSo].tenTuyen = tenMoi;
    danhSach[chiSo].loai     = loaiMoi;
    danhSach[chiSo].thoiGian = tgMoi;
    danhSach[chiSo].giaTu    = giaMoi;

    localStorage.setItem(KEY_TUYEN, JSON.stringify(danhSach));

    var modal = bootstrap.Modal.getInstance(document.getElementById('modalSuaTuyen'));
    if (modal) modal.hide();

    renderBangTuyenDuong();
    hienToast('Đã cập nhật tuyến đường thành công!', 'success');
}

// ---------------------------------------------------------------
// HÀM: Xóa tuyến đường (DELETE)
// ---------------------------------------------------------------
function xoaTuyen(chiSo) {
    var danhSach = JSON.parse(localStorage.getItem(KEY_TUYEN)) || [];
    if (chiSo < 0 || chiSo >= danhSach.length) return;

    var ten = danhSach[chiSo].tenTuyen;
    var xacNhan = confirm('Bạn có chắc muốn xóa tuyến "' + ten + '"?');
    if (!xacNhan) return;

    danhSach.splice(chiSo, 1);
    localStorage.setItem(KEY_TUYEN, JSON.stringify(danhSach));
    renderBangTuyenDuong();
    hienToast('Đã xóa tuyến "' + ten + '"!', 'warning');
}

// ---------------------------------------------------------------
// HÀM: Tải thông tin admin vào form
// ---------------------------------------------------------------
function taiThongTinAdmin() {
    var thongTin = JSON.parse(localStorage.getItem(KEY_ADMIN_INFO)) || {};
    var inHoten = document.getElementById('admin-hoten');
    var inEmail = document.getElementById('admin-email');
    if (inHoten) inHoten.value = thongTin.hoten || '';
    if (inEmail) inEmail.value = thongTin.email || '';
}

// ---------------------------------------------------------------
// HÀM: Lưu thông tin tài khoản admin (UPDATE)
// ---------------------------------------------------------------
function luuThongTinAdmin() {
    var hoten   = document.getElementById('admin-hoten').value.trim();
    var email   = document.getElementById('admin-email').value.trim();
    var matkhau = document.getElementById('admin-matkhau').value;

    if (!hoten || hoten.length < 2) {
        alert('Vui lòng nhập Họ và Tên (ít nhất 2 ký tự)!');
        return;
    }
    if (email && (email.indexOf('@') === -1 || email.indexOf('.') === -1)) {
        alert('Email không hợp lệ! (phải có @ và dấu .)');
        return;
    }
    if (matkhau && matkhau.length > 0 && matkhau.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return;
    }

    var thongTin = { hoten: hoten, email: email };
    localStorage.setItem(KEY_ADMIN_INFO, JSON.stringify(thongTin));

    // Cập nhật mật khẩu admin trong danh sách users
    if (matkhau && matkhau.length >= 6 && typeof layUserHienTai === 'function') {
        var users = JSON.parse(localStorage.getItem('vth_users')) || [];
        var user = layUserHienTai();
        if (user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === user.email) {
                    users[i].matKhau = matkhau;
                    break;
                }
            }
            localStorage.setItem('vth_users', JSON.stringify(users));
        }
    }

    // Cập nhật tên hiển thị navbar
    var elTen = document.getElementById('tenAdminHienThi');
    if (elTen) elTen.innerText = hoten;

    document.getElementById('admin-matkhau').value = '';
    hienToast('Đã lưu thông tin tài khoản thành công!', 'success');
}

// ---------------------------------------------------------------
// HÀM: Đăng xuất admin (gọi hàm auth.js)
// ---------------------------------------------------------------
function dangXuat() {
    var xacNhan = confirm('Bạn có muốn đăng xuất khỏi trang Quản Trị?');
    if (!xacNhan) return;

    // Xóa session admin
    sessionStorage.removeItem('vth_current_user');
    sessionStorage.removeItem('admin_session');
    window.location.href = 'login.html';
}

// ---------------------------------------------------------------
// HÀM: Hiện thông báo lỗi dưới input
// ---------------------------------------------------------------
function hienLoi(idInput, noiDung) {
    var el = document.getElementById(idInput);
    if (!el) { alert(noiDung); return; }

    // Xóa lỗi cũ
    var cuaLoi = el.parentElement.querySelector('.err-msg');
    if (cuaLoi) cuaLoi.remove();

    el.classList.add('is-invalid');

    var loi = document.createElement('div');
    loi.className = 'err-msg';
    loi.style.cssText = 'color:#e74c3c;font-size:0.78rem;margin-top:4px;';
    loi.innerText = noiDung;
    el.parentElement.appendChild(loi);

    el.addEventListener('input', function xoaLoi() {
        el.classList.remove('is-invalid');
        var cuaLoiXoa = el.parentElement.querySelector('.err-msg');
        if (cuaLoiXoa) cuaLoiXoa.remove();
        el.removeEventListener('input', xoaLoi);
    });
}

// ---------------------------------------------------------------
// HÀM: Toast thông báo
// ---------------------------------------------------------------
function hienToast(noiDung, loai) {
    var elNoiDung = document.getElementById('toast-noi-dung');
    var elHeader = document.getElementById('toast-header');

    if (elNoiDung) elNoiDung.innerText = noiDung;
    if (elHeader) {
        if (loai === 'warning') elHeader.className = 'toast-header bg-warning text-dark';
        else if (loai === 'danger') elHeader.className = 'toast-header bg-danger text-white';
        else elHeader.className = 'toast-header bg-success text-white';
    }

    var toastEl = document.getElementById('toast-thong-bao');
    if (toastEl) {
        var toast = new bootstrap.Toast(toastEl, { delay: 3500 });
        toast.show();
    }
}

// ---------------------------------------------------------------
// HÀM: Chuyển tab qua MOBILE DROPDOWN (dùng cho màn hình nhỏ)
// Gọi hienTab() và cập nhật nhãn nút dropdown
// ---------------------------------------------------------------
function hienTabMobile(tenTab, tenHienThi) {
    // Cập nhật nhãn nút dropdown hiển thị tab đang chọn
    var elTen = document.getElementById('tenTabHienTai');
    if (elTen) elTen.innerText = tenHienThi;

    // Gọi lại hienTab với null (không cần cập nhật sidebar trên mobile)
    hienTab(tenTab, null);
}

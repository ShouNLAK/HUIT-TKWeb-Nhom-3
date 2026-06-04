// =============================================================
// VIET TRAVEL HUB - js/cart.js (Giỏ Hàng & Thanh Toán)
// Dùng sessionStorage: vth_gio_hang (giỏ hiện tại)
// Dùng localStorage: viettravel_lichsu (lịch sử đã mua)
// =============================================================

// ---------------------------------------------------------------
// HÀM: Thêm vé vào giỏ hàng (dùng ở tất cả trang)
// Tham số mới: loai = 'flight'|'train'|'bus', logoUrl = ảnh hãng
// ---------------------------------------------------------------
function addToCart(loaiDichVu, tuyen, gia, chiTiet, loai, logoUrl) {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];

    var veNhap = {
        id: 'v' + Date.now(),
        loaiDichVu: loaiDichVu,
        tuyen: tuyen,
        gia: gia,
        chiTiet: chiTiet,
        loai: loai || 'flight',
        logoUrl: logoUrl || '',
        soLuong: 1,
        thoiGianThem: new Date().toLocaleString('vi-VN')
    };

    gioHang.push(veNhap);
    sessionStorage.setItem('vth_gio_hang', JSON.stringify(gioHang));

    // Cập nhật counter trên navbar
    capNhatSoLuongGioHang();

    // Thông báo cho người dùng
    var ten = tuyen || loaiDichVu;
    hienToastGioHang('Đã thêm vé <strong>' + ten + '</strong> vào giỏ hàng!');
}

// ---------------------------------------------------------------
// HÀM: Hiện toast thông báo thêm vào giỏ
// ---------------------------------------------------------------
function hienToastGioHang(noiDung) {
    // Tạo toast container nếu chưa có
    var toastContainer = document.getElementById('toast-global-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-global-container';
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    // Tạo toast mới
    var toastId = 'toast-' + Date.now();
    var toastEl = document.createElement('div');
    toastEl.id = toastId;
    toastEl.className = 'toast align-items-center text-white border-0';
    toastEl.style.background = 'linear-gradient(135deg,#2ecc71,#27ae60)';
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML =
        '<div class="d-flex">' +
        '  <div class="toast-body fw-600">' +
        '    <i class="bi bi-cart-check-fill me-2"></i>' + noiDung +
        '    <div class="mt-1"><a href="cart.html" class="text-white fw-700 text-decoration-underline small" onclick="chuyenTrang(event,\'cart.html\')">Xem Giỏ Hàng →</a></div>' +
        '  </div>' +
        '  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>' +
        '</div>';

    toastContainer.appendChild(toastEl);
    var toast = new bootstrap.Toast(toastEl, { delay: 4000 });
    toast.show();

    // Xóa DOM sau khi ẩn
    toastEl.addEventListener('hidden.bs.toast', function() {
        toastEl.remove();
    });
}

// ---------------------------------------------------------------
// CÁC HÀM CHO TRANG cart.html
// ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    // Chỉ chạy code giỏ hàng nếu đang ở trang cart.html
    if (document.getElementById('gio-hang-container')) {
        hienThiGioHang();
    }
});

// ---------------------------------------------------------------
// HÀM: Hiển thị toàn bộ giỏ hàng
// ---------------------------------------------------------------
function hienThiGioHang() {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    var container = document.getElementById('gio-hang-container');
    var elTong = document.getElementById('tong-tien-gioHang');
    var elRong = document.getElementById('empty-cart-msg');
    var elKhungDat = document.getElementById('khung-dat-hang');
    var elSoVe = document.getElementById('so-ve-text');

    if (!container) return;

    // Cập nhật số vé
    if (elSoVe) elSoVe.innerText = gioHang.length + ' vé';

    if (gioHang.length === 0) {
        container.innerHTML = '';
        if (elRong) elRong.style.display = 'block';
        if (elKhungDat) elKhungDat.style.display = 'none';
        if (elTong) elTong.innerText = '0 ₫';
        return;
    }

    if (elRong) elRong.style.display = 'none';
    if (elKhungDat) elKhungDat.style.display = 'block';

    var tongTien = 0;
    var html = '';

    for (var i = 0; i < gioHang.length; i++) {
        var ve = gioHang[i];
        var soLuong = ve.soLuong || 1;
        var thanhTien = (ve.gia || 0) * soLuong;
        tongTien += thanhTien;

        // Biểu tượng + nhãn + class màu theo loại vé (vé kiểu boarding pass)
        var icon = 'bi-airplane-fill';
        var classLoai = '';            // flight = mặc định
        var tenLoai = 'Máy Bay';
        if (ve.loai === 'train') { icon = 'bi-train-front-fill'; classLoai = 'bp-train'; tenLoai = 'Tàu Hỏa'; }
        if (ve.loai === 'bus')   { icon = 'bi-bus-front-fill';   classLoai = 'bp-bus';   tenLoai = 'Xe Khách'; }

        html += '<div class="boarding-pass ' + classLoai + '" id="ve-' + ve.id + '">';

        // Cuống vé bên trái (chữ dọc)
        html +=   '<div class="bp-stub">';
        html +=     '<i class="bi ' + icon + '"></i>';
        html +=     '<span class="bp-stub-label">' + tenLoai + '</span>';
        html +=   '</div>';

        // Đường xé răng cưa
        html +=   '<div class="bp-perf"></div>';

        // Thân vé
        html +=   '<div class="bp-body">';
        html +=     '<div class="fw-800 text-white mb-1">' + ve.loaiDichVu + '</div>';
        html +=     '<div class="fw-900 text-warning fs-4 mb-1" style="line-height:1.1;">' + ve.tuyen + '</div>';
        html +=     '<div class="text-white-50 small mb-1"><i class="bi bi-ticket-perforated me-1"></i>' + ve.chiTiet + '</div>';
        html +=     '<div class="text-white-50" style="font-size:0.78rem;"><i class="bi bi-clock me-1"></i>Thêm lúc: ' + ve.thoiGianThem + '</div>';
        html +=     '<div class="bp-barcode"></div>';
        html +=   '</div>';

        // Cột phải: giá + số lượng + hành động
        html +=   '<div class="bp-side">';
        html +=     '<div>';
        html +=       '<div class="text-white-50" style="font-size:0.7rem;">Đơn giá</div>';
        html +=       '<div class="fw-700 text-white-50" style="font-size:0.95rem;">' + (ve.gia || 0).toLocaleString('vi-VN') + ' ₫</div>';
        html +=     '</div>';
        // Bộ tăng/giảm số lượng
        html +=     '<div class="qty-stepper" title="Số lượng vé">';
        html +=       '<button type="button" class="qty-btn" onclick="giamSoLuong(\'' + ve.id + '\')"' + (soLuong <= 1 ? ' disabled' : '') + '><i class="bi bi-dash-lg"></i></button>';
        html +=       '<span class="qty-num">' + soLuong + '</span>';
        html +=       '<button type="button" class="qty-btn" onclick="tangSoLuong(\'' + ve.id + '\')"><i class="bi bi-plus-lg"></i></button>';
        html +=     '</div>';
        // Thành tiền dòng
        html +=     '<div>';
        html +=       '<div class="text-white-50" style="font-size:0.7rem;">Thành tiền</div>';
        html +=       '<div class="fw-900 text-warning" style="font-size:1.35rem;">' + thanhTien.toLocaleString('vi-VN') + ' ₫</div>';
        html +=     '</div>';
        html +=     '<div class="d-flex gap-2 justify-content-end flex-wrap">';
        // Nút Đổi chỗ — hỗ trợ máy bay, xe khách, tàu hỏa
        html +=       '<button class="btn btn-sm btn-outline-info rounded-pill" onclick="moDoiCho(\'' + ve.id + '\')">';
        html +=         '<i class="bi bi-arrow-left-right"></i> Đổi chỗ';
        html +=       '</button>';
        html +=       '<button class="btn btn-sm btn-outline-danger rounded-pill" onclick="xoaVeKhoiGio(\'' + ve.id + '\')">';
        html +=         '<i class="bi bi-trash3"></i> Xóa';
        html +=       '</button>';
        html +=     '</div>';
        html +=   '</div>';

        html += '</div>';
    }

    container.innerHTML = html;

    // Cập nhật bảng tóm tắt (kiểu biên lai)
    var elTomTat = document.getElementById('tom-tat-body');
    if (elTomTat) {
        var htmlTomTat = '';
        for (var j = 0; j < gioHang.length; j++) {
            var ve2 = gioHang[j];
            var sl2 = ve2.soLuong || 1;
            var tt2 = (ve2.gia || 0) * sl2;
            htmlTomTat += '<tr>';
            htmlTomTat += '  <td class="receipt-name">' + ve2.loaiDichVu +
                          (sl2 > 1 ? ' <span class="text-white-50">×' + sl2 + '</span>' : '') +
                          '<br><small>' + ve2.tuyen + '</small></td>';
            htmlTomTat += '  <td class="receipt-price">' + tt2.toLocaleString('vi-VN') + ' ₫</td>';
            htmlTomTat += '</tr>';
        }
        elTomTat.innerHTML = htmlTomTat;
    }

    // Tính tổng theo phương thức thanh toán đang chọn (gồm giảm giá MoMo)
    capNhatTongThanhToan();
}

// ---------------------------------------------------------------
// HÀM: Xóa 1 vé khỏi giỏ hàng
// ---------------------------------------------------------------
function xoaVeKhoiGio(idVe) {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    var gioMoi = [];

    for (var i = 0; i < gioHang.length; i++) {
        if (gioHang[i].id !== idVe) gioMoi.push(gioHang[i]);
    }

    sessionStorage.setItem('vth_gio_hang', JSON.stringify(gioMoi));
    capNhatSoLuongGioHang();
    hienThiGioHang();
}

// ---------------------------------------------------------------
// HÀM: Tăng / giảm số lượng vé (tối thiểu 1, tối đa 20)
// ---------------------------------------------------------------
var SO_LUONG_TOI_DA = 20;

function doiSoLuong(idVe, delta) {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    for (var i = 0; i < gioHang.length; i++) {
        if (gioHang[i].id === idVe) {
            var sl = (gioHang[i].soLuong || 1) + delta;
            if (sl < 1) sl = 1;
            if (sl > SO_LUONG_TOI_DA) {
                sl = SO_LUONG_TOI_DA;
                alert('Mỗi vé chỉ đặt tối đa ' + SO_LUONG_TOI_DA + ' chỗ. Vui lòng liên hệ tổng đài cho đoàn lớn hơn.');
            }
            gioHang[i].soLuong = sl;
            break;
        }
    }
    sessionStorage.setItem('vth_gio_hang', JSON.stringify(gioHang));
    capNhatSoLuongGioHang();
    hienThiGioHang();
}

function tangSoLuong(idVe) { doiSoLuong(idVe, 1); }
function giamSoLuong(idVe) { doiSoLuong(idVe, -1); }

// ---------------------------------------------------------------
// HÀM: Tính & hiển thị tổng thanh toán theo phương thức đang chọn
// (MoMo giảm 5% trên tạm tính). Dùng lại trong hienThiGioHang + onchange.
// ---------------------------------------------------------------
var TY_LE_GIAM_MOMO = 0.05;

function tinhTamTinh() {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    var tong = 0;
    for (var i = 0; i < gioHang.length; i++) {
        tong += (gioHang[i].gia || 0) * (gioHang[i].soLuong || 1);
    }
    return tong;
}

function layPhuongThucThanhToan() {
    var el = document.querySelector('input[name="thanh-toan"]:checked');
    return el ? el.value : 'bank';
}

function capNhatTongThanhToan() {
    var tamTinh = tinhTamTinh();
    var phuongThuc = layPhuongThucThanhToan();
    var giamGia = (phuongThuc === 'momo') ? Math.round(tamTinh * TY_LE_GIAM_MOMO) : 0;
    var tongThanhToan = tamTinh - giamGia;

    var elTamTinh = document.getElementById('tong-tien-gioHang');
    if (elTamTinh) elTamTinh.innerText = tamTinh.toLocaleString('vi-VN') + ' ₫';

    // Dòng giảm giá MoMo (ẩn nếu không áp dụng)
    var dongGiam = document.getElementById('dong-giam-gia');
    var elGiam = document.getElementById('tien-giam-gia');
    if (dongGiam) dongGiam.style.display = giamGia > 0 ? 'flex' : 'none';
    if (elGiam) elGiam.innerText = '-' + giamGia.toLocaleString('vi-VN') + ' ₫';

    var elTong = document.getElementById('tong-thanh-toan');
    if (elTong) elTong.innerText = tongThanhToan.toLocaleString('vi-VN') + ' ₫';

    return { tamTinh: tamTinh, giamGia: giamGia, tongThanhToan: tongThanhToan, phuongThuc: phuongThuc };
}

// ---------------------------------------------------------------
// HÀM: Hiển thị lỗi inline dưới input (giỏ hàng)
// ---------------------------------------------------------------
function hienLoiCart(inputEl, noiDung) {
    if (!inputEl) return;
    inputEl.style.borderColor = '#e74c3c';
    inputEl.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.25)';

    var msg = document.createElement('div');
    msg.className = 'cart-err-msg';
    msg.style.cssText = 'color:#e74c3c;font-size:0.78rem;margin-top:4px;';
    msg.innerText = '⚠ ' + noiDung;
    inputEl.parentElement.appendChild(msg);

    // Xóa lỗi khi người dùng bắt đầu gõ
    inputEl.addEventListener('input', function xoaBorder() {
        inputEl.style.borderColor = '';
        inputEl.style.boxShadow = '';
        if (msg.parentElement) msg.parentElement.removeChild(msg);
        inputEl.removeEventListener('input', xoaBorder);
    });
}

// ---------------------------------------------------------------
// HÀM: Xóa toàn bộ giỏ hàng
// ---------------------------------------------------------------
function xoaHetGio() {
    var xacNhan = confirm('Bạn có muốn xóa tất cả vé trong giỏ hàng?');
    if (!xacNhan) return;

    sessionStorage.removeItem('vth_gio_hang');
    capNhatSoLuongGioHang();
    hienThiGioHang();
}

// ---------------------------------------------------------------
// HÀM: Đặt hàng (thanh toán)
// ---------------------------------------------------------------
function datHang() {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    if (gioHang.length === 0) {
        alert('Giỏ hàng trống! Vui lòng thêm vé trước.');
        return;
    }

    // Lấy giá trị từ form
    var inHoTen = document.getElementById('hk-hoten');
    var inSdt   = document.getElementById('hk-sdt');
    var inEmail = document.getElementById('hk-email');
    var inCmnd  = document.getElementById('hk-cmnd');

    var hoTen = inHoTen ? inHoTen.value.trim() : '';
    var sdt   = inSdt   ? inSdt.value.trim()   : '';
    var email = inEmail ? inEmail.value.trim()  : '';
    var cmnd  = inCmnd  ? inCmnd.value.trim()   : '';

    // Reset border lỗi cũ
    var allInputs = [inHoTen, inSdt, inEmail, inCmnd];
    for (var x = 0; x < allInputs.length; x++) {
        if (allInputs[x]) { allInputs[x].style.borderColor = ''; allInputs[x].style.boxShadow = ''; }
    }
    var allErrMsg = document.querySelectorAll('.cart-err-msg');
    for (var xe = 0; xe < allErrMsg.length; xe++) { allErrMsg[xe].remove(); }

    // Validate từng trường
    var coLoi = false;

    if (!hoTen || hoTen.length < 2) {
        hienLoiCart(inHoTen, 'Vui lòng nhập Họ và Tên (ít nhất 2 ký tự)!');
        coLoi = true;
    }

    // Kiểm tra SĐT Việt Nam: bắt đầu 0 hoặc +84, 9-11 số
    var sdtSo = sdt.replace(/[^0-9]/g, '');
    if (!sdt || sdtSo.length < 9 || sdtSo.length > 11) {
        hienLoiCart(inSdt, 'Số điện thoại không hợp lệ (9-11 chữ số)!');
        coLoi = true;
    }

    // Kiểm tra email
    if (!email || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        hienLoiCart(inEmail, 'Email không hợp lệ! (phải có @ và domain)');
        coLoi = true;
    }

    // Kiểm tra CCCD: 9 hoặc 12 số
    var cmndSo = cmnd.replace(/[^0-9]/g, '');
    if (!cmnd || (cmndSo.length !== 9 && cmndSo.length !== 12)) {
        hienLoiCart(inCmnd, 'CCCD/CMND phải là 9 số (CMND cũ) hoặc 12 số (CCCD mới)!');
        coLoi = true;
    }

    if (coLoi) {
        // Scroll lên form
        var formEl = document.getElementById('hk-hoten');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // Tính tiền theo phương thức thanh toán (MoMo giảm 5%)
    var tamTinh = tinhTamTinh();
    var phuongThuc = layPhuongThucThanhToan();
    var giamGia = (phuongThuc === 'momo') ? Math.round(tamTinh * TY_LE_GIAM_MOMO) : 0;
    var tongTien = tamTinh - giamGia;

    var nhanThanhToan = {
        bank: 'Chuyển khoản ngân hàng',
        momo: 'Ví MoMo',
        card: 'Thẻ tín dụng/ghi nợ',
        zalopay: 'ZaloPay'
    }[phuongThuc] || 'Chuyển khoản ngân hàng';

    // Tạo mã đơn hàng
    var maDon = 'VTH' + Date.now().toString().slice(-8).toUpperCase();
    var ngayMua = new Date().toLocaleString('vi-VN');

    // Lưu lịch sử vào localStorage
    var lichSu = JSON.parse(localStorage.getItem('viettravel_lichsu')) || [];
    var donMoi = {
        maDon: maDon,
        ngayMua: ngayMua,
        danhSachVe: gioHang,
        tamTinh: tamTinh,
        giamGia: giamGia,
        phuongThucThanhToan: nhanThanhToan,
        tongTien: tongTien,
        hanhKhach: { hoTen: hoTen, sdt: sdt, email: email, cmnd: cmnd }
    };
    lichSu.push(donMoi);
    localStorage.setItem('viettravel_lichsu', JSON.stringify(lichSu));

    // Lưu đơn vừa đặt để trang hóa đơn đọc trực tiếp:
    //  - sessionStorage: cho luồng xem ngay sau khi đặt (cùng phiên).
    //  - localStorage theo mã đơn riêng: bền vững, không bị seedData() trong
    //    data.js ghi đè lên 'viettravel_lichsu' mỗi lần tải trang.
    sessionStorage.setItem('vth_don_in', JSON.stringify(donMoi));
    localStorage.setItem('vth_hoadon_' + maDon, JSON.stringify(donMoi));

    // Xóa giỏ hàng phiên
    sessionStorage.removeItem('vth_gio_hang');
    capNhatSoLuongGioHang();

    // Mở modal thành công
    moModalThanhCong(maDon, donMoi, hoTen);
}

// ---------------------------------------------------------------
// HÀM: Hiển thị modal đặt hàng thành công
// don = object đơn hàng (maDon, danhSachVe, tamTinh, giamGia, tongTien, phuongThucThanhToan)
// ---------------------------------------------------------------
function moModalThanhCong(maDon, don, hoTen) {
    var modalEl = document.getElementById('modal-thanh-cong');
    if (!modalEl) return;

    var danhSachVe = don.danhSachVe || [];

    var bodyEl = document.getElementById('modal-success-body');
    if (bodyEl) {
        var htmlVe = '';
        for (var i = 0; i < danhSachVe.length; i++) {
            var ve = danhSachVe[i];
            var sl = ve.soLuong || 1;
            var tt = (ve.gia || 0) * sl;
            htmlVe += '<div class="d-flex justify-content-between py-2 border-bottom" style="border-color:rgba(255,255,255,0.1)!important;">';
            htmlVe += '  <span class="text-white-50 small">' + ve.loaiDichVu + ' – ' + ve.tuyen + (sl > 1 ? ' <span class="text-white">×' + sl + '</span>' : '') + '</span>';
            htmlVe += '  <span class="text-warning fw-700 small">' + tt.toLocaleString('vi-VN') + ' ₫</span>';
            htmlVe += '</div>';
        }

        // Dòng tạm tính + giảm giá (nếu có)
        var htmlTong = '';
        if (don.giamGia && don.giamGia > 0) {
            htmlTong +=
                '<div class="d-flex justify-content-between px-3 pt-3"><span class="text-white-50 small">Tạm tính</span>' +
                '<span class="text-white small">' + (don.tamTinh || 0).toLocaleString('vi-VN') + ' ₫</span></div>' +
                '<div class="d-flex justify-content-between px-3"><span class="text-success small"><i class="bi bi-piggy-bank-fill me-1"></i>Giảm giá MoMo (5%)</span>' +
                '<span class="text-success small fw-700">-' + don.giamGia.toLocaleString('vi-VN') + ' ₫</span></div>';
        }

        bodyEl.innerHTML =
            '<div class="text-center mb-4">' +
            '  <div style="width:80px;height:80px;background:linear-gradient(135deg,#2ecc71,#27ae60);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">' +
            '    <i class="bi bi-check-lg text-white" style="font-size:2.5rem;"></i>' +
            '  </div>' +
            '  <h4 class="fw-800 text-white">Đặt Vé Thành Công!</h4>' +
            '  <p class="text-white-50">Xin chào <strong class="text-warning">' + hoTen + '</strong>!</p>' +
            '  <div class="p-3 rounded mb-3" style="background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.3);">' +
            '    <div class="text-white-50 small">Mã Đơn Hàng</div>' +
            '    <div class="fw-900 text-success" style="font-size:1.5rem;letter-spacing:2px;">' + maDon + '</div>' +
            '  </div>' +
            '</div>' +
            '<div class="mb-1">' + htmlVe + '</div>' +
            htmlTong +
            '<div class="d-flex justify-content-between p-3 rounded mt-2" style="background:rgba(255,255,255,0.06);">' +
            '  <span class="fw-700 text-white">Tổng Thanh Toán:</span>' +
            '  <span class="fw-900 text-warning fs-5">' + (don.tongTien || 0).toLocaleString('vi-VN') + ' ₫</span>' +
            '</div>' +
            '<div class="text-center text-white-50 small mt-2"><i class="bi bi-credit-card me-1"></i>Hình thức: ' + (don.phuongThucThanhToan || '') + '</div>' +
            '<p class="text-white-50 small text-center mt-3 mb-0">Vé đã được lưu vào lịch sử. Bạn có thể xem & in hóa đơn điện tử.</p>';
    }

    // Gắn link hóa đơn cho nút "Xem & In Hóa Đơn"
    var nutHoaDon = document.getElementById('btn-xem-hoadon');
    if (nutHoaDon) nutHoaDon.setAttribute('href', 'hoadon.html?maDon=' + encodeURIComponent(maDon));

    var modal = new bootstrap.Modal(modalEl);
    modal.show();

    // Refresh giỏ hàng UI
    hienThiGioHang();
}

// =============================================================
// ĐỔI CHỖ NGỒI NGAY TRONG GIỎ HÀNG
// Hỗ trợ: máy bay (flight), xe khách (bus), tàu hỏa (train).
// Cách lấy dữ liệu: đọc lại mã chuyến/chỗ từ chuỗi chiTiet; giá gốc
// tra trong mockFlights/mockTrains (data.js) hoặc suy ra từ chính vé
// (xe). KHÔNG sửa flight.js/train.js/bus.js (giữ nguyên file teammate).
// =============================================================

// Phụ phí / chênh lệch giá (khớp với flight.js, train.js, bus.js)
var PHU_PHI_THUONG_GIA = 800000;   // ghế Thương Gia máy bay
var CHENH_GIUONG_TANG_DUOI_XE = 50000; // xe: tầng dưới đắt hơn tầng trên 50k

// Trạng thái đang đổi chỗ
var veDangDoiCho = null;     // { id, loai, ... thông tin theo loại }
var choMoiDoiCho = null;     // lựa chọn mới { ma, gia, ...mô tả để dựng lại chiTiet }

// ---------------------------------------------------------------
// HÀM: Phân tích chiTiet vé máy bay → { maGhe, hangGhe, code, ngay }
// chiTiet dạng: "Ghế 12A · Phổ Thông · Chuyến VN-241 · 02/12/2025"
// ---------------------------------------------------------------
function phanTichVeMayBay(ve) {
    var kq = { maGhe: '', hangGhe: 'Phổ Thông', code: '', ngay: '' };
    if (!ve || !ve.chiTiet) return kq;

    var phan = ve.chiTiet.split(' · ');
    for (var i = 0; i < phan.length; i++) {
        var p = phan[i].trim();
        if (p.indexOf('Ghế ') === 0)        kq.maGhe = p.replace('Ghế ', '').trim();
        else if (p.indexOf('Chuyến ') === 0) kq.code = p.replace('Chuyến ', '').trim();
        else if (p.indexOf('Thương Gia') > -1) kq.hangGhe = 'Thương Gia';
        else if (p.indexOf('Phổ Thông') > -1)  kq.hangGhe = 'Phổ Thông';
        else if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(p)) kq.ngay = p;
    }
    return kq;
}

// ---------------------------------------------------------------
// HÀM: Mở modal đổi chỗ (dispatch theo loại vé)
// ---------------------------------------------------------------
function moDoiCho(idVe) {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    var ve = null;
    for (var i = 0; i < gioHang.length; i++) {
        if (gioHang[i].id === idVe) { ve = gioHang[i]; break; }
    }
    if (!ve) return;

    switch (ve.loai) {
        case 'flight': moDoiChoMayBay(ve); break;
        case 'bus':    moDoiChoXe(ve);     break;
        case 'train':  moDoiChoTau(ve);    break;
        default:
            alert('Loại vé này chưa hỗ trợ đổi chỗ.');
    }
}

// ---------------------------------------------------------------
// HÀM PHỤ: Thiết lập chung cho modal đổi chỗ (header màu + legend)
// loaiMau: 'flight'|'train'|'bus' để đổi màu header.
// ---------------------------------------------------------------
function _thietLapModalDoiCho(loaiMau, infoText, legendHtml) {
    var mau = {
        flight: 'linear-gradient(135deg,#0d6efd,#00c6ff)',
        train:  'linear-gradient(135deg,#2ecc71,#27ae60)',
        bus:    'linear-gradient(135deg,#e74c3c,#c0392b)'
    };
    var header = document.getElementById('doi-cho-modal-header');
    if (header) header.style.background = mau[loaiMau] || mau.flight;

    var elInfo = document.getElementById('doi-cho-info');
    if (elInfo) elInfo.innerText = infoText;

    var elLegend = document.getElementById('doi-cho-legend');
    if (elLegend) elLegend.innerHTML = legendHtml;

    var nutXN = document.getElementById('btn-confirm-doi-cho');
    if (nutXN) { nutXN.disabled = true; nutXN.innerHTML = '<i class="bi bi-check2-circle me-1"></i> Xác Nhận Đổi Chỗ'; }
}

// Mẩu legend dùng lại
function _legendDot(bg, border, label) {
    return '<div class="legend-item"><div class="legend-dot" style="background:' + bg +
           ';border-color:' + border + ';"></div><span>' + label + '</span></div>';
}
var LEGEND_DANG_CHON = function() { return _legendDot('linear-gradient(135deg,#0d6efd,#00c6ff)', '#0b5ed7', 'Đang Chọn'); };

// ---------------------------------------------------------------
// HÀM: Mở modal đổi chỗ cho vé máy bay
// ---------------------------------------------------------------
function moDoiChoMayBay(ve) {
    var info = phanTichVeMayBay(ve);

    // Tra cứu chuyến trong mockFlights theo mã chuyến (code)
    var flight = null;
    if (typeof mockFlights !== 'undefined') {
        for (var i = 0; i < mockFlights.length; i++) {
            if (mockFlights[i].code === info.code) { flight = mockFlights[i]; break; }
        }
    }
    if (!flight) {
        alert('Không tìm thấy thông tin chuyến bay để đổi chỗ.');
        return;
    }

    veDangDoiCho = { id: ve.id, loai: 'flight', code: info.code, ngay: info.ngay, flight: flight };
    choMoiDoiCho = null;

    var info2 = flight.airline + ' · ' + flight.code + ' · ' + flight.from + ' → ' + flight.to +
                (info.ngay ? ' · ' + info.ngay : '');
    var legend =
        _legendDot('#fdebd0', '#f0b27a', 'Thương Gia') +
        _legendDot('#d5f5e3', '#82e0aa', 'Phổ Thông') +
        LEGEND_DANG_CHON() +
        _legendDot('#eee', '#bbb', 'Đã Đặt');
    _thietLapModalDoiCho('flight', info2, legend);

    // Ghế hiện tại ở footer
    var elSeatInfo = document.getElementById('doi-cho-seat-info');
    if (elSeatInfo) {
        elSeatInfo.innerHTML = 'Ghế hiện tại: <span class="text-white fw-700">' + info.maGhe +
            '</span> <span class="badge bg-secondary ms-1">' + info.hangGhe + '</span>';
    }

    // Vẽ sơ đồ + đánh dấu ghế hiện tại
    veSoDoGheTrongGio(flight, info.maGhe, ve.id);

    var modal = new bootstrap.Modal(document.getElementById('modal-doi-cho'));
    modal.show();
}

// ---------------------------------------------------------------
// HÀM: Vẽ sơ đồ ghế máy bay trong giỏ (tái dùng CSS .plane-seat ...)
// gheHienTai: ghế của vé đang sửa (đánh dấu .selected, luôn cho chọn).
// idVeHienTai: để loại trừ khi tính ghế đã bị các vé khác trong giỏ giữ.
// ---------------------------------------------------------------
function veSoDoGheTrongGio(flight, gheHienTai, idVeHienTai) {
    var container = document.getElementById('doi-cho-seat-map');
    if (!container) return;

    // Ghế đã đặt sẵn (demo, khớp với flight.js)
    var gheDaDat = ['1A','1B','3C','5E','7A','9B','12C','14F','18D','22A','25C'];

    // Cộng thêm các ghế đang được vé KHÁC trong giỏ giữ trên cùng chuyến này
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    for (var g = 0; g < gioHang.length; g++) {
        var v = gioHang[g];
        if (v.loai !== 'flight' || v.id === idVeHienTai) continue;
        var tt = phanTichVeMayBay(v);
        if (tt.code === flight.code && tt.maGhe && gheDaDat.indexOf(tt.maGhe) === -1) {
            gheDaDat.push(tt.maGhe);
        }
    }
    // Ghế hiện tại không tính là "đã đặt" (cho phép giữ nguyên)
    var idx = gheDaDat.indexOf(gheHienTai);
    if (idx > -1) gheDaDat.splice(idx, 1);

    var html = '';

    // Mũi máy bay
    html += '<div style="text-align:center;padding:10px;background:linear-gradient(180deg,#3498db,#1a5276);border-radius:50% 50% 0 0/30% 30% 0 0;color:#fff;font-size:1.5rem;margin-bottom:6px;">';
    html += '<i class="bi bi-airplane-fill"></i></div>';

    // HẠNG THƯƠNG GIA (hàng 1-4, cấu hình 2-2)
    html += '<div class="plane-class-label" style="color:#e67e22;border-color:#e67e22;">✨ Hạng Thương Gia – Business Class</div>';
    var chuCot = ['A','B','','C','D'];
    for (var hang = 1; hang <= 4; hang++) {
        html += '<div class="seat-row"><span class="row-num">' + hang + '</span><div class="seat-grp">';
        for (var ci = 0; ci < chuCot.length; ci++) {
            var cotKy = chuCot[ci];
            if (cotKy === '') { html += '<div class="seat-aisle"></div>'; continue; }
            var maGhe = hang + cotKy;
            var laDaDat = gheDaDat.indexOf(maGhe) > -1;
            var laHienTai = (maGhe === gheHienTai);
            var cls = 'plane-seat business' + (laDaDat ? ' booked' : '') + (laHienTai ? ' selected' : '');
            html += '<div class="' + cls + '" onclick="chonGheDoiCho(this,\'' + maGhe + '\',\'business\')">' + maGhe + '</div>';
        }
        html += '</div></div>';
    }

    // Cánh máy bay
    html += '<div class="aircraft-wing"></div>';

    // HẠNG PHỔ THÔNG (hàng 5-30, cấu hình 3-3)
    html += '<div class="plane-class-label" style="margin-top:10px;">🪑 Hạng Phổ Thông – Economy Class</div>';
    var chuCotEco = ['A','B','C','','D','E','F'];
    for (var hang2 = 5; hang2 <= 30; hang2++) {
        html += '<div class="seat-row"><span class="row-num">' + hang2 + '</span><div class="seat-grp">';
        for (var ci2 = 0; ci2 < chuCotEco.length; ci2++) {
            var cotKy2 = chuCotEco[ci2];
            if (cotKy2 === '') { html += '<div class="seat-aisle"></div>'; continue; }
            var maGhe2 = hang2 + cotKy2;
            var laDaDat2 = gheDaDat.indexOf(maGhe2) > -1;
            var laHienTai2 = (maGhe2 === gheHienTai);
            var cls2 = 'plane-seat economy' + (laDaDat2 ? ' booked' : '') + (laHienTai2 ? ' selected' : '');
            html += '<div class="' + cls2 + '" onclick="chonGheDoiCho(this,\'' + maGhe2 + '\',\'economy\')">' + maGhe2 + '</div>';
        }
        html += '</div></div>';
    }

    // Đuôi máy bay
    html += '<div style="height:20px;background:linear-gradient(135deg,#3498db,#1a5276);border-radius:0 0 8px 8px;margin-top:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.65rem;font-weight:700;">Đuôi Tàu Bay</div>';

    container.innerHTML = html;
}

// ---------------------------------------------------------------
// HÀM PHỤ: Hiện lựa chọn mới ở footer + bật nút xác nhận (dùng chung)
// ---------------------------------------------------------------
function _hienChoMoi(ma, badge, gia, nhanNut) {
    var elSeatInfo = document.getElementById('doi-cho-seat-info');
    if (elSeatInfo) {
        elSeatInfo.innerHTML = 'Chỗ mới: <span class="text-white fw-700">' + ma + '</span>' +
            ' <span class="badge bg-secondary ms-1">' + badge + '</span>' +
            ' <span class="text-warning ms-2 fw-700">' + gia.toLocaleString('vi-VN') + ' ₫</span>';
    }
    var nutXN = document.getElementById('btn-confirm-doi-cho');
    if (nutXN) { nutXN.disabled = false; nutXN.innerHTML = '<i class="bi bi-check2-circle me-1"></i> ' + nhanNut; }
}

// ---------------------------------------------------------------
// HÀM: Chọn ghế MÁY BAY mới khi đổi chỗ
// ---------------------------------------------------------------
function chonGheDoiCho(phanTu, maGhe, hangGhe) {
    if (phanTu.classList.contains('booked')) {
        alert('Ghế ' + maGhe + ' đã có người đặt! Vui lòng chọn ghế khác.');
        return;
    }
    if (!veDangDoiCho || !veDangDoiCho.flight) return;

    var dsGhe = document.querySelectorAll('#doi-cho-seat-map .plane-seat.selected');
    for (var i = 0; i < dsGhe.length; i++) dsGhe[i].classList.remove('selected');
    phanTu.classList.add('selected');

    var giaGoc = veDangDoiCho.flight.price;
    var tenHang, gia;
    if (hangGhe === 'business') { tenHang = 'Thương Gia'; gia = giaGoc + PHU_PHI_THUONG_GIA; }
    else                       { tenHang = 'Phổ Thông';  gia = giaGoc; }

    choMoiDoiCho = { ma: maGhe, moTa: tenHang, gia: gia };
    _hienChoMoi(maGhe, tenHang, gia, 'Đổi sang ghế ' + maGhe);
}

// ===============================================================
// ĐỔI CHỖ — XE KHÁCH (loai === 'bus')
// Sơ đồ xe giường nằm 2 tầng cố định → giá gốc suy ra từ chính vé
// (không cần tra mockBuses): base = gia - 50k nếu đang ở Tầng Dưới.
// ===============================================================

// Phân tích chiTiet vé xe: "D1 · Tầng Dưới · Phương Trang · 02/12/2025"
function phanTichVeXe(ve) {
    var kq = { maGiuong: '', tang: '', company: '', ngay: '' };
    if (!ve || !ve.chiTiet) return kq;
    var phan = ve.chiTiet.split(' · ');
    if (phan[0]) kq.maGiuong = phan[0].trim();
    if (phan[1]) kq.tang = phan[1].trim();
    if (phan[2]) kq.company = phan[2].trim();
    for (var i = 0; i < phan.length; i++) {
        if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(phan[i].trim())) kq.ngay = phan[i].trim();
    }
    return kq;
}

function moDoiChoXe(ve) {
    var info = phanTichVeXe(ve);
    // Suy ra giá gốc của chuyến từ vé hiện tại
    var giaGoc = (info.tang === 'Tầng Dưới') ? (ve.gia - CHENH_GIUONG_TANG_DUOI_XE) : ve.gia;

    veDangDoiCho = { id: ve.id, loai: 'bus', company: info.company, ngay: info.ngay, giaGoc: giaGoc };
    choMoiDoiCho = null;

    var info2 = (ve.loaiDichVu || 'Xe khách') + ' · ' + (ve.tuyen || '') + (info.ngay ? ' · ' + info.ngay : '');
    var legend =
        _legendDot('#fff', '#e74c3c', 'Tầng Dưới (+50K)') +
        _legendDot('#fdebd0', '#f0b27a', 'Tầng Trên') +
        LEGEND_DANG_CHON() +
        _legendDot('linear-gradient(135deg,#bdc3c7,#95a5a6)', '#7f8c8d', 'Đã Đặt');
    _thietLapModalDoiCho('bus', info2, legend);

    var elSeatInfo = document.getElementById('doi-cho-seat-info');
    if (elSeatInfo) {
        elSeatInfo.innerHTML = 'Giường hiện tại: <span class="text-white fw-700">' + info.maGiuong +
            '</span> <span class="badge bg-danger ms-1">' + info.tang + '</span>';
    }

    veSoDoXeTrongGio(ve, info.maGiuong);

    var modal = new bootstrap.Modal(document.getElementById('modal-doi-cho'));
    modal.show();
}

// Vẽ sơ đồ xe 2 tầng (tái dùng CSS .bus-bed .bus-row .bus-aisle)
function veSoDoXeTrongGio(ve, giuongHienTai) {
    var container = document.getElementById('doi-cho-seat-map');
    if (!container) return;

    // Giường đã đặt (demo, khớp bus.js) cho mỗi tầng
    var daDat = { lower: ['D1','D4','D7','D12'], upper: ['U2','U6','U9'] };

    // Cộng giường đang bị vé KHÁC trong giỏ giữ trên cùng tuyến + hãng
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    for (var g = 0; g < gioHang.length; g++) {
        var v = gioHang[g];
        if (v.loai !== 'bus' || v.id === ve.id) continue;
        if (v.tuyen === ve.tuyen) {
            var tt = phanTichVeXe(v);
            if (!tt.maGiuong) continue;
            var floor = tt.maGiuong.charAt(0) === 'U' ? 'upper' : 'lower';
            if (daDat[floor].indexOf(tt.maGiuong) === -1) daDat[floor].push(tt.maGiuong);
        }
    }
    // Giường hiện tại không tính là đã đặt
    var floorHt = giuongHienTai.charAt(0) === 'U' ? 'upper' : 'lower';
    var idxHt = daDat[floorHt].indexOf(giuongHienTai);
    if (idxHt > -1) daDat[floorHt].splice(idxHt, 1);

    var html = '<div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap;">';
    html += _veMotTangXe('lower', 'Tầng Dưới', daDat.lower, giuongHienTai);
    html += _veMotTangXe('upper', 'Tầng Trên', daDat.upper, giuongHienTai);
    html += '</div>';
    container.innerHTML = html;
}

function _veMotTangXe(tang, tenTang, daDatList, giuongHienTai) {
    var prefix = tang === 'lower' ? 'D' : 'U';
    var html = '<div>';
    html += '<div class="text-center fw-700 mb-2" style="color:#2c3e50;font-size:0.78rem;letter-spacing:1px;">' +
            (tang === 'lower' ? '⬇ ' : '⬆ ') + tenTang.toUpperCase() + '</div>';

    for (var hang = 1; hang <= 9; hang++) {
        var soTrai = (hang - 1) * 2 + 1;
        var soPhai = soTrai + 1;
        var maTrai = prefix + soTrai, maPhai = prefix + soPhai;
        html += '<div class="bus-row">';
        html += _veGiuongXe(maTrai, tang, daDatList, giuongHienTai);
        html += '<div class="bus-aisle"><i class="bi bi-three-dots-vertical text-secondary"></i></div>';
        html += _veGiuongXe(maPhai, tang, daDatList, giuongHienTai);
        html += '</div>';
    }
    // Giường cuối lẻ
    var maCuoi = prefix + '19';
    html += '<div class="bus-row justify-content-center">';
    html += _veGiuongXe(maCuoi, tang, daDatList, giuongHienTai, ' (Cuối)', 'width:180px;');
    html += '</div>';

    html += '</div>';
    return html;
}

function _veGiuongXe(ma, tang, daDatList, giuongHienTai, hauTo, styleThem) {
    var laDaDat = daDatList.indexOf(ma) > -1;
    var laHienTai = (ma === giuongHienTai);
    var cls = 'bus-bed' + (laDaDat ? ' booked' : '') + (laHienTai ? ' selected' : '');
    var st = styleThem ? ' style="' + styleThem + '"' : '';
    return '<div class="' + cls + '"' + st + ' onclick="chonGiuongDoiCho(this,\'' + ma + '\',\'' + tang + '\')">' +
           '<span>' + ma + (hauTo || '') + '</span></div>';
}

function chonGiuongDoiCho(phanTu, maGiuong, tang) {
    if (phanTu.classList.contains('booked')) {
        alert('Giường ' + maGiuong + ' đã được đặt! Vui lòng chọn giường khác.');
        return;
    }
    if (!veDangDoiCho || veDangDoiCho.loai !== 'bus') return;

    var ds = document.querySelectorAll('#doi-cho-seat-map .bus-bed.selected');
    for (var i = 0; i < ds.length; i++) ds[i].classList.remove('selected');
    phanTu.classList.add('selected');

    var tenTang = tang === 'lower' ? 'Tầng Dưới' : 'Tầng Trên';
    var gia = veDangDoiCho.giaGoc + (tang === 'lower' ? CHENH_GIUONG_TANG_DUOI_XE : 0);

    choMoiDoiCho = { ma: maGiuong, moTa: tenTang, gia: gia };
    _hienChoMoi(maGiuong, tenTang, gia, 'Đổi sang giường ' + maGiuong);
}

// ===============================================================
// ĐỔI CHỖ — TÀU HỎA (loai === 'train')
// Giữ nguyên kiểu chỗ của vé (Ghế Mềm ↔ ghế, Giường Cabin ↔ giường).
// Giá gốc tra trong mockTrains theo mã tàu (code).
// ===============================================================

// Phân tích chiTiet vé tàu:
//  Ghế:    "12A · Ghế Mềm (Một Chiều) · Tàu SE1 · 02/12/2025"
//  Giường: "3-A1L · Giường Nằm Cabin (Một Chiều) · Tàu SE1 · 02/12/2025"
function phanTichVeTau(ve) {
    var kq = { ma: '', moTaCho: '', loaiCho: 'ghe', code: '', ngay: '' };
    if (!ve || !ve.chiTiet) return kq;
    var phan = ve.chiTiet.split(' · ');
    if (phan[0]) kq.ma = phan[0].trim();
    if (phan[1]) {
        kq.moTaCho = phan[1].trim();
        if (kq.moTaCho.indexOf('Giường') > -1) kq.loaiCho = 'giuong';
    }
    for (var i = 0; i < phan.length; i++) {
        var p = phan[i].trim();
        if (p.indexOf('Tàu ') === 0) kq.code = p.replace('Tàu ', '').trim();
        else if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(p)) kq.ngay = p;
    }
    return kq;
}

function moDoiChoTau(ve) {
    var info = phanTichVeTau(ve);

    var train = null;
    if (typeof mockTrains !== 'undefined') {
        for (var i = 0; i < mockTrains.length; i++) {
            if (mockTrains[i].code === info.code) { train = mockTrains[i]; break; }
        }
    }
    if (!train) { alert('Không tìm thấy thông tin chuyến tàu để đổi chỗ.'); return; }

    veDangDoiCho = {
        id: ve.id, loai: 'train', code: info.code, ngay: info.ngay,
        loaiCho: info.loaiCho, moTaCho: info.moTaCho, giaGoc: train.price
    };
    choMoiDoiCho = null;

    var info2 = train.name + ' · ' + train.code + ' · ' + train.from + ' → ' + train.to +
                (info.ngay ? ' · ' + info.ngay : '');

    var legend;
    if (info.loaiCho === 'giuong') {
        legend = _legendDot('#eafaf1', '#82e0aa', 'Giường Dưới/Giữa') +
                 _legendDot('#fef9e7', '#f9e79f', 'Giường Trên (-50K)') +
                 LEGEND_DANG_CHON() +
                 _legendDot('#fce4e4', '#f1948a', 'Đã Đặt');
    } else {
        legend = _legendDot('#d5f5e3', '#82e0aa', 'Cạnh cửa sổ') +
                 _legendDot('#fef9e7', '#f9e79f', 'Phía trong') +
                 LEGEND_DANG_CHON() +
                 _legendDot('linear-gradient(45deg,#eee,#ddd)', '#bbb', 'Đã Đặt');
    }
    _thietLapModalDoiCho('train', info2, legend);

    var elSeatInfo = document.getElementById('doi-cho-seat-info');
    if (elSeatInfo) {
        elSeatInfo.innerHTML = 'Chỗ hiện tại: <span class="text-white fw-700">' + info.ma +
            '</span> <span class="badge bg-success ms-1">' + (info.loaiCho === 'giuong' ? 'Giường Nằm' : 'Ghế Mềm') + '</span>';
    }

    if (info.loaiCho === 'giuong') veCabinGiuongTrongGio(ve, info.ma);
    else                          veGheMemTrongGio(ve, info.ma);

    var modal = new bootstrap.Modal(document.getElementById('modal-doi-cho'));
    modal.show();
}

// Tập hợp các chỗ đang bị vé KHÁC trong giỏ giữ trên cùng tàu + cùng kiểu chỗ
function _choTauDaGiuTrongGio(ve, loaiCho) {
    var ds = [];
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    for (var g = 0; g < gioHang.length; g++) {
        var v = gioHang[g];
        if (v.loai !== 'train' || v.id === ve.id) continue;
        var tt = phanTichVeTau(v);
        if (tt.code === veDangDoiCho.code && tt.loaiCho === loaiCho && tt.ma) ds.push(tt.ma);
    }
    return ds;
}

// Vẽ toa ghế mềm (2-2, 20 hàng) — tái dùng CSS .train-seat ...
function veGheMemTrongGio(ve, maHienTai) {
    var container = document.getElementById('doi-cho-seat-map');
    if (!container) return;

    var daDat = ['3A','3B','7C','7D','11A','14C','16D'].concat(_choTauDaGiuTrongGio(ve, 'ghe'));
    var idxHt = daDat.indexOf(maHienTai);
    if (idxHt > -1) daDat.splice(idxHt, 1);

    var html = '<div class="train-coach-container">';
    html += '<div class="text-center fw-700 mb-3" style="color:#2c3e50;font-size:0.8rem;letter-spacing:1px;">🚃 TOA GHẾ MỀM – NGỒI</div>';
    html += '<div class="d-flex justify-content-between mb-2 px-1">';
    html += '<div class="train-seat-grp"><span class="train-aisle-label">A</span><span class="train-aisle-label">B</span></div>';
    html += '<div class="train-aisle-label" style="width:36px;"></div>';
    html += '<div class="train-seat-grp"><span class="train-aisle-label">C</span><span class="train-aisle-label">D</span></div>';
    html += '</div>';

    for (var hang = 1; hang <= 20; hang++) {
        html += '<div class="train-row"><div class="train-seat-grp">';
        ['A','B'].forEach(function(ky, ci) {
            html += _veGheTau(hang + ky, (ci === 0 ? 'window' : 'middle'), daDat, maHienTai);
        });
        html += '</div><div class="train-divider">Lối đi</div><div class="train-seat-grp">';
        ['C','D'].forEach(function(ky, ci) {
            html += _veGheTau(hang + ky, (ci === 1 ? 'window' : 'middle'), daDat, maHienTai);
        });
        html += '</div></div>';
        if (hang % 5 === 0 && hang < 20) html += '<div class="train-divider">— Khoang ' + Math.floor(hang/5) + ' —</div>';
    }
    html += '</div>';
    container.innerHTML = html;
}

function _veGheTau(ma, viTri, daDat, maHienTai) {
    var laDaDat = daDat.indexOf(ma) > -1;
    var laHienTai = (ma === maHienTai);
    var cls = 'train-seat ' + viTri + (laDaDat ? ' booked' : '') + (laHienTai ? ' selected' : '');
    return '<div class="' + cls + '" onclick="chonGheTauDoiCho(this,\'' + ma + '\')">' + ma + '</div>';
}

function chonGheTauDoiCho(phanTu, ma) {
    if (phanTu.classList.contains('booked')) { alert('Chỗ ' + ma + ' đã được đặt!'); return; }
    if (!veDangDoiCho || veDangDoiCho.loai !== 'train') return;

    var ds = document.querySelectorAll('#doi-cho-seat-map .train-seat.selected');
    for (var i = 0; i < ds.length; i++) ds[i].classList.remove('selected');
    phanTu.classList.add('selected');

    var gia = veDangDoiCho.giaGoc; // ghế mềm: giá phẳng
    choMoiDoiCho = { ma: ma, moTa: 'Ghế Mềm', gia: gia };
    _hienChoMoi(ma, 'Ghế Mềm', gia, 'Đổi sang chỗ ' + ma);
}

// Vẽ toa giường cabin (5 cabin × 6 giường) — tái dùng CSS .train-bed .cabin-box ...
function veCabinGiuongTrongGio(ve, maHienTai) {
    var container = document.getElementById('doi-cho-seat-map');
    if (!container) return;

    var daDat = ['1-A1L','2-B2U','3-A3U','4-B1L'].concat(_choTauDaGiuTrongGio(ve, 'giuong'));
    var idxHt = daDat.indexOf(maHienTai);
    if (idxHt > -1) daDat.splice(idxHt, 1);

    var html = '<div class="cabin-container">';
    html += '<div class="text-center fw-700 mb-2" style="color:#2c3e50;font-size:0.8rem;letter-spacing:1px;">🛏 TOA GIƯỜNG NẰM CABIN 6 CHỖ</div>';

    for (var cabin = 1; cabin <= 5; cabin++) {
        html += '<div class="cabin-box">';
        html += '<div class="cabin-header">Cabin ' + cabin + ' <span style="opacity:0.8;font-size:0.72rem;font-weight:400;">(6 giường)</span></div>';
        html += '<div class="cabin-beds">';
        html += _veCotGiuong(cabin, 'A', daDat, maHienTai);
        html += '<div style="width:30px;"></div>';
        html += _veCotGiuong(cabin, 'B', daDat, maHienTai);
        html += '</div></div>';
    }
    html += '</div>';
    container.innerHTML = html;
}

function _veCotGiuong(cabin, cot, daDat, maHienTai) {
    // Tier: Dưới=1L, Giữa=2U, Trên=3U (khớp train.js)
    var tiers = [{ ten: 'Dưới', ma: '1L', cls: 'lower' },
                 { ten: 'Giữa', ma: '2U', cls: 'upper' },
                 { ten: 'Trên', ma: '3U', cls: 'upper' }];
    var html = '<div class="cabin-col">';
    for (var i = 0; i < tiers.length; i++) {
        var maG = cabin + '-' + cot + tiers[i].ma;
        var laDaDat = daDat.indexOf(maG) > -1;
        var laHienTai = (maG === maHienTai);
        var cls = 'train-bed ' + tiers[i].cls + (laDaDat ? ' booked' : '') + (laHienTai ? ' selected' : '');
        html += '<div class="' + cls + '" onclick="chonGiuongTauDoiCho(this,\'' + maG + '\',\'' + tiers[i].ten + '\')">' +
                '<span>' + cot + cabin + ' - ' + tiers[i].ten + '</span></div>';
    }
    html += '</div>';
    return html;
}

function chonGiuongTauDoiCho(phanTu, ma, tang) {
    if (phanTu.classList.contains('booked')) { alert('Giường này đã được đặt!'); return; }
    if (!veDangDoiCho || veDangDoiCho.loai !== 'train') return;

    var ds = document.querySelectorAll('#doi-cho-seat-map .train-bed.selected');
    for (var i = 0; i < ds.length; i++) ds[i].classList.remove('selected');
    phanTu.classList.add('selected');

    // Giá giường: gốc + 150k; tầng Trên -50k (khớp train.js)
    var gia = veDangDoiCho.giaGoc + 150000;
    if (tang === 'Trên') gia -= 50000;

    choMoiDoiCho = { ma: ma, moTa: 'Giường ' + tang, gia: gia };
    _hienChoMoi(ma, 'Giường ' + tang, gia, 'Đổi sang giường ' + ma);
}

// ---------------------------------------------------------------
// HÀM: Dựng lại chuỗi chiTiet mới theo loại vé
// ---------------------------------------------------------------
function _dungChiTietMoi() {
    var v = veDangDoiCho, c = choMoiDoiCho;
    var duoiNgay = v.ngay ? ' · ' + v.ngay : '';
    if (v.loai === 'flight') return 'Ghế ' + c.ma + ' · ' + c.moTa + ' · Chuyến ' + v.code + duoiNgay;
    if (v.loai === 'bus')    return c.ma + ' · ' + c.moTa + ' · ' + v.company + duoiNgay;
    if (v.loai === 'train')  return c.ma + ' · ' + v.moTaCho + ' · Tàu ' + v.code + duoiNgay;
    return c.ma;
}

// ---------------------------------------------------------------
// HÀM: Xác nhận đổi chỗ – cập nhật tại chỗ item trong giỏ
// ---------------------------------------------------------------
function xacNhanDoiCho() {
    if (!veDangDoiCho || !choMoiDoiCho) return;

    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    var daCapNhat = false;

    for (var i = 0; i < gioHang.length; i++) {
        if (gioHang[i].id === veDangDoiCho.id) {
            gioHang[i].chiTiet = _dungChiTietMoi();
            gioHang[i].gia = choMoiDoiCho.gia;
            daCapNhat = true;
            break;
        }
    }

    if (daCapNhat) {
        sessionStorage.setItem('vth_gio_hang', JSON.stringify(gioHang));
        capNhatSoLuongGioHang();
        hienThiGioHang();
        hienToastGioHang('Đã đổi sang <strong>' + choMoiDoiCho.ma + '</strong> (' + choMoiDoiCho.moTa + ')!');
    }

    var modal = bootstrap.Modal.getInstance(document.getElementById('modal-doi-cho'));
    if (modal) modal.hide();

    veDangDoiCho = null;
    choMoiDoiCho = null;
}

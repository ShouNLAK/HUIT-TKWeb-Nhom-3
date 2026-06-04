// =============================================================
// VIET TRAVEL HUB - js/app.js (Logic chung toàn website)
// Áp dụng: DOM Manipulation, localStorage, sessionStorage
// =============================================================

// Chạy ngay khi trang tải xong
document.addEventListener("DOMContentLoaded", function() {

    // 1. Hiệu ứng loader curtain (biến mất sau khi load)
    var loader = document.getElementById('manHinhCho');
    if (loader) {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 700);
    }

    // 2. Navbar scroll effect (thêm class 'scrolled' khi cuộn)
    var navbar = document.getElementById('thanhDieuHuong');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        // Kích hoạt ngay khi tải trang (nếu đang ở giữa trang)
        if (window.scrollY > 50) navbar.classList.add('scrolled');
    }

    // 3. Cập nhật số lượng giỏ hàng lên badge navbar
    capNhatSoLuongGioHang();

    // 4. Render khu vực auth trên navbar (nút Login / tên user)
    if (typeof capNhatNavbarAuth === 'function') {
        capNhatNavbarAuth();
    }

    // 5. Active nav-link theo tên trang đang mở
    capNhatNavActive();

    // 6. Scroll-to-top button
    khoiDongScrollTop();

    // 7. Nếu trang flight/train/bus → đọc tham số tìm kiếm từ sessionStorage
    var tenTrang = window.location.pathname.split('/').pop();
    var searchParams = JSON.parse(sessionStorage.getItem('vth_search_params')) || null;

    if (searchParams) {
        if (tenTrang === 'flight.html' && searchParams.loai === 'flight') {
            apDungSearchParamsBay(searchParams);
        } else if (tenTrang === 'train.html' && searchParams.loai === 'train') {
            apDungSearchParamsTau(searchParams);
        } else if (tenTrang === 'bus.html' && searchParams.loai === 'bus') {
            apDungSearchParamsXe(searchParams);
        }
        // Xóa params sau khi dùng để không ảnh hưởng lần sau
        sessionStorage.removeItem('vth_search_params');
    }
});

// ---------------------------------------------------------------
// HÀM: Áp dụng tham số tìm kiếm từ trang chủ vào form flight.html
// ---------------------------------------------------------------
function apDungSearchParamsBay(params) {
    setTimeout(function() {
        var elTu = document.getElementById('chuyenBayTu');
        var elDen = document.getElementById('chuyenBayDen');
        var elNgay = document.getElementById('chuyenBayNgay');

        if (elTu && params.tuSearch)   elTu.value   = params.tuSearch;
        if (elDen && params.denSearch) elDen.value  = params.denSearch;
        if (elNgay && params.ngaySearch) elNgay.value = params.ngaySearch;

        // Tự động kích hoạt tìm kiếm nếu đủ tham số
        if (typeof timChuyenBay === 'function') {
            timChuyenBay(null);
        }
    }, 300);
}

// ---------------------------------------------------------------
// HÀM: Áp dụng tham số tìm kiếm từ trang chủ vào form train.html
// ---------------------------------------------------------------
function apDungSearchParamsTau(params) {
    setTimeout(function() {
        var elTu = document.getElementById('tauHoaTu');
        var elDen = document.getElementById('tauHoaDen');
        var elNgay = document.getElementById('tauHoaNgayDi');

        if (elTu && params.tuSearch)   elTu.value   = params.tuSearch;
        if (elDen && params.denSearch) elDen.value  = params.denSearch;
        if (elNgay && params.ngaySearch) elNgay.value = params.ngaySearch;

        if (typeof timTau === 'function') {
            timTau(null);
        }
    }, 300);
}

// ---------------------------------------------------------------
// HÀM: Áp dụng tham số tìm kiếm từ trang chủ vào form bus.html
// ---------------------------------------------------------------
function apDungSearchParamsXe(params) {
    setTimeout(function() {
        var elTu = document.getElementById('xeKhachTu');
        var elDen = document.getElementById('xeKhachDen');
        var elNgay = document.getElementById('xeKhachNgay');

        if (elTu && params.tuSearch)   elTu.value   = params.tuSearch;
        if (elDen && params.denSearch) elDen.value  = params.denSearch;
        if (elNgay && params.ngaySearch) elNgay.value = params.ngaySearch;

        if (typeof timXe === 'function') {
            timXe(null);
        }
    }, 300);
}

// ---------------------------------------------------------------
// HÀM: Chuyển trang (có loader animation)
// ---------------------------------------------------------------
function chuyenTrang(event, url) {
    if (event) event.preventDefault();

    var loader = document.getElementById('manHinhCho');
    if (loader) {
        loader.classList.remove('hidden');
        setTimeout(function() {
            window.location.href = url;
        }, 450);
    } else {
        window.location.href = url;
    }
}

// ---------------------------------------------------------------
// HÀM: Cập nhật số vé trong giỏ hàng trên navbar
// ---------------------------------------------------------------
function capNhatSoLuongGioHang() {
    var gioHang = JSON.parse(sessionStorage.getItem('vth_gio_hang')) || [];
    // Cộng dồn số lượng từng vé (mỗi vé có thể đặt nhiều chỗ)
    var soLuong = 0;
    for (var k = 0; k < gioHang.length; k++) {
        soLuong += gioHang[k].soLuong || 1;
    }

    var tatCaBadge = document.querySelectorAll('#soLuongGioHang');
    for (var i = 0; i < tatCaBadge.length; i++) {
        tatCaBadge[i].innerText = soLuong > 0 ? soLuong : '';
        tatCaBadge[i].style.display = soLuong > 0 ? 'inline-flex' : 'none';
    }
}

// ---------------------------------------------------------------
// HÀM: Active nav-link theo URL hiện tại
// ---------------------------------------------------------------
function capNhatNavActive() {
    var trang = window.location.pathname.split('/').pop() || 'index.html';
    var tatCaLink = document.querySelectorAll('.nav-link');
    for (var i = 0; i < tatCaLink.length; i++) {
        var href = tatCaLink[i].getAttribute('href');
        if (href === trang || (trang === '' && href === 'index.html')) {
            tatCaLink[i].classList.add('active');
        } else {
            tatCaLink[i].classList.remove('active');
        }
    }
}

// ---------------------------------------------------------------
// HÀM: Scroll-to-top button
// ---------------------------------------------------------------
function khoiDongScrollTop() {
    // Tạo nút nếu chưa có trong HTML
    var btn = document.getElementById('nutLenDauTrang');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'nutLenDauTrang';
        btn.innerHTML = '<i class="bi bi-arrow-up-short"></i>';
        btn.title = 'Lên đầu trang';
        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ---------------------------------------------------------------
// HÀM: Định dạng ngày dd/mm/yyyy
// ---------------------------------------------------------------
function dinhDangNgay(chuoiNgay) {
    if (!chuoiNgay) return '---';
    var parts = chuoiNgay.split('-');
    if (parts.length < 3) return chuoiNgay;
    return parts[2] + '/' + parts[1] + '/' + parts[0];
}

// Alias tương thích
function formatDate(s) { return dinhDangNgay(s); }
function dinhDangTien(so) { return (so || 0).toLocaleString('vi-VN') + ' ₫'; }
function navigateTo(event, url) { chuyenTrang(event, url); }

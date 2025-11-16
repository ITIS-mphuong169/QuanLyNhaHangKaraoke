-- Database Schema cho Hệ thống Quản lý Nhà hàng Karaoke (MySQL)
-- Tạo database (nếu chưa có)
CREATE DATABASE IF NOT EXISTS NhaHangKaraoke CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Sử dụng database
USE NhaHangKaraoke;

-- Bảng Phong (Room)
CREATE TABLE IF NOT EXISTS Phong (
    maPhong INT AUTO_INCREMENT PRIMARY KEY,
    tenPhong VARCHAR(100) NOT NULL,
    loaiPhong VARCHAR(50) NOT NULL COMMENT 'VIP, Thường, Đặc biệt',
    sucChua INT NOT NULL DEFAULT 0,
    giaGio DECIMAL(15, 2) NOT NULL DEFAULT 0,
    trangThai VARCHAR(20) NOT NULL DEFAULT 'TRONG' COMMENT 'TRONG, DANG_SU_DUNG, BAO_TRI',
    moTa TEXT,
    thietBi JSON,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng KhachHang (Customer)
CREATE TABLE IF NOT EXISTS KhachHang (
    maKhachHang INT AUTO_INCREMENT PRIMARY KEY,
    hoTen VARCHAR(100) NOT NULL,
    soDienThoai VARCHAR(20) UNIQUE,
    email VARCHAR(100),
    diaChi TEXT,
    ngaySinh DATE,
    gioiTinh VARCHAR(10) COMMENT 'Nam, Nữ, Khác',
    loaiKhachHang VARCHAR(20) DEFAULT 'THUONG' COMMENT 'THUONG, VIP, THAN_THIET',
    diemTichLuy INT DEFAULT 0,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng NhanVien (Staff)
CREATE TABLE IF NOT EXISTS NhanVien (
    maNhanVien INT AUTO_INCREMENT PRIMARY KEY,
    hoTen VARCHAR(100) NOT NULL,
    soDienThoai VARCHAR(20),
    email VARCHAR(100),
    diaChi TEXT,
    ngaySinh DATE,
    gioiTinh VARCHAR(10),
    chucVu VARCHAR(50) COMMENT 'Quản lý, Nhân viên, Bảo vệ',
    luong DECIMAL(15, 2) DEFAULT 0,
    ngayVaoLam DATE,
    trangThai VARCHAR(20) DEFAULT 'DANG_LAM_VIEC' COMMENT 'DANG_LAM_VIEC, NGHI_VIEC',
    taiKhoan VARCHAR(50) UNIQUE,
    matKhau VARCHAR(255),
    quyenHan VARCHAR(20) DEFAULT 'NHAN_VIEN' COMMENT 'ADMIN, QUAN_LY, NHAN_VIEN',
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng NhaCungCap (Supplier)
CREATE TABLE IF NOT EXISTS NhaCungCap (
    maNhaCungCap INT AUTO_INCREMENT PRIMARY KEY,
    tenNhaCungCap VARCHAR(100) NOT NULL,
    nguoiLienHe VARCHAR(100),
    diaChi TEXT,
    soDienThoai VARCHAR(20),
    email VARCHAR(100),
    ghiChu TEXT,
    trangThai VARCHAR(20) DEFAULT 'DANG_HOP_TAC' COMMENT 'DANG_HOP_TAC, NGUNG_HOP_TAC',
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng MatHang (Item)
CREATE TABLE IF NOT EXISTS MatHang (
    maMatHang INT AUTO_INCREMENT PRIMARY KEY,
    tenMatHang VARCHAR(100) NOT NULL,
    danhMuc VARCHAR(50) COMMENT 'Đồ uống, Đồ ăn, Đồ nhậu, Trái cây, Khác',
    donViTinh VARCHAR(20) NOT NULL,
    giaBan DECIMAL(15, 2) NOT NULL DEFAULT 0,
    giaNhap DECIMAL(15, 2) DEFAULT 0,
    tonKho INT DEFAULT 0,
    moTa TEXT,
    hinhAnh VARCHAR(255),
    maNhaCungCap INT,
    trangThai VARCHAR(20) DEFAULT 'CON_HANG' COMMENT 'CON_HANG, HET_HANG, NGUNG_BAN',
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (maNhaCungCap) REFERENCES NhaCungCap(maNhaCungCap) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng DatPhong (Booking)
CREATE TABLE IF NOT EXISTS DatPhong (
    maDatPhong INT AUTO_INCREMENT PRIMARY KEY,
    maPhong INT NOT NULL,
    maKhachHang INT,
    maNhanVien INT,
    ngayDat TIMESTAMP NOT NULL,
    gioBatDau TIMESTAMP,
    gioKetThuc TIMESTAMP,
    soGio DECIMAL(5, 2) DEFAULT 0,
    tongTien DECIMAL(15, 2) DEFAULT 0,
    tienPhong DECIMAL(15, 2) DEFAULT 0,
    tienMatHang DECIMAL(15, 2) DEFAULT 0,
    giamGia DECIMAL(15, 2) DEFAULT 0,
    phuongThucThanhToan VARCHAR(20) COMMENT 'TIEN_MAT, CHUYEN_KHOAN, THE',
    trangThai VARCHAR(20) DEFAULT 'DA_DAT' COMMENT 'DA_DAT, DANG_SU_DUNG, HOAN_THANH, HUY',
    ghiChu TEXT,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (maPhong) REFERENCES Phong(maPhong) ON DELETE RESTRICT,
    FOREIGN KEY (maKhachHang) REFERENCES KhachHang(maKhachHang) ON DELETE SET NULL,
    FOREIGN KEY (maNhanVien) REFERENCES NhanVien(maNhanVien) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng HoaDon (Bill/Invoice)
CREATE TABLE IF NOT EXISTS HoaDon (
    maHoaDon INT AUTO_INCREMENT PRIMARY KEY,
    maDatPhong INT,
    maKhachHang INT,
    maNhanVien INT,
    ngayLap TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tongTien DECIMAL(15, 2) DEFAULT 0,
    tienPhong DECIMAL(15, 2) DEFAULT 0,
    tienMatHang DECIMAL(15, 2) DEFAULT 0,
    giamGia DECIMAL(15, 2) DEFAULT 0,
    thueVAT DECIMAL(15, 2) DEFAULT 0,
    thanhTien DECIMAL(15, 2) DEFAULT 0,
    phuongThucThanhToan VARCHAR(20),
    trangThai VARCHAR(20) DEFAULT 'CHUA_THANH_TOAN' COMMENT 'CHUA_THANH_TOAN, DA_THANH_TOAN, HUY',
    ghiChu TEXT,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (maDatPhong) REFERENCES DatPhong(maDatPhong) ON DELETE SET NULL,
    FOREIGN KEY (maKhachHang) REFERENCES KhachHang(maKhachHang) ON DELETE SET NULL,
    FOREIGN KEY (maNhanVien) REFERENCES NhanVien(maNhanVien) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng ChiTietHoaDon (Bill Detail)
CREATE TABLE IF NOT EXISTS ChiTietHoaDon (
    maChiTiet INT AUTO_INCREMENT PRIMARY KEY,
    maHoaDon INT NOT NULL,
    maMatHang INT,
    tenMatHang VARCHAR(100) NOT NULL,
    soLuong INT NOT NULL DEFAULT 0,
    donGia DECIMAL(15, 2) NOT NULL DEFAULT 0,
    thanhTien DECIMAL(15, 2) NOT NULL DEFAULT 0,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (maHoaDon) REFERENCES HoaDon(maHoaDon) ON DELETE CASCADE,
    FOREIGN KEY (maMatHang) REFERENCES MatHang(maMatHang) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng NhapHang (Import)
CREATE TABLE IF NOT EXISTS NhapHang (
    maNhapHang INT AUTO_INCREMENT PRIMARY KEY,
    maNhaCungCap INT NOT NULL,
    maNhanVien INT,
    ngayNhap TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tongTien DECIMAL(15, 2) DEFAULT 0,
    ghiChu TEXT,
    trangThai VARCHAR(20) DEFAULT 'DA_NHAP' COMMENT 'DA_NHAP, DA_HUY',
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (maNhaCungCap) REFERENCES NhaCungCap(maNhaCungCap) ON DELETE RESTRICT,
    FOREIGN KEY (maNhanVien) REFERENCES NhanVien(maNhanVien) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng ChiTietNhapHang (Import Detail)
CREATE TABLE IF NOT EXISTS ChiTietNhapHang (
    maChiTiet INT AUTO_INCREMENT PRIMARY KEY,
    maNhapHang INT NOT NULL,
    maMatHang INT,
    tenMatHang VARCHAR(100) NOT NULL,
    soLuong INT NOT NULL DEFAULT 0,
    donGia DECIMAL(15, 2) NOT NULL DEFAULT 0,
    thanhTien DECIMAL(15, 2) NOT NULL DEFAULT 0,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (maNhapHang) REFERENCES NhapHang(maNhapHang) ON DELETE CASCADE,
    FOREIGN KEY (maMatHang) REFERENCES MatHang(maMatHang) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Nguoi (Person) - Lớp cha của NhanVien và KhachHang
CREATE TABLE IF NOT EXISTS Nguoi (
    maNguoi INT AUTO_INCREMENT PRIMARY KEY,
    hoTen VARCHAR(100) NOT NULL,
    diaChi TEXT,
    soDienThoai VARCHAR(20),
    email VARCHAR(100),
    ngaySinh DATE,
    gioiTinh VARCHAR(10),
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Nhahang (Restaurant)
CREATE TABLE IF NOT EXISTS Nhahang (
    maNhaHang INT AUTO_INCREMENT PRIMARY KEY,
    tenNhaHang VARCHAR(100) NOT NULL,
    diaChi TEXT,
    soDienThoai VARCHAR(20),
    email VARCHAR(100),
    moTa TEXT,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Phongdat (Booked Room)
CREATE TABLE IF NOT EXISTS Phongdat (
    maPhongDat INT AUTO_INCREMENT PRIMARY KEY,
    maPhieuDat INT NOT NULL,
    maPhong INT NOT NULL,
    gioBatDau TIMESTAMP,
    gioKetThuc TIMESTAMP,
    soGio DECIMAL(5, 2) DEFAULT 0,
    giaGio DECIMAL(15, 2) DEFAULT 0,
    thanhTien DECIMAL(15, 2) DEFAULT 0,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (maPhieuDat) REFERENCES DatPhong(maDatPhong) ON DELETE CASCADE,
    FOREIGN KEY (maPhong) REFERENCES Phong(maPhong) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng MatHangCungcap (Supplied Item)
CREATE TABLE IF NOT EXISTS MatHangCungcap (
    maMatHangCungCap INT AUTO_INCREMENT PRIMARY KEY,
    maNhaCungCap INT NOT NULL,
    maMatHang INT,
    tenMatHang VARCHAR(100) NOT NULL,
    giaNhap DECIMAL(15, 2) NOT NULL DEFAULT 0,
    donViTinh VARCHAR(20),
    moTa TEXT,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ngayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (maNhaCungCap) REFERENCES NhaCungCap(maNhaCungCap) ON DELETE RESTRICT,
    FOREIGN KEY (maMatHang) REFERENCES MatHang(maMatHang) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng MatHangSD (Used Item)
CREATE TABLE IF NOT EXISTS MatHangSD (
    maMatHangSD INT AUTO_INCREMENT PRIMARY KEY,
    maPhieuDat INT NOT NULL,
    maMatHang INT,
    tenMatHang VARCHAR(100) NOT NULL,
    soLuong INT NOT NULL DEFAULT 0,
    donGia DECIMAL(15, 2) NOT NULL DEFAULT 0,
    thanhTien DECIMAL(15, 2) NOT NULL DEFAULT 0,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (maPhieuDat) REFERENCES DatPhong(maDatPhong) ON DELETE CASCADE,
    FOREIGN KEY (maMatHang) REFERENCES MatHang(maMatHang) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng ThongkechitietMH (Item Statistics Detail)
CREATE TABLE IF NOT EXISTS ThongkechitietMH (
    maThongKe INT AUTO_INCREMENT PRIMARY KEY,
    maMatHang INT,
    tenMatHang VARCHAR(100),
    ngayThongKe DATE,
    soLuongBan INT DEFAULT 0,
    doanhThu DECIMAL(15, 2) DEFAULT 0,
    loiNhuan DECIMAL(15, 2) DEFAULT 0,
    ngayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (maMatHang) REFERENCES MatHang(maMatHang) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo indexes để tối ưu hiệu suất
CREATE INDEX idx_phong_trangthai ON Phong(trangThai);
CREATE INDEX idx_khachhang_sdt ON KhachHang(soDienThoai);
CREATE INDEX idx_datphong_phong ON DatPhong(maPhong);
CREATE INDEX idx_datphong_trangthai ON DatPhong(trangThai);
CREATE INDEX idx_datphong_ngaydat ON DatPhong(ngayDat);
CREATE INDEX idx_hoadon_ngaylap ON HoaDon(ngayLap);
CREATE INDEX idx_hoadon_trangthai ON HoaDon(trangThai);
CREATE INDEX idx_mathang_danhmuc ON MatHang(danhMuc);
CREATE INDEX idx_mathang_trangthai ON MatHang(trangThai);
CREATE INDEX idx_nguoi_sdt ON Nguoi(soDienThoai);
CREATE INDEX idx_phongdat_phieudat ON Phongdat(maPhieuDat);
CREATE INDEX idx_phongdat_phong ON Phongdat(maPhong);
CREATE INDEX idx_mathangcungcap_ncc ON MatHangCungcap(maNhaCungCap);
CREATE INDEX idx_mathangsd_phieudat ON MatHangSD(maPhieuDat);
CREATE INDEX idx_thongke_mathang ON ThongkechitietMH(maMatHang);
CREATE INDEX idx_thongke_ngay ON ThongkechitietMH(ngayThongKe);

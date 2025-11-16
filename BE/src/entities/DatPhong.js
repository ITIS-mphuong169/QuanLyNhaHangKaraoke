/**
 * Entity: DatPhong (Booking)
 * Mô tả: Thực thể đại diện cho đặt phòng
 */
class DatPhong {
  constructor(data = {}) {
    this.maDatPhong = data.maDatPhong || null;
    this.maPhong = data.maPhong || null;
    this.maKhachHang = data.maKhachHang || null;
    this.maNhanVien = data.maNhanVien || null;
    this.ngayDat = data.ngayDat || new Date();
    this.gioBatDau = data.gioBatDau || null;
    this.gioKetThuc = data.gioKetThuc || null;
    this.soGio = data.soGio || 0;
    this.tongTien = data.tongTien || 0;
    this.tienPhong = data.tienPhong || 0;
    this.tienMatHang = data.tienMatHang || 0;
    this.giamGia = data.giamGia || 0;
    this.phuongThucThanhToan = data.phuongThucThanhToan || ''; // TIEN_MAT, CHUYEN_KHOAN, THE
    this.trangThai = data.trangThai || 'DA_DAT'; // DA_DAT, DANG_SU_DUNG, HOAN_THANH, HUY
    this.ghiChu = data.ghiChu || '';
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maDatPhong: this.maDatPhong,
      maPhong: this.maPhong,
      maKhachHang: this.maKhachHang,
      maNhanVien: this.maNhanVien,
      ngayDat: this.ngayDat,
      gioBatDau: this.gioBatDau,
      gioKetThuc: this.gioKetThuc,
      soGio: this.soGio,
      tongTien: this.tongTien,
      tienPhong: this.tienPhong,
      tienMatHang: this.tienMatHang,
      giamGia: this.giamGia,
      phuongThucThanhToan: this.phuongThucThanhToan,
      trangThai: this.trangThai,
      ghiChu: this.ghiChu,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = DatPhong;


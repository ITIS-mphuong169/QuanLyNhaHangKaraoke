/**
 * Entity: HoaDon (Bill/Invoice)
 * Mô tả: Thực thể đại diện cho hóa đơn
 */
class HoaDon {
  constructor(data = {}) {
    this.maHoaDon = data.maHoaDon || null;
    this.maDatPhong = data.maDatPhong || null;
    this.maKhachHang = data.maKhachHang || null;
    this.maNhanVien = data.maNhanVien || null;
    this.ngayLap = data.ngayLap || new Date();
    this.tongTien = data.tongTien || 0;
    this.tienPhong = data.tienPhong || 0;
    this.tienMatHang = data.tienMatHang || 0;
    this.giamGia = data.giamGia || 0;
    this.thueVAT = data.thueVAT || 0;
    this.thanhTien = data.thanhTien || 0;
    this.phuongThucThanhToan = data.phuongThucThanhToan || '';
    this.trangThai = data.trangThai || 'CHUA_THANH_TOAN'; // CHUA_THANH_TOAN, DA_THANH_TOAN, HUY
    this.ghiChu = data.ghiChu || '';
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maHoaDon: this.maHoaDon,
      maDatPhong: this.maDatPhong,
      maKhachHang: this.maKhachHang,
      maNhanVien: this.maNhanVien,
      ngayLap: this.ngayLap,
      tongTien: this.tongTien,
      tienPhong: this.tienPhong,
      tienMatHang: this.tienMatHang,
      giamGia: this.giamGia,
      thueVAT: this.thueVAT,
      thanhTien: this.thanhTien,
      phuongThucThanhToan: this.phuongThucThanhToan,
      trangThai: this.trangThai,
      ghiChu: this.ghiChu,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = HoaDon;


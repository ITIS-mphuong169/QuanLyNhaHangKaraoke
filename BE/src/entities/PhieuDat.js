/**
 * Entity: PhieuDat (Booking Receipt)
 * Mô tả: Thực thể đại diện cho phiếu đặt phòng
 * Schema: maPhieuDat, maKhachHang, maNhanVien, ngayDat, tongTien, tienPhong, 
 *         tienMatHang, giamGia, phuongThucThanhToan, trangThai, ghiChu, ngayTao, ngayCapNhat
 */
class PhieuDat {
  constructor(data = {}) {
    this.maPhieuDat = data.maPhieuDat || null;
    this.maKhachHang = data.maKhachHang || null;
    this.maNhanVien = data.maNhanVien || null;
    this.ngayDat = data.ngayDat || new Date();
    this.tongTien = data.tongTien || 0;
    this.tienPhong = data.tienPhong || 0;
    this.tienMatHang = data.tienMatHang || 0;
    this.giamGia = data.giamGia || 0;
    this.phuongThucThanhToan = data.phuongThucThanhToan || null; // TIEN_MAT, CHUYEN_KHOAN, THE
    this.trangThai = data.trangThai || 'DA_DAT'; // DA_DAT, DANG_SU_DUNG, HOAN_THANH, HUY
    this.ghiChu = data.ghiChu || null;
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maPhieuDat: this.maPhieuDat,
      maKhachHang: this.maKhachHang,
      maNhanVien: this.maNhanVien,
      ngayDat: this.ngayDat,
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

module.exports = PhieuDat;


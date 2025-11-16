/**
 * Entity: ChiTietPhieuDat (Booking Receipt Detail)
 * Mô tả: Thực thể đại diện cho chi tiết mặt hàng trong phiếu đặt
 * Schema: maChiTiet, maPhieuDat, maMatHang, tenMatHang, soLuong, ngayTao
 */
class ChiTietPhieuDat {
  constructor(data = {}) {
    this.maChiTiet = data.maChiTiet || null;
    this.maPhieuDat = data.maPhieuDat || null;
    this.maMatHang = data.maMatHang || null;
    this.tenMatHang = data.tenMatHang || '';
    this.soLuong = data.soLuong || 0;
    this.ngayTao = data.ngayTao || new Date();
  }

  toJSON() {
    return {
      maChiTiet: this.maChiTiet,
      maPhieuDat: this.maPhieuDat,
      maMatHang: this.maMatHang,
      tenMatHang: this.tenMatHang,
      soLuong: this.soLuong,
      ngayTao: this.ngayTao
    };
  }
}

module.exports = ChiTietPhieuDat;


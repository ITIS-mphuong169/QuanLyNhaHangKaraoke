/**
 * Entity: MatHangSD (Used Item)
 * Mô tả: Thực thể đại diện cho mặt hàng đã sử dụng trong phiếu đặt
 */
class MatHangSD {
  constructor(data = {}) {
    this.maMatHangSD = data.maMatHangSD || null;
    this.maPhieuDat = data.maPhieuDat || null;
    this.maMatHang = data.maMatHang || null;
    this.tenMatHang = data.tenMatHang || '';
    this.soLuong = data.soLuong || 0;
    this.donGia = data.donGia || 0;
    this.thanhTien = data.thanhTien || 0;
    this.ngayTao = data.ngayTao || new Date();
  }

  toJSON() {
    return {
      maMatHangSD: this.maMatHangSD,
      maPhieuDat: this.maPhieuDat,
      maMatHang: this.maMatHang,
      tenMatHang: this.tenMatHang,
      soLuong: this.soLuong,
      donGia: this.donGia,
      thanhTien: this.thanhTien,
      ngayTao: this.ngayTao
    };
  }
}

module.exports = MatHangSD;


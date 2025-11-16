/**
 * Entity: ChiTietNhapHang (Import Detail)
 * Mô tả: Thực thể đại diện cho chi tiết nhập hàng
 */
class ChiTietNhapHang {
  constructor(data = {}) {
    this.maChiTiet = data.maChiTiet || null;
    this.maNhapHang = data.maNhapHang || null;
    this.maMatHang = data.maMatHang || null;
    this.tenMatHang = data.tenMatHang || '';
    this.soLuong = data.soLuong || 0;
    this.donGia = data.donGia || 0;
    this.thanhTien = data.thanhTien || 0;
    this.ngayTao = data.ngayTao || new Date();
  }

  toJSON() {
    return {
      maChiTiet: this.maChiTiet,
      maNhapHang: this.maNhapHang,
      maMatHang: this.maMatHang,
      tenMatHang: this.tenMatHang,
      soLuong: this.soLuong,
      donGia: this.donGia,
      thanhTien: this.thanhTien,
      ngayTao: this.ngayTao
    };
  }
}

module.exports = ChiTietNhapHang;


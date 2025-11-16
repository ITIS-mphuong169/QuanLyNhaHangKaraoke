/**
 * Entity: Nhahang (Restaurant)
 * Mô tả: Thực thể đại diện cho nhà hàng
 */
class Nhahang {
  constructor(data = {}) {
    this.maNhaHang = data.maNhaHang || null;
    this.tenNhaHang = data.tenNhaHang || '';
    this.diaChi = data.diaChi || '';
    this.soDienThoai = data.soDienThoai || '';
    this.email = data.email || '';
    this.moTa = data.moTa || '';
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maNhaHang: this.maNhaHang,
      tenNhaHang: this.tenNhaHang,
      diaChi: this.diaChi,
      soDienThoai: this.soDienThoai,
      email: this.email,
      moTa: this.moTa,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = Nhahang;


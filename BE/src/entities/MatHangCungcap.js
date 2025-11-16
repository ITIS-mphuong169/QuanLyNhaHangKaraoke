/**
 * Entity: MatHangCungcap (Supplied Item)
 * Mô tả: Thực thể đại diện cho mặt hàng được cung cấp bởi nhà cung cấp
 */
class MatHangCungcap {
  constructor(data = {}) {
    this.maMatHangCungCap = data.maMatHangCungCap || null;
    this.maNhaCungCap = data.maNhaCungCap || null;
    this.maMatHang = data.maMatHang || null;
    this.tenMatHang = data.tenMatHang || '';
    this.giaNhap = data.giaNhap || 0;
    this.donViTinh = data.donViTinh || '';
    this.moTa = data.moTa || '';
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maMatHangCungCap: this.maMatHangCungCap,
      maNhaCungCap: this.maNhaCungCap,
      maMatHang: this.maMatHang,
      tenMatHang: this.tenMatHang,
      giaNhap: this.giaNhap,
      donViTinh: this.donViTinh,
      moTa: this.moTa,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = MatHangCungcap;


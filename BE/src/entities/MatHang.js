/**
 * Entity: MatHang (Item)
 * Mô tả: Thực thể đại diện cho mặt hàng bán kèm
 * Schema: maMatHang, giaBan, tonKho, maNhaCungCap, ngayTao, ngayCapNhat
 */
class MatHang {
  constructor(data = {}) {
    this.maMatHang = data.maMatHang || null;
    this.giaBan = data.giaBan || 0;
    this.tonKho = data.tonKho || 0;
    this.maNhaCungCap = data.maNhaCungCap || null;
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maMatHang: this.maMatHang,
      giaBan: this.giaBan,
      tonKho: this.tonKho,
      maNhaCungCap: this.maNhaCungCap,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = MatHang;


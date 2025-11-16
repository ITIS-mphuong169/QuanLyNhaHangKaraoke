/**
 * Entity: MatHang (Item)
 * Mô tả: Thực thể đại diện cho mặt hàng bán kèm
 */
class MatHang {
  constructor(data = {}) {
    this.maMatHang = data.maMatHang || null;
    this.tenMatHang = data.tenMatHang || '';
    this.danhMuc = data.danhMuc || ''; // Đồ uống, Đồ ăn, Đồ nhậu, Trái cây, Khác
    this.donViTinh = data.donViTinh || '';
    this.giaBan = data.giaBan || 0;
    this.giaNhap = data.giaNhap || 0;
    this.tonKho = data.tonKho || 0;
    this.moTa = data.moTa || '';
    this.hinhAnh = data.hinhAnh || '';
    this.maNhaCungCap = data.maNhaCungCap || null;
    this.trangThai = data.trangThai || 'CON_HANG'; // CON_HANG, HET_HANG, NGUNG_BAN
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maMatHang: this.maMatHang,
      tenMatHang: this.tenMatHang,
      danhMuc: this.danhMuc,
      donViTinh: this.donViTinh,
      giaBan: this.giaBan,
      giaNhap: this.giaNhap,
      tonKho: this.tonKho,
      moTa: this.moTa,
      hinhAnh: this.hinhAnh,
      maNhaCungCap: this.maNhaCungCap,
      trangThai: this.trangThai,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = MatHang;


/**
 * Entity: NhaCungCap (Supplier)
 * Mô tả: Thực thể đại diện cho nhà cung cấp
 */
class NhaCungCap {
  constructor(data = {}) {
    this.maNhaCungCap = data.maNhaCungCap || null;
    this.tenNhaCungCap = data.tenNhaCungCap || '';
    this.nguoiLienHe = data.nguoiLienHe || '';
    this.diaChi = data.diaChi || '';
    this.soDienThoai = data.soDienThoai || '';
    this.email = data.email || '';
    this.ghiChu = data.ghiChu || '';
    this.trangThai = data.trangThai || 'DANG_HOP_TAC'; // DANG_HOP_TAC, NGUNG_HOP_TAC
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maNhaCungCap: this.maNhaCungCap,
      tenNhaCungCap: this.tenNhaCungCap,
      nguoiLienHe: this.nguoiLienHe,
      diaChi: this.diaChi,
      soDienThoai: this.soDienThoai,
      email: this.email,
      ghiChu: this.ghiChu,
      trangThai: this.trangThai,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = NhaCungCap;


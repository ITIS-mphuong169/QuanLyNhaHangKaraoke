/**
 * Entity: NhapHang (Import)
 * Mô tả: Thực thể đại diện cho nhập hàng từ nhà cung cấp
 */
class NhapHang {
  constructor(data = {}) {
    this.maNhapHang = data.maNhapHang || null;
    this.maNhaCungCap = data.maNhaCungCap || null;
    this.maNhanVien = data.maNhanVien || null;
    this.ngayNhap = data.ngayNhap || new Date();
    this.tongTien = data.tongTien || 0;
    this.ghiChu = data.ghiChu || '';
    this.trangThai = data.trangThai || 'DA_NHAP'; // DA_NHAP, DA_HUY
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maNhapHang: this.maNhapHang,
      maNhaCungCap: this.maNhaCungCap,
      maNhanVien: this.maNhanVien,
      ngayNhap: this.ngayNhap,
      tongTien: this.tongTien,
      ghiChu: this.ghiChu,
      trangThai: this.trangThai,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = NhapHang;


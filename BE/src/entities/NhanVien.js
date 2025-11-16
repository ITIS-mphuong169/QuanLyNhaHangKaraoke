/**
 * Entity: NhanVien (Staff)
 * Mô tả: Thực thể đại diện cho nhân viên
 */
class NhanVien {
  constructor(data = {}) {
    this.maNhanVien = data.maNhanVien || null;
    this.hoTen = data.hoTen || '';
    this.soDienThoai = data.soDienThoai || '';
    this.email = data.email || '';
    this.diaChi = data.diaChi || '';
    this.ngaySinh = data.ngaySinh || null;
    this.gioiTinh = data.gioiTinh || '';
    this.chucVu = data.chucVu || ''; // Quản lý, Nhân viên, Bảo vệ
    this.luong = data.luong || 0;
    this.ngayVaoLam = data.ngayVaoLam || new Date();
    this.trangThai = data.trangThai || 'DANG_LAM_VIEC'; // DANG_LAM_VIEC, NGHI_VIEC
    this.taiKhoan = data.taiKhoan || '';
    this.matKhau = data.matKhau || '';
    this.quyenHan = data.quyenHan || 'NHAN_VIEN'; // ADMIN, QUAN_LY, NHAN_VIEN
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maNhanVien: this.maNhanVien,
      hoTen: this.hoTen,
      soDienThoai: this.soDienThoai,
      email: this.email,
      diaChi: this.diaChi,
      ngaySinh: this.ngaySinh,
      gioiTinh: this.gioiTinh,
      chucVu: this.chucVu,
      luong: this.luong,
      ngayVaoLam: this.ngayVaoLam,
      trangThai: this.trangThai,
      taiKhoan: this.taiKhoan,
      quyenHan: this.quyenHan,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = NhanVien;


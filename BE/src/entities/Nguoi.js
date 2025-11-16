/**
 * Entity: Nguoi (Person)
 * Mô tả: Thực thể đại diện cho người (lớp cha của NhanVien và KhachHang)
 */
class Nguoi {
  constructor(data = {}) {
    this.maNguoi = data.maNguoi || null;
    this.hoTen = data.hoTen || '';
    this.diaChi = data.diaChi || '';
    this.soDienThoai = data.soDienThoai || '';
    this.email = data.email || '';
    this.ngaySinh = data.ngaySinh || null;
    this.gioiTinh = data.gioiTinh || '';
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maNguoi: this.maNguoi,
      hoTen: this.hoTen,
      diaChi: this.diaChi,
      soDienThoai: this.soDienThoai,
      email: this.email,
      ngaySinh: this.ngaySinh,
      gioiTinh: this.gioiTinh,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = Nguoi;


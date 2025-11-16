/**
 * Entity: KhachHang (Customer)
 * Mô tả: Thực thể đại diện cho khách hàng
 */
class KhachHang {
  constructor(data = {}) {
    this.maKhachHang = data.maKhachHang || null;
    this.hoTen = data.hoTen || '';
    this.soDienThoai = data.soDienThoai || '';
    this.email = data.email || '';
    this.diaChi = data.diaChi || '';
    this.ngaySinh = data.ngaySinh || null;
    this.gioiTinh = data.gioiTinh || ''; // Nam, Nữ, Khác
    this.loaiKhachHang = data.loaiKhachHang || 'THUONG'; // THUONG, VIP, THAN_THIET
    this.diemTichLuy = data.diemTichLuy || 0;
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maKhachHang: this.maKhachHang,
      hoTen: this.hoTen,
      soDienThoai: this.soDienThoai,
      email: this.email,
      diaChi: this.diaChi,
      ngaySinh: this.ngaySinh,
      gioiTinh: this.gioiTinh,
      loaiKhachHang: this.loaiKhachHang,
      diemTichLuy: this.diemTichLuy,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = KhachHang;


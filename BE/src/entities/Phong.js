/**
 * Entity: Phong (Room)
 * Mô tả: Thực thể đại diện cho phòng karaoke
 * Schema: maPhong, tenPhong, loaiPhong, sucChua, giaGio, trangThai, moTa, ngayTao, ngayCapNhat
 */
class Phong {
  constructor(data = {}) {
    this.maPhong = data.maPhong || null;
    this.tenPhong = data.tenPhong || '';
    this.loaiPhong = data.loaiPhong || ''; // VIP, Thường, Đặc biệt
    this.sucChua = data.sucChua || 0; // Số người tối đa
    this.giaGio = data.giaGio || 0; // Giá theo giờ
    this.trangThai = data.trangThai || 'TRONG'; // TRONG, DANG_SU_DUNG, BAO_TRI
    this.moTa = data.moTa || '';
    this.ngayTao = data.ngayTao || new Date();
    this.ngayCapNhat = data.ngayCapNhat || new Date();
  }

  toJSON() {
    return {
      maPhong: this.maPhong,
      tenPhong: this.tenPhong,
      loaiPhong: this.loaiPhong,
      sucChua: this.sucChua,
      giaGio: this.giaGio,
      trangThai: this.trangThai,
      moTa: this.moTa,
      ngayTao: this.ngayTao,
      ngayCapNhat: this.ngayCapNhat
    };
  }
}

module.exports = Phong;


/**
 * DAO: NhanVienDAO
 * Mô tả: Lớp Data Access Object cho thực thể NhanVien
 */
const NhanVien = require('../entities/NhanVien');

class NhanVienDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM NhanVien ORDER BY maNhanVien';
    const result = await this.db.query(query);
    return result.rows.map(row => new NhanVien(row));
  }

  async getById(maNhanVien) {
    const query = 'SELECT * FROM NhanVien WHERE maNhanVien = $1';
    const result = await this.db.query(query, [maNhanVien]);
    if (result.rows.length === 0) return null;
    return new NhanVien(result.rows[0]);
  }

  async getByTaiKhoan(taiKhoan) {
    const query = 'SELECT * FROM NhanVien WHERE taiKhoan = $1';
    const result = await this.db.query(query, [taiKhoan]);
    if (result.rows.length === 0) return null;
    return new NhanVien(result.rows[0]);
  }

  async create(nhanVien) {
    const query = `
      INSERT INTO NhanVien (hoTen, soDienThoai, email, diaChi, ngaySinh, gioiTinh, 
                           chucVu, luong, ngayVaoLam, trangThai, taiKhoan, matKhau, 
                           quyenHan, ngayTao, ngayCapNhat)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `;
    const values = [
      nhanVien.hoTen,
      nhanVien.soDienThoai,
      nhanVien.email,
      nhanVien.diaChi,
      nhanVien.ngaySinh,
      nhanVien.gioiTinh,
      nhanVien.chucVu,
      nhanVien.luong,
      nhanVien.ngayVaoLam,
      nhanVien.trangThai,
      nhanVien.taiKhoan,
      nhanVien.matKhau,
      nhanVien.quyenHan,
      new Date(),
      new Date()
    ];
    const result = await this.db.query(query, values);
    return new NhanVien(result.rows[0]);
  }

  async update(maNhanVien, nhanVien) {
    const query = `
      UPDATE NhanVien 
      SET hoTen = $1, soDienThoai = $2, email = $3, diaChi = $4,
          ngaySinh = $5, gioiTinh = $6, chucVu = $7, luong = $8,
          ngayVaoLam = $9, trangThai = $10, taiKhoan = $11,
          quyenHan = $12, ngayCapNhat = $13
      WHERE maNhanVien = $14
      RETURNING *
    `;
    const values = [
      nhanVien.hoTen,
      nhanVien.soDienThoai,
      nhanVien.email,
      nhanVien.diaChi,
      nhanVien.ngaySinh,
      nhanVien.gioiTinh,
      nhanVien.chucVu,
      nhanVien.luong,
      nhanVien.ngayVaoLam,
      nhanVien.trangThai,
      nhanVien.taiKhoan,
      nhanVien.quyenHan,
      new Date(),
      maNhanVien
    ];
    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return new NhanVien(result.rows[0]);
  }

  async delete(maNhanVien) {
    const query = 'DELETE FROM NhanVien WHERE maNhanVien = $1 RETURNING *';
    const result = await this.db.query(query, [maNhanVien]);
    if (result.rows.length === 0) return null;
    return new NhanVien(result.rows[0]);
  }
}

module.exports = NhanVienDAO;


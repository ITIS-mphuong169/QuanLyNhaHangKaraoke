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
    const query = 'SELECT * FROM NhanVien WHERE maNhanVien = ?';
    const result = await this.db.query(query, [maNhanVien]);
    if (result.rows.length === 0) return null;
    return new NhanVien(result.rows[0]);
  }

  async getByTaiKhoan(taiKhoan) {
    const query = 'SELECT * FROM NhanVien WHERE taiKhoan = ?';
    const result = await this.db.query(query, [taiKhoan]);
    if (result.rows.length === 0) return null;
    return new NhanVien(result.rows[0]);
  }

  async create(nhanVien) {
    const query = `
      INSERT INTO NhanVien (hoTen, soDienThoai, email, diaChi, ngaySinh, gioiTinh, 
                           chucVu, luong, ngayVaoLam, trangThai, taiKhoan, matKhau, 
                           quyenHan, ngayTao, ngayCapNhat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM NhanVien WHERE maNhanVien = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new NhanVien(result.rows[0]);
  }

  async update(maNhanVien, nhanVien) {
    const query = `
      UPDATE NhanVien 
      SET hoTen = ?, soDienThoai = ?, email = ?, diaChi = ?,
          ngaySinh = ?, gioiTinh = ?, chucVu = ?, luong = ?,
          ngayVaoLam = ?, trangThai = ?, taiKhoan = ?,
          quyenHan = ?, ngayCapNhat = ?
      WHERE maNhanVien = ?
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
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM NhanVien WHERE maNhanVien = ?';
    const result = await this.db.query(selectQuery, [maNhanVien]);
    if (result.rows.length === 0) return null;
    return new NhanVien(result.rows[0]);
  }

  async delete(maNhanVien) {
    const selectQuery = 'SELECT * FROM NhanVien WHERE maNhanVien = ?';
    const selectResult = await this.db.query(selectQuery, [maNhanVien]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM NhanVien WHERE maNhanVien = ?';
    await this.db.query(query, [maNhanVien]);
    return new NhanVien(selectResult.rows[0]);
  }
}

module.exports = NhanVienDAO;


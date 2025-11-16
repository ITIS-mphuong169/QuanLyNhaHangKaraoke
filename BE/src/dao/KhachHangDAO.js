/**
 * DAO: KhachHangDAO
 * Mô tả: Lớp Data Access Object cho thực thể KhachHang
 */
const KhachHang = require('../entities/KhachHang');

class KhachHangDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM KhachHang ORDER BY maKhachHang';
    const result = await this.db.query(query);
    return result.rows.map(row => new KhachHang(row));
  }

  async getById(maKhachHang) {
    const query = 'SELECT * FROM KhachHang WHERE maKhachHang = ?';
    const result = await this.db.query(query, [maKhachHang]);
    if (result.rows.length === 0) return null;
    return new KhachHang(result.rows[0]);
  }

  async getBySoDienThoai(soDienThoai) {
    const query = 'SELECT * FROM KhachHang WHERE soDienThoai = ?';
    const result = await this.db.query(query, [soDienThoai]);
    if (result.rows.length === 0) return null;
    return new KhachHang(result.rows[0]);
  }

  async search(keyword) {
    const query = `
      SELECT * FROM KhachHang 
      WHERE LOWER(hoTen) LIKE LOWER(?) OR LOWER(soDienThoai) LIKE LOWER(?) OR LOWER(email) LIKE LOWER(?)
      ORDER BY maKhachHang
    `;
    const searchTerm = `%${keyword}%`;
    const result = await this.db.query(query, [searchTerm, searchTerm, searchTerm]);
    return result.rows.map(row => new KhachHang(row));
  }

  async create(khachHang) {
    const query = `
      INSERT INTO KhachHang (hoTen, soDienThoai, email, diaChi, ngaySinh, gioiTinh, loaiKhachHang, diemTichLuy, ngayTao, ngayCapNhat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      khachHang.hoTen,
      khachHang.soDienThoai,
      khachHang.email,
      khachHang.diaChi,
      khachHang.ngaySinh,
      khachHang.gioiTinh,
      khachHang.loaiKhachHang,
      khachHang.diemTichLuy,
      new Date(),
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM KhachHang WHERE maKhachHang = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new KhachHang(result.rows[0]);
  }

  async update(maKhachHang, khachHang) {
    const query = `
      UPDATE KhachHang 
      SET hoTen = ?, soDienThoai = ?, email = ?, diaChi = ?, 
          ngaySinh = ?, gioiTinh = ?, loaiKhachHang = ?, 
          diemTichLuy = ?, ngayCapNhat = ?
      WHERE maKhachHang = ?
    `;
    const values = [
      khachHang.hoTen,
      khachHang.soDienThoai,
      khachHang.email,
      khachHang.diaChi,
      khachHang.ngaySinh,
      khachHang.gioiTinh,
      khachHang.loaiKhachHang,
      khachHang.diemTichLuy,
      new Date(),
      maKhachHang
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM KhachHang WHERE maKhachHang = ?';
    const result = await this.db.query(selectQuery, [maKhachHang]);
    if (result.rows.length === 0) return null;
    return new KhachHang(result.rows[0]);
  }

  async delete(maKhachHang) {
    const selectQuery = 'SELECT * FROM KhachHang WHERE maKhachHang = ?';
    const selectResult = await this.db.query(selectQuery, [maKhachHang]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM KhachHang WHERE maKhachHang = ?';
    await this.db.query(query, [maKhachHang]);
    return new KhachHang(selectResult.rows[0]);
  }

  async updateDiemTichLuy(maKhachHang, diem) {
    const query = `
      UPDATE KhachHang 
      SET diemTichLuy = diemTichLuy + ?, ngayCapNhat = ?
      WHERE maKhachHang = ?
    `;
    await this.db.query(query, [diem, new Date(), maKhachHang]);
    const selectQuery = 'SELECT * FROM KhachHang WHERE maKhachHang = ?';
    const result = await this.db.query(selectQuery, [maKhachHang]);
    if (result.rows.length === 0) return null;
    return new KhachHang(result.rows[0]);
  }
}

module.exports = KhachHangDAO;


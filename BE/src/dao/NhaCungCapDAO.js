/**
 * DAO: NhaCungCapDAO
 * Mô tả: Lớp Data Access Object cho thực thể NhaCungCap
 */
const NhaCungCap = require('../entities/NhaCungCap');

class NhaCungCapDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM NhaCungCap ORDER BY maNhaCungCap';
    const result = await this.db.query(query);
    return result.rows.map(row => new NhaCungCap(row));
  }

  async getById(maNhaCungCap) {
    const query = 'SELECT * FROM NhaCungCap WHERE maNhaCungCap = ?';
    const result = await this.db.query(query, [maNhaCungCap]);
    if (result.rows.length === 0) return null;
    return new NhaCungCap(result.rows[0]);
  }

  async create(nhaCungCap) {
    const query = `
      INSERT INTO NhaCungCap (tenNhaCungCap, nguoiLienHe, diaChi, soDienThoai, email, ghiChu, trangThai, ngayTao, ngayCapNhat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      nhaCungCap.tenNhaCungCap,
      nhaCungCap.nguoiLienHe,
      nhaCungCap.diaChi,
      nhaCungCap.soDienThoai,
      nhaCungCap.email,
      nhaCungCap.ghiChu,
      nhaCungCap.trangThai,
      new Date(),
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM NhaCungCap WHERE maNhaCungCap = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new NhaCungCap(result.rows[0]);
  }

  async update(maNhaCungCap, nhaCungCap) {
    const query = `
      UPDATE NhaCungCap 
      SET tenNhaCungCap = ?, nguoiLienHe = ?, diaChi = ?, soDienThoai = ?,
          email = ?, ghiChu = ?, trangThai = ?, ngayCapNhat = ?
      WHERE maNhaCungCap = ?
    `;
    const values = [
      nhaCungCap.tenNhaCungCap,
      nhaCungCap.nguoiLienHe,
      nhaCungCap.diaChi,
      nhaCungCap.soDienThoai,
      nhaCungCap.email,
      nhaCungCap.ghiChu,
      nhaCungCap.trangThai,
      new Date(),
      maNhaCungCap
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM NhaCungCap WHERE maNhaCungCap = ?';
    const result = await this.db.query(selectQuery, [maNhaCungCap]);
    if (result.rows.length === 0) return null;
    return new NhaCungCap(result.rows[0]);
  }

  async delete(maNhaCungCap) {
    const selectQuery = 'SELECT * FROM NhaCungCap WHERE maNhaCungCap = ?';
    const selectResult = await this.db.query(selectQuery, [maNhaCungCap]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM NhaCungCap WHERE maNhaCungCap = ?';
    await this.db.query(query, [maNhaCungCap]);
    return new NhaCungCap(selectResult.rows[0]);
  }
}

module.exports = NhaCungCapDAO;


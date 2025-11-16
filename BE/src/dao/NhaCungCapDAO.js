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
    const query = 'SELECT * FROM NhaCungCap WHERE maNhaCungCap = $1';
    const result = await this.db.query(query, [maNhaCungCap]);
    if (result.rows.length === 0) return null;
    return new NhaCungCap(result.rows[0]);
  }

  async create(nhaCungCap) {
    const query = `
      INSERT INTO NhaCungCap (tenNhaCungCap, nguoiLienHe, diaChi, soDienThoai, email, ghiChu, trangThai, ngayTao, ngayCapNhat)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
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
    const result = await this.db.query(query, values);
    return new NhaCungCap(result.rows[0]);
  }

  async update(maNhaCungCap, nhaCungCap) {
    const query = `
      UPDATE NhaCungCap 
      SET tenNhaCungCap = $1, nguoiLienHe = $2, diaChi = $3, soDienThoai = $4,
          email = $5, ghiChu = $6, trangThai = $7, ngayCapNhat = $8
      WHERE maNhaCungCap = $9
      RETURNING *
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
    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return new NhaCungCap(result.rows[0]);
  }

  async delete(maNhaCungCap) {
    const query = 'DELETE FROM NhaCungCap WHERE maNhaCungCap = $1 RETURNING *';
    const result = await this.db.query(query, [maNhaCungCap]);
    if (result.rows.length === 0) return null;
    return new NhaCungCap(result.rows[0]);
  }
}

module.exports = NhaCungCapDAO;


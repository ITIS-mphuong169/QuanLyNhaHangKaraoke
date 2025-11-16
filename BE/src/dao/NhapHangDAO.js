/**
 * DAO: NhapHangDAO
 * Mô tả: Lớp Data Access Object cho thực thể NhapHang
 */
const NhapHang = require('../entities/NhapHang');

class NhapHangDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM NhapHang ORDER BY ngayNhap DESC';
    const result = await this.db.query(query);
    return result.rows.map(row => new NhapHang(row));
  }

  async getById(maNhapHang) {
    const query = 'SELECT * FROM NhapHang WHERE maNhapHang = ?';
    const result = await this.db.query(query, [maNhapHang]);
    if (result.rows.length === 0) return null;
    return new NhapHang(result.rows[0]);
  }

  async getByNhaCungCap(maNhaCungCap) {
    const query = 'SELECT * FROM NhapHang WHERE maNhaCungCap = ? ORDER BY ngayNhap DESC';
    const result = await this.db.query(query, [maNhaCungCap]);
    return result.rows.map(row => new NhapHang(row));
  }

  async create(nhapHang) {
    const query = `
      INSERT INTO NhapHang (maNhaCungCap, maNhanVien, ngayNhap, tongTien, ghiChu, trangThai, ngayTao, ngayCapNhat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      nhapHang.maNhaCungCap,
      nhapHang.maNhanVien,
      nhapHang.ngayNhap,
      nhapHang.tongTien,
      nhapHang.ghiChu,
      nhapHang.trangThai,
      new Date(),
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM NhapHang WHERE maNhapHang = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new NhapHang(result.rows[0]);
  }

  async update(maNhapHang, nhapHang) {
    const query = `
      UPDATE NhapHang 
      SET maNhaCungCap = ?, maNhanVien = ?, ngayNhap = ?,
          tongTien = ?, ghiChu = ?, trangThai = ?, ngayCapNhat = ?
      WHERE maNhapHang = ?
    `;
    const values = [
      nhapHang.maNhaCungCap,
      nhapHang.maNhanVien,
      nhapHang.ngayNhap,
      nhapHang.tongTien,
      nhapHang.ghiChu,
      nhapHang.trangThai,
      new Date(),
      maNhapHang
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM NhapHang WHERE maNhapHang = ?';
    const result = await this.db.query(selectQuery, [maNhapHang]);
    if (result.rows.length === 0) return null;
    return new NhapHang(result.rows[0]);
  }

  async delete(maNhapHang) {
    const selectQuery = 'SELECT * FROM NhapHang WHERE maNhapHang = ?';
    const selectResult = await this.db.query(selectQuery, [maNhapHang]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM NhapHang WHERE maNhapHang = ?';
    await this.db.query(query, [maNhapHang]);
    return new NhapHang(selectResult.rows[0]);
  }
}

module.exports = NhapHangDAO;


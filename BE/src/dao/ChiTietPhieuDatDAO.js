/**
 * DAO: ChiTietPhieuDatDAO
 * Mô tả: Lớp Data Access Object cho thực thể ChiTietPhieuDat
 */
const ChiTietPhieuDat = require('../entities/ChiTietPhieuDat');

class ChiTietPhieuDatDAO {
  constructor(db) {
    this.db = db;
  }

  async getByPhieuDat(maPhieuDat) {
    const query = 'SELECT * FROM ChiTietPhieuDat WHERE maPhieuDat = ? ORDER BY maChiTiet';
    const result = await this.db.query(query, [maPhieuDat]);
    return result.rows.map(row => new ChiTietPhieuDat(row));
  }

  async getById(maChiTiet) {
    const query = 'SELECT * FROM ChiTietPhieuDat WHERE maChiTiet = ?';
    const result = await this.db.query(query, [maChiTiet]);
    if (result.rows.length === 0) return null;
    return new ChiTietPhieuDat(result.rows[0]);
  }

  async create(chiTiet) {
    const query = `
      INSERT INTO ChiTietPhieuDat (maPhieuDat, maMatHang, tenMatHang, soLuong, ngayTao)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      chiTiet.maPhieuDat,
      chiTiet.maMatHang,
      chiTiet.tenMatHang,
      chiTiet.soLuong || 0,
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM ChiTietPhieuDat WHERE maChiTiet = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new ChiTietPhieuDat(result.rows[0]);
  }

  async update(maChiTiet, chiTiet) {
    const query = `
      UPDATE ChiTietPhieuDat 
      SET maMatHang = ?, tenMatHang = ?, soLuong = ?
      WHERE maChiTiet = ?
    `;
    const values = [
      chiTiet.maMatHang,
      chiTiet.tenMatHang,
      chiTiet.soLuong,
      maChiTiet
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM ChiTietPhieuDat WHERE maChiTiet = ?';
    const result = await this.db.query(selectQuery, [maChiTiet]);
    if (result.rows.length === 0) return null;
    return new ChiTietPhieuDat(result.rows[0]);
  }

  async delete(maChiTiet) {
    const selectQuery = 'SELECT * FROM ChiTietPhieuDat WHERE maChiTiet = ?';
    const selectResult = await this.db.query(selectQuery, [maChiTiet]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM ChiTietPhieuDat WHERE maChiTiet = ?';
    await this.db.query(query, [maChiTiet]);
    return new ChiTietPhieuDat(selectResult.rows[0]);
  }

  async deleteByPhieuDat(maPhieuDat) {
    const query = 'DELETE FROM ChiTietPhieuDat WHERE maPhieuDat = ?';
    await this.db.query(query, [maPhieuDat]);
  }
}

module.exports = ChiTietPhieuDatDAO;


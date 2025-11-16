/**
 * DAO: PhongDatDAO
 * Mô tả: Lớp Data Access Object cho thực thể PhongDat
 */
const PhongDat = require('../entities/Phongdat');

class PhongDatDAO {
  constructor(db) {
    this.db = db;
  }

  async getByPhieuDat(maPhieuDat) {
    const query = 'SELECT * FROM PhongDat WHERE maPhieuDat = ? ORDER BY gioBatDau';
    const result = await this.db.query(query, [maPhieuDat]);
    return result.rows.map(row => new PhongDat(row));
  }

  async getById(maPhongDat) {
    const query = 'SELECT * FROM PhongDat WHERE maPhongDat = ?';
    const result = await this.db.query(query, [maPhongDat]);
    if (result.rows.length === 0) return null;
    return new PhongDat(result.rows[0]);
  }

  async create(phongDat) {
    const query = `
      INSERT INTO PhongDat (maPhieuDat, maPhong, gioBatDau, gioKetThuc, soGio, ngayTao)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      phongDat.maPhieuDat,
      phongDat.maPhong,
      phongDat.gioBatDau,
      phongDat.gioKetThuc,
      phongDat.soGio || 0,
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM PhongDat WHERE maPhongDat = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new PhongDat(result.rows[0]);
  }

  async update(maPhongDat, phongDat) {
    const query = `
      UPDATE PhongDat 
      SET maPhieuDat = ?, maPhong = ?, gioBatDau = ?, gioKetThuc = ?, soGio = ?
      WHERE maPhongDat = ?
    `;
    const values = [
      phongDat.maPhieuDat,
      phongDat.maPhong,
      phongDat.gioBatDau,
      phongDat.gioKetThuc,
      phongDat.soGio,
      maPhongDat
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM PhongDat WHERE maPhongDat = ?';
    const result = await this.db.query(selectQuery, [maPhongDat]);
    if (result.rows.length === 0) return null;
    return new PhongDat(result.rows[0]);
  }

  async delete(maPhongDat) {
    const selectQuery = 'SELECT * FROM PhongDat WHERE maPhongDat = ?';
    const selectResult = await this.db.query(selectQuery, [maPhongDat]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM PhongDat WHERE maPhongDat = ?';
    await this.db.query(query, [maPhongDat]);
    return new PhongDat(selectResult.rows[0]);
  }

  async deleteByPhieuDat(maPhieuDat) {
    const query = 'DELETE FROM PhongDat WHERE maPhieuDat = ?';
    await this.db.query(query, [maPhieuDat]);
  }
}

module.exports = PhongDatDAO;


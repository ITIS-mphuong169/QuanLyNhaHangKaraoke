/**
 * DAO: MatHangSDDAO
 * Mô tả: Lớp Data Access Object cho thực thể MatHangSD
 */
const MatHangSD = require('../entities/MatHangSD');

class MatHangSDDAO {
  constructor(db) {
    this.db = db;
  }

  async getByPhieuDat(maPhieuDat) {
    const query = 'SELECT * FROM MatHangSD WHERE maPhieuDat = ? ORDER BY tenMatHang';
    const result = await this.db.query(query, [maPhieuDat]);
    return result.rows.map(row => new MatHangSD(row));
  }

  async getById(maMatHangSD) {
    const query = 'SELECT * FROM MatHangSD WHERE maMatHangSD = ?';
    const result = await this.db.query(query, [maMatHangSD]);
    if (result.rows.length === 0) return null;
    return new MatHangSD(result.rows[0]);
  }

  async create(matHangSD) {
    const query = `
      INSERT INTO MatHangSD (maPhieuDat, maMatHang, tenMatHang, soLuong, donGia, thanhTien, ngayTao)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      matHangSD.maPhieuDat,
      matHangSD.maMatHang,
      matHangSD.tenMatHang,
      matHangSD.soLuong,
      matHangSD.donGia,
      matHangSD.thanhTien,
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM MatHangSD WHERE maMatHangSD = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new MatHangSD(result.rows[0]);
  }

  async update(maMatHangSD, matHangSD) {
    const query = `
      UPDATE MatHangSD 
      SET maPhieuDat = ?, maMatHang = ?, tenMatHang = ?,
          soLuong = ?, donGia = ?, thanhTien = ?
      WHERE maMatHangSD = ?
    `;
    const values = [
      matHangSD.maPhieuDat,
      matHangSD.maMatHang,
      matHangSD.tenMatHang,
      matHangSD.soLuong,
      matHangSD.donGia,
      matHangSD.thanhTien,
      maMatHangSD
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM MatHangSD WHERE maMatHangSD = ?';
    const result = await this.db.query(selectQuery, [maMatHangSD]);
    if (result.rows.length === 0) return null;
    return new MatHangSD(result.rows[0]);
  }

  async delete(maMatHangSD) {
    const selectQuery = 'SELECT * FROM MatHangSD WHERE maMatHangSD = ?';
    const selectResult = await this.db.query(selectQuery, [maMatHangSD]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM MatHangSD WHERE maMatHangSD = ?';
    await this.db.query(query, [maMatHangSD]);
    return new MatHangSD(selectResult.rows[0]);
  }

  async deleteByPhieuDat(maPhieuDat) {
    const query = 'DELETE FROM MatHangSD WHERE maPhieuDat = ?';
    await this.db.query(query, [maPhieuDat]);
  }
}

module.exports = MatHangSDDAO;


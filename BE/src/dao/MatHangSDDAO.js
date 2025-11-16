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
    const query = 'SELECT * FROM MatHangSD WHERE maPhieuDat = $1 ORDER BY tenMatHang';
    const result = await this.db.query(query, [maPhieuDat]);
    return result.rows.map(row => new MatHangSD(row));
  }

  async getById(maMatHangSD) {
    const query = 'SELECT * FROM MatHangSD WHERE maMatHangSD = $1';
    const result = await this.db.query(query, [maMatHangSD]);
    if (result.rows.length === 0) return null;
    return new MatHangSD(result.rows[0]);
  }

  async create(matHangSD) {
    const query = `
      INSERT INTO MatHangSD (maPhieuDat, maMatHang, tenMatHang, soLuong, donGia, thanhTien, ngayTao)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
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
    const result = await this.db.query(query, values);
    return new MatHangSD(result.rows[0]);
  }

  async update(maMatHangSD, matHangSD) {
    const query = `
      UPDATE MatHangSD 
      SET maPhieuDat = $1, maMatHang = $2, tenMatHang = $3,
          soLuong = $4, donGia = $5, thanhTien = $6
      WHERE maMatHangSD = $7
      RETURNING *
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
    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return new MatHangSD(result.rows[0]);
  }

  async delete(maMatHangSD) {
    const query = 'DELETE FROM MatHangSD WHERE maMatHangSD = $1 RETURNING *';
    const result = await this.db.query(query, [maMatHangSD]);
    if (result.rows.length === 0) return null;
    return new MatHangSD(result.rows[0]);
  }

  async deleteByPhieuDat(maPhieuDat) {
    const query = 'DELETE FROM MatHangSD WHERE maPhieuDat = $1';
    await this.db.query(query, [maPhieuDat]);
  }
}

module.exports = MatHangSDDAO;


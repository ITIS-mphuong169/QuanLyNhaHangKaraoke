/**
 * DAO: PhongdatDAO
 * Mô tả: Lớp Data Access Object cho thực thể Phongdat
 */
const Phongdat = require('../entities/Phongdat');

class PhongdatDAO {
  constructor(db) {
    this.db = db;
  }

  async getByPhieuDat(maPhieuDat) {
    const query = 'SELECT * FROM Phongdat WHERE maPhieuDat = $1 ORDER BY gioBatDau';
    const result = await this.db.query(query, [maPhieuDat]);
    return result.rows.map(row => new Phongdat(row));
  }

  async getById(maPhongDat) {
    const query = 'SELECT * FROM Phongdat WHERE maPhongDat = $1';
    const result = await this.db.query(query, [maPhongDat]);
    if (result.rows.length === 0) return null;
    return new Phongdat(result.rows[0]);
  }

  async create(phongdat) {
    const query = `
      INSERT INTO Phongdat (maPhieuDat, maPhong, gioBatDau, gioKetThuc, soGio, giaGio, thanhTien, ngayTao)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      phongdat.maPhieuDat,
      phongdat.maPhong,
      phongdat.gioBatDau,
      phongdat.gioKetThuc,
      phongdat.soGio,
      phongdat.giaGio,
      phongdat.thanhTien,
      new Date()
    ];
    const result = await this.db.query(query, values);
    return new Phongdat(result.rows[0]);
  }

  async update(maPhongDat, phongdat) {
    const query = `
      UPDATE Phongdat 
      SET maPhieuDat = $1, maPhong = $2, gioBatDau = $3, gioKetThuc = $4,
          soGio = $5, giaGio = $6, thanhTien = $7
      WHERE maPhongDat = $8
      RETURNING *
    `;
    const values = [
      phongdat.maPhieuDat,
      phongdat.maPhong,
      phongdat.gioBatDau,
      phongdat.gioKetThuc,
      phongdat.soGio,
      phongdat.giaGio,
      phongdat.thanhTien,
      maPhongDat
    ];
    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return new Phongdat(result.rows[0]);
  }

  async delete(maPhongDat) {
    const query = 'DELETE FROM Phongdat WHERE maPhongDat = $1 RETURNING *';
    const result = await this.db.query(query, [maPhongDat]);
    if (result.rows.length === 0) return null;
    return new Phongdat(result.rows[0]);
  }

  async deleteByPhieuDat(maPhieuDat) {
    const query = 'DELETE FROM Phongdat WHERE maPhieuDat = $1';
    await this.db.query(query, [maPhieuDat]);
  }
}

module.exports = PhongdatDAO;


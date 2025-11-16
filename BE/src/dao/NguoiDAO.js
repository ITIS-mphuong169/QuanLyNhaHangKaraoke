/**
 * DAO: NguoiDAO
 * Mô tả: Lớp Data Access Object cho thực thể Nguoi
 */
const Nguoi = require('../entities/Nguoi');

class NguoiDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM Nguoi ORDER BY maNguoi';
    const result = await this.db.query(query);
    return result.rows.map(row => new Nguoi(row));
  }

  async getById(maNguoi) {
    const query = 'SELECT * FROM Nguoi WHERE maNguoi = ?';
    const result = await this.db.query(query, [maNguoi]);
    if (result.rows.length === 0) return null;
    return new Nguoi(result.rows[0]);
  }

  async getBySoDienThoai(soDienThoai) {
    const query = 'SELECT * FROM Nguoi WHERE soDienThoai = ?';
    const result = await this.db.query(query, [soDienThoai]);
    if (result.rows.length === 0) return null;
    return new Nguoi(result.rows[0]);
  }

  async create(nguoi) {
    const query = `
      INSERT INTO Nguoi (hoTen, diaChi, soDienThoai, email, ngaySinh, gioiTinh, ngayTao, ngayCapNhat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      nguoi.hoTen,
      nguoi.diaChi,
      nguoi.soDienThoai,
      nguoi.email,
      nguoi.ngaySinh,
      nguoi.gioiTinh,
      new Date(),
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM Nguoi WHERE maNguoi = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new Nguoi(result.rows[0]);
  }

  async update(maNguoi, nguoi) {
    const query = `
      UPDATE Nguoi 
      SET hoTen = ?, diaChi = ?, soDienThoai = ?, email = ?, 
          ngaySinh = ?, gioiTinh = ?, ngayCapNhat = ?
      WHERE maNguoi = ?
    `;
    const values = [
      nguoi.hoTen,
      nguoi.diaChi,
      nguoi.soDienThoai,
      nguoi.email,
      nguoi.ngaySinh,
      nguoi.gioiTinh,
      new Date(),
      maNguoi
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM Nguoi WHERE maNguoi = ?';
    const result = await this.db.query(selectQuery, [maNguoi]);
    if (result.rows.length === 0) return null;
    return new Nguoi(result.rows[0]);
  }

  async delete(maNguoi) {
    const selectQuery = 'SELECT * FROM Nguoi WHERE maNguoi = ?';
    const selectResult = await this.db.query(selectQuery, [maNguoi]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM Nguoi WHERE maNguoi = ?';
    await this.db.query(query, [maNguoi]);
    return new Nguoi(selectResult.rows[0]);
  }
}

module.exports = NguoiDAO;


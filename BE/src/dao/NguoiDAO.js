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
    const query = 'SELECT * FROM Nguoi WHERE maNguoi = $1';
    const result = await this.db.query(query, [maNguoi]);
    if (result.rows.length === 0) return null;
    return new Nguoi(result.rows[0]);
  }

  async getBySoDienThoai(soDienThoai) {
    const query = 'SELECT * FROM Nguoi WHERE soDienThoai = $1';
    const result = await this.db.query(query, [soDienThoai]);
    if (result.rows.length === 0) return null;
    return new Nguoi(result.rows[0]);
  }

  async create(nguoi) {
    const query = `
      INSERT INTO Nguoi (hoTen, diaChi, soDienThoai, email, ngaySinh, gioiTinh, ngayTao, ngayCapNhat)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
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
    const result = await this.db.query(query, values);
    return new Nguoi(result.rows[0]);
  }

  async update(maNguoi, nguoi) {
    const query = `
      UPDATE Nguoi 
      SET hoTen = $1, diaChi = $2, soDienThoai = $3, email = $4, 
          ngaySinh = $5, gioiTinh = $6, ngayCapNhat = $7
      WHERE maNguoi = $8
      RETURNING *
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
    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return new Nguoi(result.rows[0]);
  }

  async delete(maNguoi) {
    const query = 'DELETE FROM Nguoi WHERE maNguoi = $1 RETURNING *';
    const result = await this.db.query(query, [maNguoi]);
    if (result.rows.length === 0) return null;
    return new Nguoi(result.rows[0]);
  }
}

module.exports = NguoiDAO;


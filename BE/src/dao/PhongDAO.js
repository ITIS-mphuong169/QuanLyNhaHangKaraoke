/**
 * DAO: PhongDAO
 * Mô tả: Lớp Data Access Object cho thực thể Phong
 */
const Phong = require('../entities/Phong');

class PhongDAO {
  constructor(db) {
    this.db = db;
  }

  // Lấy tất cả phòng
  async getAll() {
    const query = 'SELECT * FROM Phong ORDER BY maPhong';
    const result = await this.db.query(query);
    return result.rows.map(row => new Phong(row));
  }

  // Lấy phòng theo mã
  async getById(maPhong) {
    const query = 'SELECT * FROM Phong WHERE maPhong = ?';
    const result = await this.db.query(query, [maPhong]);
    if (result.rows.length === 0) return null;
    return new Phong(result.rows[0]);
  }

  // Lấy phòng theo trạng thái
  async getByTrangThai(trangThai) {
    const query = 'SELECT * FROM Phong WHERE trangThai = ? ORDER BY maPhong';
    const result = await this.db.query(query, [trangThai]);
    return result.rows.map(row => new Phong(row));
  }

  // Tạo phòng mới
  async create(phong) {
    const query = `
      INSERT INTO Phong (tenPhong, loaiPhong, sucChua, giaGio, trangThai, moTa, ngayTao, ngayCapNhat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      phong.tenPhong,
      phong.loaiPhong,
      phong.sucChua,
      phong.giaGio,
      phong.trangThai || 'TRONG',
      phong.moTa || null,
      new Date(),
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM Phong WHERE maPhong = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new Phong(result.rows[0]);
  }

  // Cập nhật phòng
  async update(maPhong, phong) {
    const query = `
      UPDATE Phong 
      SET tenPhong = ?, loaiPhong = ?, sucChua = ?, giaGio = ?, 
          trangThai = ?, moTa = ?, ngayCapNhat = ?
      WHERE maPhong = ?
    `;
    const values = [
      phong.tenPhong,
      phong.loaiPhong,
      phong.sucChua,
      phong.giaGio,
      phong.trangThai,
      phong.moTa || null,
      new Date(),
      maPhong
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM Phong WHERE maPhong = ?';
    const result = await this.db.query(selectQuery, [maPhong]);
    if (result.rows.length === 0) return null;
    return new Phong(result.rows[0]);
  }

  // Xóa phòng
  async delete(maPhong) {
    const selectQuery = 'SELECT * FROM Phong WHERE maPhong = ?';
    const selectResult = await this.db.query(selectQuery, [maPhong]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM Phong WHERE maPhong = ?';
    await this.db.query(query, [maPhong]);
    return new Phong(selectResult.rows[0]);
  }

  // Cập nhật trạng thái phòng
  async updateTrangThai(maPhong, trangThai) {
    const query = `
      UPDATE Phong 
      SET trangThai = ?, ngayCapNhat = ?
      WHERE maPhong = ?
    `;
    await this.db.query(query, [trangThai, new Date(), maPhong]);
    const selectQuery = 'SELECT * FROM Phong WHERE maPhong = ?';
    const result = await this.db.query(selectQuery, [maPhong]);
    if (result.rows.length === 0) return null;
    return new Phong(result.rows[0]);
  }
}

module.exports = PhongDAO;


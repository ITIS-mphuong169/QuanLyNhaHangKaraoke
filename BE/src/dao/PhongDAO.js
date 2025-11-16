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
    const query = 'SELECT * FROM Phong WHERE maPhong = $1';
    const result = await this.db.query(query, [maPhong]);
    if (result.rows.length === 0) return null;
    return new Phong(result.rows[0]);
  }

  // Lấy phòng theo trạng thái
  async getByTrangThai(trangThai) {
    const query = 'SELECT * FROM Phong WHERE trangThai = $1 ORDER BY maPhong';
    const result = await this.db.query(query, [trangThai]);
    return result.rows.map(row => new Phong(row));
  }

  // Tạo phòng mới
  async create(phong) {
    const query = `
      INSERT INTO Phong (tenPhong, loaiPhong, sucChua, giaGio, trangThai, moTa, thietBi, ngayTao, ngayCapNhat)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [
      phong.tenPhong,
      phong.loaiPhong,
      phong.sucChua,
      phong.giaGio,
      phong.trangThai,
      phong.moTa,
      JSON.stringify(phong.thietBi),
      new Date(),
      new Date()
    ];
    const result = await this.db.query(query, values);
    return new Phong(result.rows[0]);
  }

  // Cập nhật phòng
  async update(maPhong, phong) {
    const query = `
      UPDATE Phong 
      SET tenPhong = $1, loaiPhong = $2, sucChua = $3, giaGio = $4, 
          trangThai = $5, moTa = $6, thietBi = $7, ngayCapNhat = $8
      WHERE maPhong = $9
      RETURNING *
    `;
    const values = [
      phong.tenPhong,
      phong.loaiPhong,
      phong.sucChua,
      phong.giaGio,
      phong.trangThai,
      phong.moTa,
      JSON.stringify(phong.thietBi),
      new Date(),
      maPhong
    ];
    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return new Phong(result.rows[0]);
  }

  // Xóa phòng
  async delete(maPhong) {
    const query = 'DELETE FROM Phong WHERE maPhong = $1 RETURNING *';
    const result = await this.db.query(query, [maPhong]);
    if (result.rows.length === 0) return null;
    return new Phong(result.rows[0]);
  }

  // Cập nhật trạng thái phòng
  async updateTrangThai(maPhong, trangThai) {
    const query = `
      UPDATE Phong 
      SET trangThai = $1, ngayCapNhat = $2
      WHERE maPhong = $3
      RETURNING *
    `;
    const result = await this.db.query(query, [trangThai, new Date(), maPhong]);
    if (result.rows.length === 0) return null;
    return new Phong(result.rows[0]);
  }
}

module.exports = PhongDAO;


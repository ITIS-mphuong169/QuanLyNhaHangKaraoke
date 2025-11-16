/**
 * DAO: KhachHangDAO
 * Mô tả: Lớp Data Access Object cho thực thể KhachHang
 */
const KhachHang = require('../entities/KhachHang');

class KhachHangDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM KhachHang ORDER BY maKhachHang';
    const result = await this.db.query(query);
    return result.rows.map(row => new KhachHang(row));
  }

  async getById(maKhachHang) {
    const query = 'SELECT * FROM KhachHang WHERE maKhachHang = $1';
    const result = await this.db.query(query, [maKhachHang]);
    if (result.rows.length === 0) return null;
    return new KhachHang(result.rows[0]);
  }

  async getBySoDienThoai(soDienThoai) {
    const query = 'SELECT * FROM KhachHang WHERE soDienThoai = $1';
    const result = await this.db.query(query, [soDienThoai]);
    if (result.rows.length === 0) return null;
    return new KhachHang(result.rows[0]);
  }

  async search(keyword) {
    const query = `
      SELECT * FROM KhachHang 
      WHERE hoTen ILIKE $1 OR soDienThoai ILIKE $1 OR email ILIKE $1
      ORDER BY maKhachHang
    `;
    const result = await this.db.query(query, [`%${keyword}%`]);
    return result.rows.map(row => new KhachHang(row));
  }

  async create(khachHang) {
    const query = `
      INSERT INTO KhachHang (hoTen, soDienThoai, email, diaChi, ngaySinh, gioiTinh, loaiKhachHang, diemTichLuy, ngayTao, ngayCapNhat)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const values = [
      khachHang.hoTen,
      khachHang.soDienThoai,
      khachHang.email,
      khachHang.diaChi,
      khachHang.ngaySinh,
      khachHang.gioiTinh,
      khachHang.loaiKhachHang,
      khachHang.diemTichLuy,
      new Date(),
      new Date()
    ];
    const result = await this.db.query(query, values);
    return new KhachHang(result.rows[0]);
  }

  async update(maKhachHang, khachHang) {
    const query = `
      UPDATE KhachHang 
      SET hoTen = $1, soDienThoai = $2, email = $3, diaChi = $4, 
          ngaySinh = $5, gioiTinh = $6, loaiKhachHang = $7, 
          diemTichLuy = $8, ngayCapNhat = $9
      WHERE maKhachHang = $10
      RETURNING *
    `;
    const values = [
      khachHang.hoTen,
      khachHang.soDienThoai,
      khachHang.email,
      khachHang.diaChi,
      khachHang.ngaySinh,
      khachHang.gioiTinh,
      khachHang.loaiKhachHang,
      khachHang.diemTichLuy,
      new Date(),
      maKhachHang
    ];
    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return new KhachHang(result.rows[0]);
  }

  async delete(maKhachHang) {
    const query = 'DELETE FROM KhachHang WHERE maKhachHang = $1 RETURNING *';
    const result = await this.db.query(query, [maKhachHang]);
    if (result.rows.length === 0) return null;
    return new KhachHang(result.rows[0]);
  }

  async updateDiemTichLuy(maKhachHang, diem) {
    const query = `
      UPDATE KhachHang 
      SET diemTichLuy = diemTichLuy + $1, ngayCapNhat = $2
      WHERE maKhachHang = $3
      RETURNING *
    `;
    const result = await this.db.query(query, [diem, new Date(), maKhachHang]);
    if (result.rows.length === 0) return null;
    return new KhachHang(result.rows[0]);
  }
}

module.exports = KhachHangDAO;


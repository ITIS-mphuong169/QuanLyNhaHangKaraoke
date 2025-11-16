/**
 * DAO: MatHangDAO
 * Mô tả: Lớp Data Access Object cho thực thể MatHang
 */
const MatHang = require('../entities/MatHang');

class MatHangDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM MatHang ORDER BY maMatHang';
    const result = await this.db.query(query);
    return result.rows.map(row => new MatHang(row));
  }

  async getById(maMatHang) {
    const query = 'SELECT * FROM MatHang WHERE maMatHang = $1';
    const result = await this.db.query(query, [maMatHang]);
    if (result.rows.length === 0) return null;
    return new MatHang(result.rows[0]);
  }

  async getByDanhMuc(danhMuc) {
    const query = 'SELECT * FROM MatHang WHERE danhMuc = $1 ORDER BY tenMatHang';
    const result = await this.db.query(query, [danhMuc]);
    return result.rows.map(row => new MatHang(row));
  }

  async getByTrangThai(trangThai) {
    const query = 'SELECT * FROM MatHang WHERE trangThai = $1 ORDER BY tenMatHang';
    const result = await this.db.query(query, [trangThai]);
    return result.rows.map(row => new MatHang(row));
  }

  async search(keyword) {
    const query = `
      SELECT * FROM MatHang 
      WHERE tenMatHang ILIKE $1 OR danhMuc ILIKE $1
      ORDER BY tenMatHang
    `;
    const result = await this.db.query(query, [`%${keyword}%`]);
    return result.rows.map(row => new MatHang(row));
  }

  async create(matHang) {
    const query = `
      INSERT INTO MatHang (tenMatHang, danhMuc, donViTinh, giaBan, giaNhap, tonKho, moTa, hinhAnh, maNhaCungCap, trangThai, ngayTao, ngayCapNhat)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;
    const values = [
      matHang.tenMatHang,
      matHang.danhMuc,
      matHang.donViTinh,
      matHang.giaBan,
      matHang.giaNhap,
      matHang.tonKho,
      matHang.moTa,
      matHang.hinhAnh,
      matHang.maNhaCungCap,
      matHang.trangThai,
      new Date(),
      new Date()
    ];
    const result = await this.db.query(query, values);
    return new MatHang(result.rows[0]);
  }

  async update(maMatHang, matHang) {
    const query = `
      UPDATE MatHang 
      SET tenMatHang = $1, danhMuc = $2, donViTinh = $3, giaBan = $4, 
          giaNhap = $5, tonKho = $6, moTa = $7, hinhAnh = $8, 
          maNhaCungCap = $9, trangThai = $10, ngayCapNhat = $11
      WHERE maMatHang = $12
      RETURNING *
    `;
    const values = [
      matHang.tenMatHang,
      matHang.danhMuc,
      matHang.donViTinh,
      matHang.giaBan,
      matHang.giaNhap,
      matHang.tonKho,
      matHang.moTa,
      matHang.hinhAnh,
      matHang.maNhaCungCap,
      matHang.trangThai,
      new Date(),
      maMatHang
    ];
    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return new MatHang(result.rows[0]);
  }

  async delete(maMatHang) {
    const query = 'DELETE FROM MatHang WHERE maMatHang = $1 RETURNING *';
    const result = await this.db.query(query, [maMatHang]);
    if (result.rows.length === 0) return null;
    return new MatHang(result.rows[0]);
  }

  async updateTonKho(maMatHang, soLuong) {
    const query = `
      UPDATE MatHang 
      SET tonKho = tonKho + $1, ngayCapNhat = $2
      WHERE maMatHang = $3
      RETURNING *
    `;
    const result = await this.db.query(query, [soLuong, new Date(), maMatHang]);
    if (result.rows.length === 0) return null;
    return new MatHang(result.rows[0]);
  }
}

module.exports = MatHangDAO;


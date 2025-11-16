/**
 * DAO: NhapHangDAO
 * Mô tả: Lớp Data Access Object cho thực thể NhapHang
 */
const NhapHang = require('../entities/NhapHang');

class NhapHangDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM NhapHang ORDER BY ngayNhap DESC';
    const result = await this.db.query(query);
    return result.rows.map(row => new NhapHang(row));
  }

  async getById(maNhapHang) {
    const query = 'SELECT * FROM NhapHang WHERE maNhapHang = $1';
    const result = await this.db.query(query, [maNhapHang]);
    if (result.rows.length === 0) return null;
    return new NhapHang(result.rows[0]);
  }

  async getByNhaCungCap(maNhaCungCap) {
    const query = 'SELECT * FROM NhapHang WHERE maNhaCungCap = $1 ORDER BY ngayNhap DESC';
    const result = await this.db.query(query, [maNhaCungCap]);
    return result.rows.map(row => new NhapHang(row));
  }

  async create(nhapHang) {
    const query = `
      INSERT INTO NhapHang (maNhaCungCap, maNhanVien, ngayNhap, tongTien, ghiChu, trangThai, ngayTao, ngayCapNhat)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      nhapHang.maNhaCungCap,
      nhapHang.maNhanVien,
      nhapHang.ngayNhap,
      nhapHang.tongTien,
      nhapHang.ghiChu,
      nhapHang.trangThai,
      new Date(),
      new Date()
    ];
    const result = await this.db.query(query, values);
    return new NhapHang(result.rows[0]);
  }

  async update(maNhapHang, nhapHang) {
    const query = `
      UPDATE NhapHang 
      SET maNhaCungCap = $1, maNhanVien = $2, ngayNhap = $3,
          tongTien = $4, ghiChu = $5, trangThai = $6, ngayCapNhat = $7
      WHERE maNhapHang = $8
      RETURNING *
    `;
    const values = [
      nhapHang.maNhaCungCap,
      nhapHang.maNhanVien,
      nhapHang.ngayNhap,
      nhapHang.tongTien,
      nhapHang.ghiChu,
      nhapHang.trangThai,
      new Date(),
      maNhapHang
    ];
    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return new NhapHang(result.rows[0]);
  }

  async delete(maNhapHang) {
    const query = 'DELETE FROM NhapHang WHERE maNhapHang = $1 RETURNING *';
    const result = await this.db.query(query, [maNhapHang]);
    if (result.rows.length === 0) return null;
    return new NhapHang(result.rows[0]);
  }
}

module.exports = NhapHangDAO;


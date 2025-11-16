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
    const query = 'SELECT * FROM MatHang WHERE maMatHang = ?';
    const result = await this.db.query(query, [maMatHang]);
    if (result.rows.length === 0) return null;
    return new MatHang(result.rows[0]);
  }

  async getByNhaCungCap(maNhaCungCap) {
    const query = 'SELECT * FROM MatHang WHERE maNhaCungCap = ? ORDER BY maMatHang';
    const result = await this.db.query(query, [maNhaCungCap]);
    return result.rows.map(row => new MatHang(row));
  }

  /**
   * Lấy tất cả mặt hàng kèm thông tin chi tiết từ MatHangCungcap
   */
  async getAllWithDetails() {
    const query = `
      SELECT 
        mh.maMatHang,
        mh.giaBan,
        mh.tonKho,
        mh.maNhaCungCap,
        mh.ngayTao,
        mh.ngayCapNhat,
        mhc.tenMatHang,
        mhc.giaNhap,
        mhc.donViTinh,
        mhc.moTa
      FROM MatHang mh
      LEFT JOIN MatHangCungcap mhc ON mh.maMatHang = mhc.maMatHang
      ORDER BY mh.maMatHang
    `;
    const result = await this.db.query(query);
    return result.rows.map(row => ({
      maMatHang: row.maMatHang,
      giaBan: row.giaBan,
      tonKho: row.tonKho,
      maNhaCungCap: row.maNhaCungCap,
      ngayTao: row.ngayTao,
      ngayCapNhat: row.ngayCapNhat,
      tenMatHang: row.tenMatHang,
      giaNhap: row.giaNhap,
      donViTinh: row.donViTinh,
      moTa: row.moTa
    }));
  }

  /**
   * Lấy mặt hàng theo ID kèm thông tin chi tiết
   */
  async getByIdWithDetails(maMatHang) {
    const query = `
      SELECT 
        mh.maMatHang,
        mh.giaBan,
        mh.tonKho,
        mh.maNhaCungCap,
        mh.ngayTao,
        mh.ngayCapNhat,
        mhc.tenMatHang,
        mhc.giaNhap,
        mhc.donViTinh,
        mhc.moTa
      FROM MatHang mh
      LEFT JOIN MatHangCungcap mhc ON mh.maMatHang = mhc.maMatHang
      WHERE mh.maMatHang = ?
    `;
    const result = await this.db.query(query, [maMatHang]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      maMatHang: row.maMatHang,
      giaBan: row.giaBan,
      tonKho: row.tonKho,
      maNhaCungCap: row.maNhaCungCap,
      ngayTao: row.ngayTao,
      ngayCapNhat: row.ngayCapNhat,
      tenMatHang: row.tenMatHang,
      giaNhap: row.giaNhap,
      donViTinh: row.donViTinh,
      moTa: row.moTa
    };
  }

  async create(matHang) {
    const query = `
      INSERT INTO MatHang (giaBan, tonKho, maNhaCungCap, ngayTao, ngayCapNhat)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      matHang.giaBan,
      matHang.tonKho || 0,
      matHang.maNhaCungCap,
      new Date(),
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM MatHang WHERE maMatHang = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new MatHang(result.rows[0]);
  }

  async update(maMatHang, matHang) {
    const query = `
      UPDATE MatHang 
      SET giaBan = ?, tonKho = ?, maNhaCungCap = ?, ngayCapNhat = ?
      WHERE maMatHang = ?
    `;
    const values = [
      matHang.giaBan,
      matHang.tonKho,
      matHang.maNhaCungCap,
      new Date(),
      maMatHang
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM MatHang WHERE maMatHang = ?';
    const result = await this.db.query(selectQuery, [maMatHang]);
    if (result.rows.length === 0) return null;
    return new MatHang(result.rows[0]);
  }

  async delete(maMatHang) {
    const selectQuery = 'SELECT * FROM MatHang WHERE maMatHang = ?';
    const selectResult = await this.db.query(selectQuery, [maMatHang]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM MatHang WHERE maMatHang = ?';
    await this.db.query(query, [maMatHang]);
    return new MatHang(selectResult.rows[0]);
  }

  async updateTonKho(maMatHang, soLuong) {
    const query = `
      UPDATE MatHang 
      SET tonKho = tonKho + ?, ngayCapNhat = ?
      WHERE maMatHang = ?
    `;
    await this.db.query(query, [soLuong, new Date(), maMatHang]);
    const selectQuery = 'SELECT * FROM MatHang WHERE maMatHang = ?';
    const result = await this.db.query(selectQuery, [maMatHang]);
    if (result.rows.length === 0) return null;
    return new MatHang(result.rows[0]);
  }
}

module.exports = MatHangDAO;


/**
 * DAO: MHCungcapDAO
 * Mô tả: Lớp Data Access Object cho thực thể MatHangCungcap
 */
const MatHangCungcap = require('../entities/MatHangCungcap');

class MHCungcapDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM MatHangCungcap ORDER BY maMatHangCungCap';
    const result = await this.db.query(query);
    return result.rows.map(row => new MatHangCungcap(row));
  }

  async getById(maMatHangCungCap) {
    const query = 'SELECT * FROM MatHangCungcap WHERE maMatHangCungCap = ?';
    const result = await this.db.query(query, [maMatHangCungCap]);
    if (result.rows.length === 0) return null;
    return new MatHangCungcap(result.rows[0]);
  }

  async getByNhaCungCap(maNhaCungCap) {
    const query = 'SELECT * FROM MatHangCungcap WHERE maNhaCungCap = ? ORDER BY tenMatHang';
    const result = await this.db.query(query, [maNhaCungCap]);
    return result.rows.map(row => new MatHangCungcap(row));
  }

  async getByMatHang(maMatHang) {
    const query = 'SELECT * FROM MatHangCungcap WHERE maMatHang = ?';
    const result = await this.db.query(query, [maMatHang]);
    if (result.rows.length === 0) return null;
    return new MatHangCungcap(result.rows[0]);
  }

  async create(matHangCungcap) {
    const query = `
      INSERT INTO MatHangCungcap (maNhaCungCap, maMatHang, tenMatHang, giaNhap, donViTinh, moTa, ngayTao, ngayCapNhat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      matHangCungcap.maNhaCungCap,
      matHangCungcap.maMatHang,
      matHangCungcap.tenMatHang,
      matHangCungcap.giaNhap,
      matHangCungcap.donViTinh,
      matHangCungcap.moTa,
      new Date(),
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM MatHangCungcap WHERE maMatHangCungCap = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new MatHangCungcap(result.rows[0]);
  }

  async update(maMatHangCungCap, matHangCungcap) {
    const query = `
      UPDATE MatHangCungcap 
      SET maNhaCungCap = ?, maMatHang = ?, tenMatHang = ?, 
          giaNhap = ?, donViTinh = ?, moTa = ?, ngayCapNhat = ?
      WHERE maMatHangCungCap = ?
    `;
    const values = [
      matHangCungcap.maNhaCungCap,
      matHangCungcap.maMatHang,
      matHangCungcap.tenMatHang,
      matHangCungcap.giaNhap,
      matHangCungcap.donViTinh,
      matHangCungcap.moTa,
      new Date(),
      maMatHangCungCap
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM MatHangCungcap WHERE maMatHangCungCap = ?';
    const result = await this.db.query(selectQuery, [maMatHangCungCap]);
    if (result.rows.length === 0) return null;
    return new MatHangCungcap(result.rows[0]);
  }

  async delete(maMatHangCungCap) {
    const selectQuery = 'SELECT * FROM MatHangCungcap WHERE maMatHangCungCap = ?';
    const selectResult = await this.db.query(selectQuery, [maMatHangCungCap]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM MatHangCungcap WHERE maMatHangCungCap = ?';
    await this.db.query(query, [maMatHangCungCap]);
    return new MatHangCungcap(selectResult.rows[0]);
  }
}

module.exports = MHCungcapDAO;


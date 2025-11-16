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
    const query = 'SELECT * FROM MatHangCungcap WHERE maMatHangCungCap = $1';
    const result = await this.db.query(query, [maMatHangCungCap]);
    if (result.rows.length === 0) return null;
    return new MatHangCungcap(result.rows[0]);
  }

  async getByNhaCungCap(maNhaCungCap) {
    const query = 'SELECT * FROM MatHangCungcap WHERE maNhaCungCap = $1 ORDER BY tenMatHang';
    const result = await this.db.query(query, [maNhaCungCap]);
    return result.rows.map(row => new MatHangCungcap(row));
  }

  async create(matHangCungcap) {
    const query = `
      INSERT INTO MatHangCungcap (maNhaCungCap, maMatHang, tenMatHang, giaNhap, donViTinh, moTa, ngayTao, ngayCapNhat)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
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
    const result = await this.db.query(query, values);
    return new MatHangCungcap(result.rows[0]);
  }

  async update(maMatHangCungCap, matHangCungcap) {
    const query = `
      UPDATE MatHangCungcap 
      SET maNhaCungCap = $1, maMatHang = $2, tenMatHang = $3, 
          giaNhap = $4, donViTinh = $5, moTa = $6, ngayCapNhat = $7
      WHERE maMatHangCungCap = $8
      RETURNING *
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
    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return new MatHangCungcap(result.rows[0]);
  }

  async delete(maMatHangCungCap) {
    const query = 'DELETE FROM MatHangCungcap WHERE maMatHangCungCap = $1 RETURNING *';
    const result = await this.db.query(query, [maMatHangCungCap]);
    if (result.rows.length === 0) return null;
    return new MatHangCungcap(result.rows[0]);
  }
}

module.exports = MHCungcapDAO;


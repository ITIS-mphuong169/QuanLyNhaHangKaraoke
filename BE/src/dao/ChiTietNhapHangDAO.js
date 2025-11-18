/**
 * DAO: ChiTietNhapHangDAO
 * Mô tả: Lớp Data Access Object cho thực thể ChiTietNhapHang
 */
const ChiTietNhapHang = require('../entities/ChiTietNhapHang');

class ChiTietNhapHangDAO {
  constructor(db) {
    this.db = db;
  }

  async getByNhapHang({ maNhapHang }) {
    const query = 'SELECT * FROM ChiTietNhapHang WHERE maNhapHang = ? ORDER BY maChiTiet';
    const result = await this.db.query(query, [maNhapHang]);
    return result.rows.map(row => new ChiTietNhapHang(row));
  }

  async create({ chiTiet }) {
    const query = `
      INSERT INTO ChiTietNhapHang (maNhapHang, maMatHang, tenMatHang, soLuong, donGia, thanhTien, ngayTao)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      chiTiet.maNhapHang,
      chiTiet.maMatHang,
      chiTiet.tenMatHang,
      chiTiet.soLuong,
      chiTiet.donGia,
      chiTiet.thanhTien,
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM ChiTietNhapHang WHERE maChiTiet = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new ChiTietNhapHang(result.rows[0]);
  }

  async deleteByNhapHang({ maNhapHang }) {
    const query = 'DELETE FROM ChiTietNhapHang WHERE maNhapHang = ?';
    await this.db.query(query, [maNhapHang]);
  }
}

module.exports = ChiTietNhapHangDAO;


/**
 * DAO: ChiTietHoaDonDAO
 * Mô tả: Lớp Data Access Object cho thực thể ChiTietHoaDon
 */
const ChiTietHoaDon = require('../entities/ChiTietHoaDon');

class ChiTietHoaDonDAO {
  constructor(db) {
    this.db = db;
  }

  async getByHoaDon(maHoaDon) {
    const query = 'SELECT * FROM ChiTietHoaDon WHERE maHoaDon = ? ORDER BY maChiTiet';
    const result = await this.db.query(query, [maHoaDon]);
    return result.rows.map(row => new ChiTietHoaDon(row));
  }

  async create(chiTiet) {
    const query = `
      INSERT INTO ChiTietHoaDon (maHoaDon, maMatHang, tenMatHang, soLuong, donGia, thanhTien, ngayTao)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      chiTiet.maHoaDon,
      chiTiet.maMatHang,
      chiTiet.tenMatHang,
      chiTiet.soLuong,
      chiTiet.donGia,
      chiTiet.thanhTien,
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM ChiTietHoaDon WHERE maChiTiet = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new ChiTietHoaDon(result.rows[0]);
  }

  async deleteByHoaDon(maHoaDon) {
    const query = 'DELETE FROM ChiTietHoaDon WHERE maHoaDon = ?';
    await this.db.query(query, [maHoaDon]);
  }
}

module.exports = ChiTietHoaDonDAO;


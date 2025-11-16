/**
 * DAO: HoaDonDAO
 * Mô tả: Lớp Data Access Object cho thực thể HoaDon
 */
const HoaDon = require('../entities/HoaDon');

class HoaDonDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM HoaDon ORDER BY ngayLap DESC';
    const result = await this.db.query(query);
    return result.rows.map(row => new HoaDon(row));
  }

  async getById(maHoaDon) {
    const query = 'SELECT * FROM HoaDon WHERE maHoaDon = ?';
    const result = await this.db.query(query, [maHoaDon]);
    if (result.rows.length === 0) return null;
    return new HoaDon(result.rows[0]);
  }

  async getByDateRange(startDate, endDate) {
    const query = `
      SELECT * FROM HoaDon 
      WHERE ngayLap >= ? AND ngayLap <= ?
      ORDER BY ngayLap DESC
    `;
    const result = await this.db.query(query, [startDate, endDate]);
    return result.rows.map(row => new HoaDon(row));
  }

  async create(hoaDon) {
    const query = `
      INSERT INTO HoaDon (maDatPhong, maKhachHang, maNhanVien, ngayLap, tongTien, 
                          tienPhong, tienMatHang, giamGia, thueVAT, thanhTien,
                          phuongThucThanhToan, trangThai, ghiChu, ngayTao, ngayCapNhat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      hoaDon.maDatPhong,
      hoaDon.maKhachHang,
      hoaDon.maNhanVien,
      hoaDon.ngayLap,
      hoaDon.tongTien,
      hoaDon.tienPhong,
      hoaDon.tienMatHang,
      hoaDon.giamGia,
      hoaDon.thueVAT,
      hoaDon.thanhTien,
      hoaDon.phuongThucThanhToan,
      hoaDon.trangThai,
      hoaDon.ghiChu,
      new Date(),
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM HoaDon WHERE maHoaDon = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new HoaDon(result.rows[0]);
  }

  async updateTrangThai(maHoaDon, trangThai) {
    const query = `
      UPDATE HoaDon 
      SET trangThai = ?, ngayCapNhat = ?
      WHERE maHoaDon = ?
    `;
    await this.db.query(query, [trangThai, new Date(), maHoaDon]);
    const selectQuery = 'SELECT * FROM HoaDon WHERE maHoaDon = ?';
    const result = await this.db.query(selectQuery, [maHoaDon]);
    if (result.rows.length === 0) return null;
    return new HoaDon(result.rows[0]);
  }
}

module.exports = HoaDonDAO;


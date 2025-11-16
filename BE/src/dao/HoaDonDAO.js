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
    const query = 'SELECT * FROM HoaDon WHERE maHoaDon = $1';
    const result = await this.db.query(query, [maHoaDon]);
    if (result.rows.length === 0) return null;
    return new HoaDon(result.rows[0]);
  }

  async getByDateRange(startDate, endDate) {
    const query = `
      SELECT * FROM HoaDon 
      WHERE ngayLap >= $1 AND ngayLap <= $2
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
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
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
    const result = await this.db.query(query, values);
    return new HoaDon(result.rows[0]);
  }

  async updateTrangThai(maHoaDon, trangThai) {
    const query = `
      UPDATE HoaDon 
      SET trangThai = $1, ngayCapNhat = $2
      WHERE maHoaDon = $3
      RETURNING *
    `;
    const result = await this.db.query(query, [trangThai, new Date(), maHoaDon]);
    if (result.rows.length === 0) return null;
    return new HoaDon(result.rows[0]);
  }
}

module.exports = HoaDonDAO;


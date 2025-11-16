/**
 * DAO: PhieuDatDAO
 * Mô tả: Lớp Data Access Object cho thực thể PhieuDat
 */
const PhieuDat = require('../entities/PhieuDat');

class PhieuDatDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM PhieuDat ORDER BY ngayDat DESC';
    const result = await this.db.query(query);
    return result.rows.map(row => new PhieuDat(row));
  }

  async getById(maPhieuDat) {
    const query = 'SELECT * FROM PhieuDat WHERE maPhieuDat = ?';
    const result = await this.db.query(query, [maPhieuDat]);
    if (result.rows.length === 0) return null;
    return new PhieuDat(result.rows[0]);
  }

  async getByTrangThai(trangThai) {
    const query = 'SELECT * FROM PhieuDat WHERE trangThai = ? ORDER BY ngayDat DESC';
    const result = await this.db.query(query, [trangThai]);
    return result.rows.map(row => new PhieuDat(row));
  }

  async getByDateRange(startDate, endDate) {
    const query = `
      SELECT * FROM PhieuDat 
      WHERE ngayDat >= ? AND ngayDat <= ?
      ORDER BY ngayDat DESC
    `;
    const result = await this.db.query(query, [startDate, endDate]);
    return result.rows.map(row => new PhieuDat(row));
  }

  async create(phieuDat) {
    const query = `
      INSERT INTO PhieuDat (maKhachHang, maNhanVien, ngayDat, tongTien, tienPhong, 
                           tienMatHang, giamGia, phuongThucThanhToan, trangThai, ghiChu, ngayTao, ngayCapNhat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      phieuDat.maKhachHang,
      phieuDat.maNhanVien,
      phieuDat.ngayDat,
      phieuDat.tongTien || 0,
      phieuDat.tienPhong || 0,
      phieuDat.tienMatHang || 0,
      phieuDat.giamGia || 0,
      phieuDat.phuongThucThanhToan,
      phieuDat.trangThai || 'DA_DAT',
      phieuDat.ghiChu || null,
      new Date(),
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM PhieuDat WHERE maPhieuDat = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new PhieuDat(result.rows[0]);
  }

  async update(maPhieuDat, phieuDat) {
    const query = `
      UPDATE PhieuDat 
      SET maKhachHang = ?, maNhanVien = ?, ngayDat = ?,
          tongTien = ?, tienPhong = ?, tienMatHang = ?, giamGia = ?,
          phuongThucThanhToan = ?, trangThai = ?, ghiChu = ?, ngayCapNhat = ?
      WHERE maPhieuDat = ?
    `;
    const values = [
      phieuDat.maKhachHang,
      phieuDat.maNhanVien,
      phieuDat.ngayDat,
      phieuDat.tongTien,
      phieuDat.tienPhong,
      phieuDat.tienMatHang,
      phieuDat.giamGia,
      phieuDat.phuongThucThanhToan,
      phieuDat.trangThai,
      phieuDat.ghiChu || null,
      new Date(),
      maPhieuDat
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM PhieuDat WHERE maPhieuDat = ?';
    const result = await this.db.query(selectQuery, [maPhieuDat]);
    if (result.rows.length === 0) return null;
    return new PhieuDat(result.rows[0]);
  }

  async updateTrangThai(maPhieuDat, trangThai) {
    const query = `
      UPDATE PhieuDat 
      SET trangThai = ?, ngayCapNhat = ?
      WHERE maPhieuDat = ?
    `;
    await this.db.query(query, [trangThai, new Date(), maPhieuDat]);
    const selectQuery = 'SELECT * FROM PhieuDat WHERE maPhieuDat = ?';
    const result = await this.db.query(selectQuery, [maPhieuDat]);
    if (result.rows.length === 0) return null;
    return new PhieuDat(result.rows[0]);
  }

  async delete(maPhieuDat) {
    const selectQuery = 'SELECT * FROM PhieuDat WHERE maPhieuDat = ?';
    const selectResult = await this.db.query(selectQuery, [maPhieuDat]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM PhieuDat WHERE maPhieuDat = ?';
    await this.db.query(query, [maPhieuDat]);
    return new PhieuDat(selectResult.rows[0]);
  }
}

module.exports = PhieuDatDAO;


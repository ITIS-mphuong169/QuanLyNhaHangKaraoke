/**
 * DAO: DatPhongDAO
 * Mô tả: Lớp Data Access Object cho thực thể DatPhong
 */
const DatPhong = require('../entities/DatPhong');

class DatPhongDAO {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM DatPhong ORDER BY ngayDat DESC';
    const result = await this.db.query(query);
    return result.rows.map(row => new DatPhong(row));
  }

  async getById(maDatPhong) {
    const query = 'SELECT * FROM DatPhong WHERE maDatPhong = ?';
    const result = await this.db.query(query, [maDatPhong]);
    if (result.rows.length === 0) return null;
    return new DatPhong(result.rows[0]);
  }

  async getByPhong(maPhong) {
    const query = 'SELECT * FROM DatPhong WHERE maPhong = ? ORDER BY ngayDat DESC';
    const result = await this.db.query(query, [maPhong]);
    return result.rows.map(row => new DatPhong(row));
  }

  async getByTrangThai(trangThai) {
    const query = 'SELECT * FROM DatPhong WHERE trangThai = ? ORDER BY ngayDat DESC';
    const result = await this.db.query(query, [trangThai]);
    return result.rows.map(row => new DatPhong(row));
  }

  async getByDateRange(startDate, endDate) {
    const query = `
      SELECT * FROM DatPhong 
      WHERE ngayDat >= ? AND ngayDat <= ?
      ORDER BY ngayDat DESC
    `;
    const result = await this.db.query(query, [startDate, endDate]);
    return result.rows.map(row => new DatPhong(row));
  }

  async create(datPhong) {
    const query = `
      INSERT INTO DatPhong (maPhong, maKhachHang, maNhanVien, ngayDat, gioBatDau, gioKetThuc, 
                           soGio, tongTien, tienPhong, tienMatHang, giamGia, 
                           phuongThucThanhToan, trangThai, ghiChu, ngayTao, ngayCapNhat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      datPhong.maPhong,
      datPhong.maKhachHang,
      datPhong.maNhanVien,
      datPhong.ngayDat,
      datPhong.gioBatDau,
      datPhong.gioKetThuc,
      datPhong.soGio,
      datPhong.tongTien,
      datPhong.tienPhong,
      datPhong.tienMatHang,
      datPhong.giamGia,
      datPhong.phuongThucThanhToan,
      datPhong.trangThai,
      datPhong.ghiChu,
      new Date(),
      new Date()
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM DatPhong WHERE maDatPhong = LAST_INSERT_ID()';
    const result = await this.db.query(selectQuery);
    return new DatPhong(result.rows[0]);
  }

  async update(maDatPhong, datPhong) {
    const query = `
      UPDATE DatPhong 
      SET maPhong = ?, maKhachHang = ?, maNhanVien = ?, ngayDat = ?,
          gioBatDau = ?, gioKetThuc = ?, soGio = ?, tongTien = ?,
          tienPhong = ?, tienMatHang = ?, giamGia = ?,
          phuongThucThanhToan = ?, trangThai = ?, ghiChu = ?, ngayCapNhat = ?
      WHERE maDatPhong = ?
    `;
    const values = [
      datPhong.maPhong,
      datPhong.maKhachHang,
      datPhong.maNhanVien,
      datPhong.ngayDat,
      datPhong.gioBatDau,
      datPhong.gioKetThuc,
      datPhong.soGio,
      datPhong.tongTien,
      datPhong.tienPhong,
      datPhong.tienMatHang,
      datPhong.giamGia,
      datPhong.phuongThucThanhToan,
      datPhong.trangThai,
      datPhong.ghiChu,
      new Date(),
      maDatPhong
    ];
    await this.db.query(query, values);
    const selectQuery = 'SELECT * FROM DatPhong WHERE maDatPhong = ?';
    const result = await this.db.query(selectQuery, [maDatPhong]);
    if (result.rows.length === 0) return null;
    return new DatPhong(result.rows[0]);
  }

  async updateTrangThai(maDatPhong, trangThai) {
    const query = `
      UPDATE DatPhong 
      SET trangThai = ?, ngayCapNhat = ?
      WHERE maDatPhong = ?
    `;
    await this.db.query(query, [trangThai, new Date(), maDatPhong]);
    const selectQuery = 'SELECT * FROM DatPhong WHERE maDatPhong = ?';
    const result = await this.db.query(selectQuery, [maDatPhong]);
    if (result.rows.length === 0) return null;
    return new DatPhong(result.rows[0]);
  }

  async delete(maDatPhong) {
    const selectQuery = 'SELECT * FROM DatPhong WHERE maDatPhong = ?';
    const selectResult = await this.db.query(selectQuery, [maDatPhong]);
    if (selectResult.rows.length === 0) return null;
    const query = 'DELETE FROM DatPhong WHERE maDatPhong = ?';
    await this.db.query(query, [maDatPhong]);
    return new DatPhong(selectResult.rows[0]);
  }
}

module.exports = DatPhongDAO;


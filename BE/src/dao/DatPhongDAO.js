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
    const query = 'SELECT * FROM DatPhong WHERE maDatPhong = $1';
    const result = await this.db.query(query, [maDatPhong]);
    if (result.rows.length === 0) return null;
    return new DatPhong(result.rows[0]);
  }

  async getByPhong(maPhong) {
    const query = 'SELECT * FROM DatPhong WHERE maPhong = $1 ORDER BY ngayDat DESC';
    const result = await this.db.query(query, [maPhong]);
    return result.rows.map(row => new DatPhong(row));
  }

  async getByTrangThai(trangThai) {
    const query = 'SELECT * FROM DatPhong WHERE trangThai = $1 ORDER BY ngayDat DESC';
    const result = await this.db.query(query, [trangThai]);
    return result.rows.map(row => new DatPhong(row));
  }

  async getByDateRange(startDate, endDate) {
    const query = `
      SELECT * FROM DatPhong 
      WHERE ngayDat >= $1 AND ngayDat <= $2
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
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
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
    const result = await this.db.query(query, values);
    return new DatPhong(result.rows[0]);
  }

  async update(maDatPhong, datPhong) {
    const query = `
      UPDATE DatPhong 
      SET maPhong = $1, maKhachHang = $2, maNhanVien = $3, ngayDat = $4,
          gioBatDau = $5, gioKetThuc = $6, soGio = $7, tongTien = $8,
          tienPhong = $9, tienMatHang = $10, giamGia = $11,
          phuongThucThanhToan = $12, trangThai = $13, ghiChu = $14, ngayCapNhat = $15
      WHERE maDatPhong = $16
      RETURNING *
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
    const result = await this.db.query(query, values);
    if (result.rows.length === 0) return null;
    return new DatPhong(result.rows[0]);
  }

  async updateTrangThai(maDatPhong, trangThai) {
    const query = `
      UPDATE DatPhong 
      SET trangThai = $1, ngayCapNhat = $2
      WHERE maDatPhong = $3
      RETURNING *
    `;
    const result = await this.db.query(query, [trangThai, new Date(), maDatPhong]);
    if (result.rows.length === 0) return null;
    return new DatPhong(result.rows[0]);
  }

  async delete(maDatPhong) {
    const query = 'DELETE FROM DatPhong WHERE maDatPhong = $1 RETURNING *';
    const result = await this.db.query(query, [maDatPhong]);
    if (result.rows.length === 0) return null;
    return new DatPhong(result.rows[0]);
  }
}

module.exports = DatPhongDAO;


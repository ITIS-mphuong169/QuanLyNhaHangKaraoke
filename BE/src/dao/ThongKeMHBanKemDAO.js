/**
 * DAO: ThongKeMHBanKemDAO
 * Mô tả: Lớp Data Access Object cho thống kê mặt hàng bán kèm
 */
const ThongkechitietMH = require('../entities/ThongkechitietMH');

class ThongKeMHBanKemDAO {
  constructor(db) {
    this.db = db;
  }

  async getThongKeByDateRange(startDate, endDate) {
    const query = `
      SELECT 
        mh.maMatHang,
        mh.tenMatHang,
        COALESCE(SUM(ct.soLuong), 0) as soLuongBan,
        COALESCE(SUM(ct.thanhTien), 0) as doanhThu,
        COALESCE(SUM((ct.donGia - mh.giaNhap) * ct.soLuong), 0) as loiNhuan
      FROM MatHang mh
      LEFT JOIN ChiTietHoaDon ct ON mh.maMatHang = ct.maMatHang
      LEFT JOIN HoaDon hd ON ct.maHoaDon = hd.maHoaDon
      WHERE hd.ngayLap >= $1 AND hd.ngayLap <= $2
      GROUP BY mh.maMatHang, mh.tenMatHang
      ORDER BY doanhThu DESC
    `;
    const result = await this.db.query(query, [startDate, endDate]);
    return result.rows.map(row => new ThongkechitietMH({
      maMatHang: row.maMatHang,
      tenMatHang: row.tenMatHang,
      soLuongBan: parseInt(row.soLuongban),
      doanhThu: parseFloat(row.doanhthu),
      loiNhuan: parseFloat(row.loinhuan),
      ngayThongKe: startDate
    }));
  }

  async getThongKeByMatHang(maMatHang, startDate, endDate) {
    const query = `
      SELECT 
        mh.maMatHang,
        mh.tenMatHang,
        COALESCE(SUM(ct.soLuong), 0) as soLuongBan,
        COALESCE(SUM(ct.thanhTien), 0) as doanhThu,
        COALESCE(SUM((ct.donGia - mh.giaNhap) * ct.soLuong), 0) as loiNhuan,
        hd.ngayLap as ngayThongKe
      FROM MatHang mh
      LEFT JOIN ChiTietHoaDon ct ON mh.maMatHang = ct.maMatHang
      LEFT JOIN HoaDon hd ON ct.maHoaDon = hd.maHoaDon
      WHERE mh.maMatHang = $1 
        AND hd.ngayLap >= $2 
        AND hd.ngayLap <= $3
      GROUP BY mh.maMatHang, mh.tenMatHang, hd.ngayLap
      ORDER BY hd.ngayLap DESC
    `;
    const result = await this.db.query(query, [maMatHang, startDate, endDate]);
    return result.rows.map(row => new ThongkechitietMH({
      maMatHang: row.maMatHang,
      tenMatHang: row.tenMatHang,
      soLuongBan: parseInt(row.soLuongBan),
      doanhThu: parseFloat(row.doanhThu),
      loiNhuan: parseFloat(row.loiNhuan),
      ngayThongKe: row.ngayThongKe
    }));
  }

  async getThongKeTongHop() {
    const query = `
      SELECT 
        mh.maMatHang,
        mh.tenMatHang,
        mh.danhMuc,
        COALESCE(SUM(ct.soLuong), 0) as soLuongBan,
        COALESCE(SUM(ct.thanhTien), 0) as doanhThu,
        COALESCE(SUM((ct.donGia - mh.giaNhap) * ct.soLuong), 0) as loiNhuan
      FROM MatHang mh
      LEFT JOIN ChiTietHoaDon ct ON mh.maMatHang = ct.maMatHang
      LEFT JOIN HoaDon hd ON ct.maHoaDon = hd.maHoaDon
      WHERE hd.trangThai = 'DA_THANH_TOAN'
      GROUP BY mh.maMatHang, mh.tenMatHang, mh.danhMuc
      ORDER BY doanhThu DESC
    `;
    const result = await this.db.query(query);
    return result.rows.map(row => new ThongkechitietMH({
      maMatHang: row.maMatHang,
      tenMatHang: row.tenMatHang,
      soLuongBan: parseInt(row.soLuongBan),
      doanhThu: parseFloat(row.doanhThu),
      loiNhuan: parseFloat(row.loiNhuan)
    }));
  }
}

module.exports = ThongKeMHBanKemDAO;


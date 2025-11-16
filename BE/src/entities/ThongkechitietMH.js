/**
 * Entity: ThongkechitietMH (Item Statistics Detail)
 * Mô tả: Thực thể đại diện cho thống kê chi tiết mặt hàng
 */
class ThongkechitietMH {
  constructor(data = {}) {
    this.maThongKe = data.maThongKe || null;
    this.maMatHang = data.maMatHang || null;
    this.tenMatHang = data.tenMatHang || '';
    this.ngayThongKe = data.ngayThongKe || new Date();
    this.soLuongBan = data.soLuongBan || 0;
    this.doanhThu = data.doanhThu || 0;
    this.loiNhuan = data.loiNhuan || 0;
    this.ngayTao = data.ngayTao || new Date();
  }

  toJSON() {
    return {
      maThongKe: this.maThongKe,
      maMatHang: this.maMatHang,
      tenMatHang: this.tenMatHang,
      ngayThongKe: this.ngayThongKe,
      soLuongBan: this.soLuongBan,
      doanhThu: this.doanhThu,
      loiNhuan: this.loiNhuan,
      ngayTao: this.ngayTao
    };
  }
}

module.exports = ThongkechitietMH;


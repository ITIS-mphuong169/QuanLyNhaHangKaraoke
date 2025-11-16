/**
 * Entity: Phongdat (Booked Room)
 * Mô tả: Thực thể đại diện cho phòng đã được đặt trong phiếu đặt
 */
class Phongdat {
  constructor(data = {}) {
    this.maPhongDat = data.maPhongDat || null;
    this.maPhieuDat = data.maPhieuDat || null;
    this.maPhong = data.maPhong || null;
    this.gioBatDau = data.gioBatDau || null;
    this.gioKetThuc = data.gioKetThuc || null;
    this.soGio = data.soGio || 0;
    this.giaGio = data.giaGio || 0;
    this.thanhTien = data.thanhTien || 0;
    this.ngayTao = data.ngayTao || new Date();
  }

  toJSON() {
    return {
      maPhongDat: this.maPhongDat,
      maPhieuDat: this.maPhieuDat,
      maPhong: this.maPhong,
      gioBatDau: this.gioBatDau,
      gioKetThuc: this.gioKetThuc,
      soGio: this.soGio,
      giaGio: this.giaGio,
      thanhTien: this.thanhTien,
      ngayTao: this.ngayTao
    };
  }
}

module.exports = Phongdat;


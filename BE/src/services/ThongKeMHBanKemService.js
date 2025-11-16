/**
 * Service: ThongKeMHBanKemService
 * Mô tả: Lớp Service xử lý business logic cho thống kê mặt hàng bán kèm
 */
const ThongKeMHBanKemDAO = require('../dao/ThongKeMHBanKemDAO');

class ThongKeMHBanKemService {
  constructor(db) {
    this.thongKeDAO = new ThongKeMHBanKemDAO(db);
  }

  async getThongKeByDateRange(startDate, endDate) {
    try {
      if (!startDate || !endDate) {
        throw new Error('Vui lòng chọn khoảng thời gian');
      }
      return await this.thongKeDAO.getThongKeByDateRange(startDate, endDate);
    } catch (error) {
      throw new Error(`Lỗi khi lấy thống kê theo khoảng thời gian: ${error.message}`);
    }
  }

  async getThongKeByMatHang(maMatHang, startDate, endDate) {
    try {
      if (!maMatHang) {
        throw new Error('Vui lòng chọn mặt hàng');
      }
      return await this.thongKeDAO.getThongKeByMatHang(maMatHang, startDate, endDate);
    } catch (error) {
      throw new Error(`Lỗi khi lấy thống kê theo mặt hàng: ${error.message}`);
    }
  }

  async getThongKeTongHop() {
    try {
      return await this.thongKeDAO.getThongKeTongHop();
    } catch (error) {
      throw new Error(`Lỗi khi lấy thống kê tổng hợp: ${error.message}`);
    }
  }
}

module.exports = ThongKeMHBanKemService;


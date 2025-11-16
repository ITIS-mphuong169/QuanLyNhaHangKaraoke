/**
 * Controller: ThongKeMHBanKemController
 * Mô tả: Controller xử lý các request liên quan đến thống kê mặt hàng bán kèm
 */
const ThongKeMHBanKemService = require('../services/ThongKeMHBanKemService');

class ThongKeMHBanKemController {
  constructor(db) {
    this.thongKeService = new ThongKeMHBanKemService(db);
  }

  async getThongKeByDateRange(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const results = await this.thongKeService.getThongKeByDateRange(startDate, endDate);
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getThongKeByMatHang(req, res) {
    try {
      const { maMatHang } = req.params;
      const { startDate, endDate } = req.query;
      const results = await this.thongKeService.getThongKeByMatHang(maMatHang, startDate, endDate);
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getThongKeTongHop(req, res) {
    try {
      const results = await this.thongKeService.getThongKeTongHop();
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = ThongKeMHBanKemController;


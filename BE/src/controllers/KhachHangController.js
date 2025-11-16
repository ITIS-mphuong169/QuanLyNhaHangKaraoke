/**
 * Controller: KhachHangController
 * Mô tả: Controller xử lý các request liên quan đến KhachHang
 */
const KhachHangService = require('../services/KhachHangService');

class KhachHangController {
  constructor(db) {
    this.khachHangService = new KhachHangService(db);
  }

  async getAllKhachHang(req, res) {
    try {
      const khachHangList = await this.khachHangService.getAllKhachHang();
      res.json({ success: true, data: khachHangList });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getKhachHangById(req, res) {
    try {
      const { id } = req.params;
      const khachHang = await this.khachHangService.getKhachHangById(id);
      res.json({ success: true, data: khachHang });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async searchKhachHang(req, res) {
    try {
      const { keyword } = req.query;
      const results = await this.khachHangService.searchKhachHang(keyword);
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createKhachHang(req, res) {
    try {
      const khachHang = await this.khachHangService.createKhachHang(req.body);
      res.status(201).json({ success: true, data: khachHang });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateKhachHang(req, res) {
    try {
      const { id } = req.params;
      const khachHang = await this.khachHangService.updateKhachHang(id, req.body);
      res.json({ success: true, data: khachHang });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteKhachHang(req, res) {
    try {
      const { id } = req.params;
      await this.khachHangService.deleteKhachHang(id);
      res.json({ success: true, message: 'Xóa khách hàng thành công' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = KhachHangController;


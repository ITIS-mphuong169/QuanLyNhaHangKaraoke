/**
 * Controller: MatHangController
 * Mô tả: Controller xử lý các request liên quan đến MatHang
 */
const MatHangService = require('../services/MatHangService');

class MatHangController {
  constructor(db) {
    this.matHangService = new MatHangService(db);
  }

  async getAllMatHang(req, res) {
    try {
      const matHangList = await this.matHangService.getAllMatHang();
      res.json({ success: true, data: matHangList });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getMatHangById(req, res) {
    try {
      const { id } = req.params;
      const matHang = await this.matHangService.getMatHangById(id);
      res.json({ success: true, data: matHang });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getMatHangByNhaCungCap(req, res) {
    try {
      const { maNhaCungCap } = req.params;
      const matHangList = await this.matHangService.getMatHangByNhaCungCap(maNhaCungCap);
      res.json({ success: true, data: matHangList });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createMatHang(req, res) {
    try {
      const matHang = await this.matHangService.createMatHang(req.body);
      res.status(201).json({ success: true, data: matHang });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateMatHang(req, res) {
    try {
      const { id } = req.params;
      const matHang = await this.matHangService.updateMatHang(id, req.body);
      res.json({ success: true, data: matHang });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteMatHang(req, res) {
    try {
      const { id } = req.params;
      await this.matHangService.deleteMatHang(id);
      res.json({ success: true, message: 'Xóa mặt hàng thành công' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = MatHangController;


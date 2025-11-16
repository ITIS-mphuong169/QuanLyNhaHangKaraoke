/**
 * Controller: NhaCungCapController
 * Mô tả: Controller xử lý các request liên quan đến NhaCungCap
 */
const NhaCungCapService = require('../services/NhaCungCapService');

class NhaCungCapController {
  constructor(db) {
    this.nhaCungCapService = new NhaCungCapService(db);
  }

  async getAllNhaCungCap(req, res) {
    try {
      const nccList = await this.nhaCungCapService.getAllNhaCungCap();
      res.json({ success: true, data: nccList });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getNhaCungCapById(req, res) {
    try {
      const { id } = req.params;
      const ncc = await this.nhaCungCapService.getNhaCungCapById(id);
      res.json({ success: true, data: ncc });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async createNhaCungCap(req, res) {
    try {
      const ncc = await this.nhaCungCapService.createNhaCungCap(req.body);
      res.status(201).json({ success: true, data: ncc });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateNhaCungCap(req, res) {
    try {
      const { id } = req.params;
      const ncc = await this.nhaCungCapService.updateNhaCungCap(id, req.body);
      res.json({ success: true, data: ncc });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteNhaCungCap(req, res) {
    try {
      const { id } = req.params;
      await this.nhaCungCapService.deleteNhaCungCap(id);
      res.json({ success: true, message: 'Xóa nhà cung cấp thành công' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = NhaCungCapController;


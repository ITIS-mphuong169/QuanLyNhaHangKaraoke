/**
 * Controller: NhapHangController
 * Mô tả: Controller xử lý các request liên quan đến NhapHang
 */
const NhapHangService = require('../services/NhapHangService');

class NhapHangController {
  constructor(db) {
    this.nhapHangService = new NhapHangService(db);
  }

  async getAllNhapHang(req, res) {
    try {
      const nhapHangList = await this.nhapHangService.getAllNhapHang();
      res.json({ success: true, data: nhapHangList });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getNhapHangById(req, res) {
    try {
      const { id } = req.params;
      const nhapHang = await this.nhapHangService.getNhapHangById({ maNhapHang: id });
      res.json({ success: true, data: nhapHang });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async createNhapHang(req, res) {
    try {
      const nhapHang = await this.nhapHangService.createNhapHang({ nhapHangData: req.body });
      res.status(201).json({ success: true, data: nhapHang });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteNhapHang(req, res) {
    try {
      const { id } = req.params;
      await this.nhapHangService.deleteNhapHang({ maNhapHang: id });
      res.json({ success: true, message: 'Xóa phiếu nhập thành công' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = NhapHangController;


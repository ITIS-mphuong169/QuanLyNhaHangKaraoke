/**
 * Controller: PhieuDatController
 * Mô tả: Controller xử lý các request liên quan đến PhieuDat
 */
const PhieuDatService = require('../services/PhieuDatService');

class PhieuDatController {
  constructor(db) {
    this.phieuDatService = new PhieuDatService(db);
  }

  async getAllPhieuDat(req, res) {
    try {
      const phieuDatList = await this.phieuDatService.getAllPhieuDat();
      res.json({ success: true, data: phieuDatList });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getPhieuDatById(req, res) {
    try {
      const { id } = req.params;
      const phieuDat = await this.phieuDatService.getPhieuDatById(id);
      res.json({ success: true, data: phieuDat });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getPhieuDatByTrangThai(req, res) {
    try {
      const { trangThai } = req.params;
      const phieuDatList = await this.phieuDatService.getPhieuDatByTrangThai(trangThai);
      res.json({ success: true, data: phieuDatList });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createPhieuDat(req, res) {
    try {
      const phieuDat = await this.phieuDatService.createPhieuDat(req.body);
      res.status(201).json({ success: true, data: phieuDat });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updatePhieuDat(req, res) {
    try {
      const { id } = req.params;
      const phieuDat = await this.phieuDatService.updatePhieuDat(id, req.body);
      res.json({ success: true, data: phieuDat });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async thanhToanPhieuDat(req, res) {
    try {
      const { id } = req.params;
      const phieuDat = await this.phieuDatService.thanhToanPhieuDat(id, req.body);
      res.json({ success: true, data: phieuDat });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deletePhieuDat(req, res) {
    try {
      const { id } = req.params;
      await this.phieuDatService.deletePhieuDat(id);
      res.json({ success: true, message: 'Xóa phiếu đặt thành công' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = PhieuDatController;


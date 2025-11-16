/**
 * Controller: DatPhongController
 * Mô tả: Controller xử lý các request liên quan đến DatPhong
 */
const DatPhongService = require('../services/DatPhongService');

class DatPhongController {
  constructor(db) {
    this.datPhongService = new DatPhongService(db);
  }

  async getAllDatPhong(req, res) {
    try {
      const datPhongList = await this.datPhongService.getAllDatPhong();
      res.json({ success: true, data: datPhongList });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getDatPhongById(req, res) {
    try {
      const { id } = req.params;
      const datPhong = await this.datPhongService.getDatPhongById(id);
      res.json({ success: true, data: datPhong });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async createDatPhong(req, res) {
    try {
      const datPhong = await this.datPhongService.createDatPhong(req.body);
      res.status(201).json({ success: true, data: datPhong });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateDatPhong(req, res) {
    try {
      const { id } = req.params;
      const datPhong = await this.datPhongService.updateDatPhong(id, req.body);
      res.json({ success: true, data: datPhong });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateTrangThai(req, res) {
    try {
      const { id } = req.params;
      const { trangThai } = req.body;
      const datPhong = await this.datPhongService.updateTrangThai(id, trangThai);
      res.json({ success: true, data: datPhong });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteDatPhong(req, res) {
    try {
      const { id } = req.params;
      await this.datPhongService.deleteDatPhong(id);
      res.json({ success: true, message: 'Xóa đặt phòng thành công' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = DatPhongController;


/**
 * Controller: PhongController
 * Mô tả: Controller xử lý các request liên quan đến Phong
 */
const PhongService = require('../services/PhongService');

class PhongController {
  constructor(db) {
    this.phongService = new PhongService(db);
  }

  // GET /api/phong
  async getAllPhong(req, res) {
    try {
      const phongList = await this.phongService.getAllPhong();
      res.json({ success: true, data: phongList });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /api/phong/:id
  async getPhongById(req, res) {
    try {
      const { id } = req.params;
      const phong = await this.phongService.getPhongById(id);
      res.json({ success: true, data: phong });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // GET /api/phong/trong
  async getPhongTrong(req, res) {
    try {
      const phongList = await this.phongService.getPhongTrong();
      res.json({ success: true, data: phongList });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /api/phong
  async createPhong(req, res) {
    try {
      const phong = await this.phongService.createPhong(req.body);
      res.status(201).json({ success: true, data: phong });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // PUT /api/phong/:id
  async updatePhong(req, res) {
    try {
      const { id } = req.params;
      const phong = await this.phongService.updatePhong(id, req.body);
      res.json({ success: true, data: phong });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // PATCH /api/phong/:id/trang-thai
  async updateTrangThai(req, res) {
    try {
      const { id } = req.params;
      const { trangThai } = req.body;
      const phong = await this.phongService.updateTrangThaiPhong(id, trangThai);
      res.json({ success: true, data: phong });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /api/phong/:id
  async deletePhong(req, res) {
    try {
      const { id } = req.params;
      await this.phongService.deletePhong(id);
      res.json({ success: true, message: 'Xóa phòng thành công' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = PhongController;


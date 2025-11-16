/**
 * Service: PhongService
 * Mô tả: Lớp Service xử lý business logic cho Phong
 */
const PhongDAO = require('../dao/PhongDAO');
const Phong = require('../entities/Phong');

class PhongService {
  constructor(db) {
    this.phongDAO = new PhongDAO(db);
  }

  async getAllPhong() {
    try {
      return await this.phongDAO.getAll();
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách phòng: ${error.message}`);
    }
  }

  async getPhongById(maPhong) {
    try {
      const phong = await this.phongDAO.getById(maPhong);
      if (!phong) {
        throw new Error('Không tìm thấy phòng');
      }
      return phong;
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin phòng: ${error.message}`);
    }
  }

  async getPhongTrong() {
    try {
      return await this.phongDAO.getByTrangThai('TRONG');
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách phòng trống: ${error.message}`);
    }
  }

  async createPhong(phongData) {
    try {
      // Validate dữ liệu
      if (!phongData.tenPhong || !phongData.loaiPhong || !phongData.giaGio) {
        throw new Error('Thông tin phòng không đầy đủ');
      }

      const phong = new Phong(phongData);
      phong.trangThai = phong.trangThai || 'TRONG';
      
      return await this.phongDAO.create(phong);
    } catch (error) {
      throw new Error(`Lỗi khi tạo phòng mới: ${error.message}`);
    }
  }

  async updatePhong(maPhong, phongData) {
    try {
      const phong = new Phong(phongData);
      return await this.phongDAO.update(maPhong, phong);
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật phòng: ${error.message}`);
    }
  }

  async updateTrangThaiPhong(maPhong, trangThai) {
    try {
      const validStatuses = ['TRONG', 'DANG_SU_DUNG', 'BAO_TRI'];
      if (!validStatuses.includes(trangThai)) {
        throw new Error('Trạng thái không hợp lệ');
      }
      return await this.phongDAO.updateTrangThai(maPhong, trangThai);
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật trạng thái phòng: ${error.message}`);
    }
  }

  async deletePhong(maPhong) {
    try {
      return await this.phongDAO.delete(maPhong);
    } catch (error) {
      throw new Error(`Lỗi khi xóa phòng: ${error.message}`);
    }
  }
}

module.exports = PhongService;


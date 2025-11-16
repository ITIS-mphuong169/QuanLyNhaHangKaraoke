/**
 * Service: MatHangService
 * Mô tả: Lớp Service xử lý business logic cho MatHang
 */
const MatHangDAO = require('../dao/MatHangDAO');
const MatHang = require('../entities/MatHang');

class MatHangService {
  constructor(db) {
    this.matHangDAO = new MatHangDAO(db);
  }

  async getAllMatHang() {
    try {
      return await this.matHangDAO.getAll();
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách mặt hàng: ${error.message}`);
    }
  }

  async getMatHangById(maMatHang) {
    try {
      const matHang = await this.matHangDAO.getById(maMatHang);
      if (!matHang) {
        throw new Error('Không tìm thấy mặt hàng');
      }
      return matHang;
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin mặt hàng: ${error.message}`);
    }
  }

  async getMatHangByDanhMuc(danhMuc) {
    try {
      return await this.matHangDAO.getByDanhMuc(danhMuc);
    } catch (error) {
      throw new Error(`Lỗi khi lấy mặt hàng theo danh mục: ${error.message}`);
    }
  }

  async searchMatHang(keyword) {
    try {
      return await this.matHangDAO.search(keyword);
    } catch (error) {
      throw new Error(`Lỗi khi tìm kiếm mặt hàng: ${error.message}`);
    }
  }

  async createMatHang(matHangData) {
    try {
      if (!matHangData.tenMatHang || !matHangData.danhMuc || !matHangData.giaBan) {
        throw new Error('Thông tin mặt hàng không đầy đủ');
      }

      const matHang = new MatHang(matHangData);
      matHang.trangThai = matHang.trangThai || 'CON_HANG';
      matHang.tonKho = matHang.tonKho || 0;

      return await this.matHangDAO.create(matHang);
    } catch (error) {
      throw new Error(`Lỗi khi tạo mặt hàng mới: ${error.message}`);
    }
  }

  async updateMatHang(maMatHang, matHangData) {
    try {
      const matHang = new MatHang(matHangData);
      return await this.matHangDAO.update(maMatHang, matHang);
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật mặt hàng: ${error.message}`);
    }
  }

  async deleteMatHang(maMatHang) {
    try {
      return await this.matHangDAO.delete(maMatHang);
    } catch (error) {
      throw new Error(`Lỗi khi xóa mặt hàng: ${error.message}`);
    }
  }

  async updateTonKho(maMatHang, soLuong) {
    try {
      return await this.matHangDAO.updateTonKho(maMatHang, soLuong);
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật tồn kho: ${error.message}`);
    }
  }
}

module.exports = MatHangService;


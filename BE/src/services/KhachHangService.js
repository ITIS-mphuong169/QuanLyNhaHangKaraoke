/**
 * Service: KhachHangService
 * Mô tả: Lớp Service xử lý business logic cho KhachHang
 */
const KhachHangDAO = require('../dao/KhachHangDAO');
const KhachHang = require('../entities/KhachHang');

class KhachHangService {
  constructor(db) {
    this.khachHangDAO = new KhachHangDAO(db);
  }

  async getAllKhachHang() {
    try {
      return await this.khachHangDAO.getAll();
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách khách hàng: ${error.message}`);
    }
  }

  async getKhachHangById(maKhachHang) {
    try {
      const khachHang = await this.khachHangDAO.getById(maKhachHang);
      if (!khachHang) {
        throw new Error('Không tìm thấy khách hàng');
      }
      return khachHang;
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin khách hàng: ${error.message}`);
    }
  }

  async searchKhachHang(keyword) {
    try {
      return await this.khachHangDAO.search(keyword);
    } catch (error) {
      throw new Error(`Lỗi khi tìm kiếm khách hàng: ${error.message}`);
    }
  }

  async createKhachHang(khachHangData) {
    try {
      if (!khachHangData.hoTen || !khachHangData.soDienThoai) {
        throw new Error('Thông tin khách hàng không đầy đủ');
      }

      // Kiểm tra số điện thoại đã tồn tại
      const existing = await this.khachHangDAO.getBySoDienThoai(khachHangData.soDienThoai);
      if (existing) {
        throw new Error('Số điện thoại đã được sử dụng');
      }

      const khachHang = new KhachHang(khachHangData);
      khachHang.loaiKhachHang = khachHang.loaiKhachHang || 'THUONG';
      khachHang.diemTichLuy = khachHang.diemTichLuy || 0;

      return await this.khachHangDAO.create(khachHang);
    } catch (error) {
      throw new Error(`Lỗi khi tạo khách hàng mới: ${error.message}`);
    }
  }

  async updateKhachHang(maKhachHang, khachHangData) {
    try {
      const khachHang = new KhachHang(khachHangData);
      return await this.khachHangDAO.update(maKhachHang, khachHang);
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật khách hàng: ${error.message}`);
    }
  }

  async deleteKhachHang(maKhachHang) {
    try {
      return await this.khachHangDAO.delete(maKhachHang);
    } catch (error) {
      throw new Error(`Lỗi khi xóa khách hàng: ${error.message}`);
    }
  }

  async updateDiemTichLuy(maKhachHang, diem) {
    try {
      return await this.khachHangDAO.updateDiemTichLuy(maKhachHang, diem);
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật điểm tích lũy: ${error.message}`);
    }
  }
}

module.exports = KhachHangService;


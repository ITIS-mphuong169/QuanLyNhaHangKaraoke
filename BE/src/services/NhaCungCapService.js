/**
 * Service: NhaCungCapService
 * Mô tả: Lớp Service xử lý business logic cho NhaCungCap
 */
const NhaCungCapDAO = require('../dao/NhaCungCapDAO');
const NhaCungCap = require('../entities/NhaCungCap');

class NhaCungCapService {
  constructor(db) {
    this.nhaCungCapDAO = new NhaCungCapDAO(db);
  }

  async getAllNhaCungCap() {
    try {
      return await this.nhaCungCapDAO.getAll();
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách nhà cung cấp: ${error.message}`);
    }
  }

  async getNhaCungCapById(maNhaCungCap) {
    try {
      const ncc = await this.nhaCungCapDAO.getById(maNhaCungCap);
      if (!ncc) {
        throw new Error('Không tìm thấy nhà cung cấp');
      }
      return ncc;
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin nhà cung cấp: ${error.message}`);
    }
  }

  async createNhaCungCap(nccData) {
    try {
      if (!nccData.tenNhaCungCap) {
        throw new Error('Tên nhà cung cấp không được để trống');
      }

      const ncc = new NhaCungCap(nccData);
      ncc.trangThai = ncc.trangThai || 'DANG_HOP_TAC';

      return await this.nhaCungCapDAO.create(ncc);
    } catch (error) {
      throw new Error(`Lỗi khi tạo nhà cung cấp mới: ${error.message}`);
    }
  }

  async updateNhaCungCap(maNhaCungCap, nccData) {
    try {
      const ncc = new NhaCungCap(nccData);
      return await this.nhaCungCapDAO.update(maNhaCungCap, ncc);
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật nhà cung cấp: ${error.message}`);
    }
  }

  async deleteNhaCungCap(maNhaCungCap) {
    try {
      return await this.nhaCungCapDAO.delete(maNhaCungCap);
    } catch (error) {
      throw new Error(`Lỗi khi xóa nhà cung cấp: ${error.message}`);
    }
  }
}

module.exports = NhaCungCapService;


/**
 * Service: NhapHangService
 * Mô tả: Lớp Service xử lý business logic cho NhapHang
 */
const NhapHangDAO = require('../dao/NhapHangDAO');
const ChiTietNhapHangDAO = require('../dao/ChiTietNhapHangDAO');
const MatHangDAO = require('../dao/MatHangDAO');
const NhapHang = require('../entities/NhapHang');
const ChiTietNhapHang = require('../entities/ChiTietNhapHang');

class NhapHangService {
  constructor(db) {
    this.nhapHangDAO = new NhapHangDAO(db);
    this.chiTietDAO = new ChiTietNhapHangDAO(db);
    this.matHangDAO = new MatHangDAO(db);
  }

  async getAllNhapHang() {
    try {
      return await this.nhapHangDAO.getAll();
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách phiếu nhập: ${error.message}`);
    }
  }

  async getNhapHangById(maNhapHang) {
    try {
      const nhapHang = await this.nhapHangDAO.getById(maNhapHang);
      if (!nhapHang) {
        throw new Error('Không tìm thấy phiếu nhập');
      }
      const chiTiet = await this.chiTietDAO.getByNhapHang(maNhapHang);
      return { ...nhapHang, chiTiet };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin phiếu nhập: ${error.message}`);
    }
  }

  async createNhapHang(nhapHangData) {
    try {
      if (!nhapHangData.maNhaCungCap || !nhapHangData.chiTiet || nhapHangData.chiTiet.length === 0) {
        throw new Error('Thông tin phiếu nhập không đầy đủ');
      }

      // Tính tổng tiền
      const tongTien = nhapHangData.chiTiet.reduce((sum, ct) => sum + ct.thanhTien, 0);

      const nhapHang = new NhapHang({
        ...nhapHangData,
        tongTien,
        trangThai: 'DA_NHAP'
      });

      const createdNhapHang = await this.nhapHangDAO.create(nhapHang);

      // Tạo chi tiết và cập nhật tồn kho
      for (const ct of nhapHangData.chiTiet) {
        const chiTiet = new ChiTietNhapHang({
          ...ct,
          maNhapHang: createdNhapHang.maNhapHang,
          thanhTien: ct.soLuong * ct.donGia
        });
        await this.chiTietDAO.create(chiTiet);

        // Cập nhật tồn kho mặt hàng
        if (ct.maMatHang) {
          await this.matHangDAO.updateTonKho(ct.maMatHang, ct.soLuong);
        }
      }

      return await this.getNhapHangById(createdNhapHang.maNhapHang);
    } catch (error) {
      throw new Error(`Lỗi khi tạo phiếu nhập: ${error.message}`);
    }
  }

  async deleteNhapHang(maNhapHang) {
    try {
      return await this.nhapHangDAO.delete(maNhapHang);
    } catch (error) {
      throw new Error(`Lỗi khi xóa phiếu nhập: ${error.message}`);
    }
  }
}

module.exports = NhapHangService;


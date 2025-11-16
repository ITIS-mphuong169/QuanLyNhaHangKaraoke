/**
 * Service: DatPhongService
 * Mô tả: Lớp Service xử lý business logic cho DatPhong
 */
const DatPhongDAO = require('../dao/DatPhongDAO');
const DatPhong = require('../entities/DatPhong');
const PhongDAO = require('../dao/PhongDAO');

class DatPhongService {
  constructor(db) {
    this.datPhongDAO = new DatPhongDAO(db);
    this.phongDAO = new PhongDAO(db);
  }

  async getAllDatPhong() {
    try {
      return await this.datPhongDAO.getAll();
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách đặt phòng: ${error.message}`);
    }
  }

  async getDatPhongById(maDatPhong) {
    try {
      const datPhong = await this.datPhongDAO.getById(maDatPhong);
      if (!datPhong) {
        throw new Error('Không tìm thấy đặt phòng');
      }
      return datPhong;
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin đặt phòng: ${error.message}`);
    }
  }

  async createDatPhong(datPhongData) {
    try {
      if (!datPhongData.maPhong || !datPhongData.ngayDat) {
        throw new Error('Thông tin đặt phòng không đầy đủ');
      }

      // Kiểm tra phòng có trống không
      const phong = await this.phongDAO.getById(datPhongData.maPhong);
      if (!phong) {
        throw new Error('Không tìm thấy phòng');
      }
      if (phong.trangThai !== 'TRONG') {
        throw new Error('Phòng không còn trống');
      }

      // Tính số giờ và tiền phòng
      if (datPhongData.gioBatDau && datPhongData.gioKetThuc) {
        const start = new Date(datPhongData.gioBatDau);
        const end = new Date(datPhongData.gioKetThuc);
        const hours = (end - start) / (1000 * 60 * 60);
        datPhongData.soGio = Math.ceil(hours);
        datPhongData.tienPhong = phong.giaGio * datPhongData.soGio;
      }

      const datPhong = new DatPhong(datPhongData);
      datPhong.trangThai = datPhong.trangThai || 'DA_DAT';
      datPhong.tongTien = (datPhong.tienPhong || 0) + (datPhong.tienMatHang || 0) - (datPhong.giamGia || 0);

      // Cập nhật trạng thái phòng
      await this.phongDAO.updateTrangThai(datPhongData.maPhong, 'DANG_SU_DUNG');

      return await this.datPhongDAO.create(datPhong);
    } catch (error) {
      throw new Error(`Lỗi khi tạo đặt phòng: ${error.message}`);
    }
  }

  async updateDatPhong(maDatPhong, datPhongData) {
    try {
      const datPhong = new DatPhong(datPhongData);
      datPhong.tongTien = (datPhong.tienPhong || 0) + (datPhong.tienMatHang || 0) - (datPhong.giamGia || 0);
      return await this.datPhongDAO.update(maDatPhong, datPhong);
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật đặt phòng: ${error.message}`);
    }
  }

  async updateTrangThai(maDatPhong, trangThai) {
    try {
      const datPhong = await this.datPhongDAO.getById(maDatPhong);
      if (!datPhong) {
        throw new Error('Không tìm thấy đặt phòng');
      }

      // Nếu hoàn thành, trả phòng về trạng thái trống
      if (trangThai === 'HOAN_THANH' && datPhong.maPhong) {
        await this.phongDAO.updateTrangThai(datPhong.maPhong, 'TRONG');
      }

      return await this.datPhongDAO.updateTrangThai(maDatPhong, trangThai);
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật trạng thái đặt phòng: ${error.message}`);
    }
  }

  async deleteDatPhong(maDatPhong) {
    try {
      const datPhong = await this.datPhongDAO.getById(maDatPhong);
      if (datPhong && datPhong.maPhong) {
        await this.phongDAO.updateTrangThai(datPhong.maPhong, 'TRONG');
      }
      return await this.datPhongDAO.delete(maDatPhong);
    } catch (error) {
      throw new Error(`Lỗi khi xóa đặt phòng: ${error.message}`);
    }
  }
}

module.exports = DatPhongService;


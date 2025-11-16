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

  validatePhongData(phongData, isUpdate = false) {
    const errors = [];

    // Validate tên phòng (bắt buộc)
    if (!isUpdate || phongData.tenPhong !== undefined) {
      if (!phongData.tenPhong || phongData.tenPhong.trim() === '') {
        errors.push('Tên phòng không được để trống');
      }
    }

    // Validate loại phòng (bắt buộc)
    if (!isUpdate || phongData.loaiPhong !== undefined) {
      if (!phongData.loaiPhong || phongData.loaiPhong.trim() === '') {
        errors.push('Loại phòng không được để trống');
      } else {
        const validLoaiPhong = ['VIP', 'Thường', 'Đặc biệt'];
        if (!validLoaiPhong.includes(phongData.loaiPhong)) {
          errors.push('Loại phòng không hợp lệ. Phải là: VIP, Thường hoặc Đặc biệt');
        }
      }
    }

    // Validate sức chứa (bắt buộc, phải là số nguyên dương)
    if (!isUpdate || phongData.sucChua !== undefined) {
      if (phongData.sucChua === undefined || phongData.sucChua === null || phongData.sucChua === '') {
        errors.push('Sức chứa không được để trống');
      } else {
        const sucChua = Number(phongData.sucChua);
        if (isNaN(sucChua) || !Number.isInteger(sucChua) || sucChua < 1) {
          errors.push('Sức chứa phải là số nguyên dương');
        }
      }
    }

    // Validate giá giờ (bắt buộc, phải là số không âm)
    if (!isUpdate || phongData.giaGio !== undefined) {
      if (phongData.giaGio === undefined || phongData.giaGio === null || phongData.giaGio === '') {
        errors.push('Giá theo giờ không được để trống');
      } else {
        const giaGio = Number(phongData.giaGio);
        if (isNaN(giaGio) || giaGio < 0) {
          errors.push('Giá theo giờ phải là số không âm');
        }
      }
    }

    // Validate trạng thái
    if (phongData.trangThai !== undefined) {
      const validTrangThai = ['TRONG', 'DANG_SU_DUNG', 'BAO_TRI'];
      if (!validTrangThai.includes(phongData.trangThai)) {
        errors.push('Trạng thái không hợp lệ. Phải là: TRONG, DANG_SU_DUNG hoặc BAO_TRI');
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join('. '));
    }
  }

  async createPhong(phongData) {
    try {
      // Validate dữ liệu
      this.validatePhongData(phongData, false);

      // Chuẩn hóa dữ liệu số
      const phong = new Phong({
        ...phongData,
        sucChua: parseInt(phongData.sucChua),
        giaGio: parseFloat(phongData.giaGio),
        trangThai: phongData.trangThai || 'TRONG',
        moTa: phongData.moTa || null
      });
      
      return await this.phongDAO.create(phong);
    } catch (error) {
      // Nếu là lỗi validation, throw trực tiếp
      if (error.message.includes('không được để trống') || 
          error.message.includes('không hợp lệ') ||
          error.message.includes('phải là số')) {
        throw error;
      }
      throw new Error(`Lỗi khi tạo phòng mới: ${error.message}`);
    }
  }

  async updatePhong(maPhong, phongData) {
    try {
      // Validate dữ liệu
      this.validatePhongData(phongData, true);

      // Kiểm tra phòng có tồn tại không
      const existingPhong = await this.phongDAO.getById(maPhong);
      if (!existingPhong) {
        throw new Error('Không tìm thấy phòng để cập nhật');
      }

      // Chuẩn hóa dữ liệu số - chỉ cập nhật các trường được gửi lên
      const updateData = { ...existingPhong.toJSON() };
      
      if (phongData.tenPhong !== undefined) {
        updateData.tenPhong = phongData.tenPhong;
      }
      
      if (phongData.loaiPhong !== undefined) {
        updateData.loaiPhong = phongData.loaiPhong;
      }
      
      if (phongData.sucChua !== undefined && phongData.sucChua !== null && phongData.sucChua !== '') {
        updateData.sucChua = parseInt(phongData.sucChua);
      }
      
      if (phongData.giaGio !== undefined && phongData.giaGio !== null && phongData.giaGio !== '') {
        updateData.giaGio = parseFloat(phongData.giaGio);
      }
      
      if (phongData.trangThai !== undefined) {
        updateData.trangThai = phongData.trangThai;
      }
      
      if (phongData.moTa !== undefined) {
        updateData.moTa = phongData.moTa || null;
      }

      updateData.maPhong = maPhong; // Đảm bảo không thay đổi mã

      const phong = new Phong(updateData);
      return await this.phongDAO.update(maPhong, phong);
    } catch (error) {
      // Nếu là lỗi validation, throw trực tiếp
      if (error.message.includes('không được để trống') || 
          error.message.includes('không hợp lệ') ||
          error.message.includes('phải là số') ||
          error.message.includes('Không tìm thấy phòng')) {
        throw error;
      }
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


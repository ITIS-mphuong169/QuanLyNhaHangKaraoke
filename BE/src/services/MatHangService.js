/**
 * Service: MatHangService
 * Mô tả: Lớp Service xử lý business logic cho MatHang
 */
const MatHangDAO = require('../dao/MatHangDAO');
const MHCungcapDAO = require('../dao/MHCungcapDAO');
const MatHang = require('../entities/MatHang');
const MatHangCungcap = require('../entities/MatHangCungcap');

class MatHangService {
  constructor(db) {
    this.matHangDAO = new MatHangDAO(db);
    this.mhCungcapDAO = new MHCungcapDAO(db);
  }

  /**
   * Validate dữ liệu mặt hàng
   * @param {Object} matHangData - Dữ liệu mặt hàng cần validate
   * @param {boolean} isUpdate - Có phải là cập nhật hay không
   * @throws {Error} Nếu dữ liệu không hợp lệ
   */
  validateMatHangData(matHangData, isUpdate = false) {
    const errors = [];

    // Validate nhà cung cấp (bắt buộc)
    if (!isUpdate || matHangData.maNhaCungCap !== undefined) {
      if (!matHangData.maNhaCungCap || matHangData.maNhaCungCap === null || matHangData.maNhaCungCap === '') {
        errors.push('Nhà cung cấp không được để trống');
      }
    }

    // Validate giá bán (bắt buộc, decimal)
    if (matHangData.giaBan !== undefined && matHangData.giaBan !== null && matHangData.giaBan !== '') {
      const giaBan = Number(matHangData.giaBan);
      if (isNaN(giaBan) || giaBan < 0) {
        errors.push('Giá bán phải là số không âm');
      }
      if ((!isUpdate || matHangData.giaBan !== undefined) && giaBan === 0) {
        errors.push('Giá bán không được bằng 0');
      }
    } else if (!isUpdate) {
      errors.push('Giá bán không được để trống');
    }

    // Validate tồn kho (có thể null, nhưng nếu có thì phải >= 0)
    if (matHangData.tonKho !== undefined && matHangData.tonKho !== null && matHangData.tonKho !== '') {
      const tonKho = Number(matHangData.tonKho);
      if (isNaN(tonKho) || !Number.isInteger(tonKho) || tonKho < 0) {
        errors.push('Tồn kho phải là số nguyên không âm');
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join('. '));
    }
  }

  /**
   * Validate dữ liệu mặt hàng cung cấp (thông tin chi tiết)
   * @param {Object} matHangCungcapData - Dữ liệu mặt hàng cung cấp
   * @throws {Error} Nếu dữ liệu không hợp lệ
   */
  validateMatHangCungcapData(matHangCungcapData) {
    const errors = [];

    if (!matHangCungcapData.tenMatHang || matHangCungcapData.tenMatHang.trim() === '') {
      errors.push('Tên mặt hàng không được để trống');
    }

    if (!matHangCungcapData.donViTinh || matHangCungcapData.donViTinh.trim() === '') {
      errors.push('Đơn vị tính không được để trống');
    }

    if (matHangCungcapData.giaNhap !== undefined && matHangCungcapData.giaNhap !== null && matHangCungcapData.giaNhap !== '') {
      const giaNhap = Number(matHangCungcapData.giaNhap);
      if (isNaN(giaNhap) || giaNhap < 0) {
        errors.push('Giá nhập phải là số không âm');
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join('. '));
    }
  }

  async getAllMatHang() {
    try {
      // Lấy mặt hàng kèm thông tin chi tiết từ MatHangCungcap
      return await this.matHangDAO.getAllWithDetails();
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách mặt hàng: ${error.message}`);
    }
  }

  async getMatHangById({ maMatHang }) {
    try {
      const matHang = await this.matHangDAO.getByIdWithDetails({ maMatHang });
      if (!matHang) {
        throw new Error('Không tìm thấy mặt hàng');
      }
      return matHang;
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin mặt hàng: ${error.message}`);
    }
  }

  async getMatHangByNhaCungCap({ maNhaCungCap }) {
    try {
      // Lấy danh sách mặt hàng cung cấp từ MatHangCungcap (có thông tin chi tiết)
      return await this.mhCungcapDAO.getByNhaCungCap({ maNhaCungCap });
    } catch (error) {
      throw new Error(`Lỗi khi lấy mặt hàng theo nhà cung cấp: ${error.message}`);
    }
  }

  async createMatHang({ matHangData }) {
    try {
      // Validate dữ liệu mặt hàng (giaBan, tonKho, maNhaCungCap)
      this.validateMatHangData(matHangData, false);

      // Validate dữ liệu mặt hàng cung cấp (tenMatHang, donViTinh, giaNhap, moTa)
      this.validateMatHangCungcapData(matHangData);

      // Chuẩn hóa dữ liệu số cho MatHang
      const matHangDataNormalized = {
        giaBan: parseFloat(matHangData.giaBan) || 0,
        tonKho: matHangData.tonKho !== undefined && matHangData.tonKho !== null && matHangData.tonKho !== '' 
          ? parseInt(matHangData.tonKho) 
          : 0,
        maNhaCungCap: parseInt(matHangData.maNhaCungCap)
      };

      // Tạo mặt hàng trong bảng MatHang
      const matHang = new MatHang(matHangDataNormalized);
      const createdMatHang = await this.matHangDAO.create({ matHang });

      // Tạo thông tin chi tiết trong bảng MatHangCungcap
      const matHangCungcapData = {
        maNhaCungCap: parseInt(matHangData.maNhaCungCap),
        maMatHang: createdMatHang.maMatHang,
        tenMatHang: matHangData.tenMatHang,
        giaNhap: matHangData.giaNhap !== undefined && matHangData.giaNhap !== null && matHangData.giaNhap !== '' 
          ? parseFloat(matHangData.giaNhap) 
          : 0,
        donViTinh: matHangData.donViTinh,
        moTa: matHangData.moTa || ''
      };

      const matHangCungcap = new MatHangCungcap(matHangCungcapData);
      await this.mhCungcapDAO.create({ matHangCungcap });

      // Trả về mặt hàng đã tạo kèm thông tin chi tiết
      return {
        ...createdMatHang.toJSON(),
        tenMatHang: matHangData.tenMatHang,
        donViTinh: matHangData.donViTinh,
        giaNhap: matHangCungcapData.giaNhap,
        moTa: matHangData.moTa || ''
      };
    } catch (error) {
      // Nếu là lỗi validation, throw trực tiếp
      if (error.message.includes('không được để trống') || 
          error.message.includes('phải là số') ||
          error.message.includes('không được bằng 0')) {
        throw error;
      }
      throw new Error(`Lỗi khi tạo mặt hàng mới: ${error.message}`);
    }
  }

  async updateMatHang({ maMatHang, matHangData }) {
    try {
      // Validate dữ liệu trước khi cập nhật
      this.validateMatHangData(matHangData, true);

      // Kiểm tra mặt hàng có tồn tại không
      const existingMatHang = await this.matHangDAO.getById({ maMatHang });
      if (!existingMatHang) {
        throw new Error('Không tìm thấy mặt hàng để cập nhật');
      }

      // Chuẩn hóa dữ liệu số cho MatHang - chỉ cập nhật các trường được gửi lên
      const updateData = { ...existingMatHang.toJSON() };
      
      if (matHangData.giaBan !== undefined && matHangData.giaBan !== null && matHangData.giaBan !== '') {
        updateData.giaBan = parseFloat(matHangData.giaBan);
      }
      
      if (matHangData.tonKho !== undefined && matHangData.tonKho !== null && matHangData.tonKho !== '') {
        updateData.tonKho = parseInt(matHangData.tonKho);
      }
      
      if (matHangData.maNhaCungCap !== undefined && matHangData.maNhaCungCap !== null && matHangData.maNhaCungCap !== '') {
        updateData.maNhaCungCap = parseInt(matHangData.maNhaCungCap);
      }

      updateData.maMatHang = maMatHang; // Đảm bảo không thay đổi mã

      const matHang = new MatHang(updateData);
      const updatedMatHang = await this.matHangDAO.update({ maMatHang, matHang });

      // Cập nhật thông tin chi tiết trong MatHangCungcap nếu có
      if (matHangData.tenMatHang || matHangData.donViTinh || matHangData.giaNhap !== undefined || matHangData.moTa !== undefined) {
        // Tìm record MatHangCungcap theo maMatHang
        const mhCungcap = await this.mhCungcapDAO.getByMatHang({ maMatHang });

        if (mhCungcap) {
          const updateCungcapData = {
            ...mhCungcap.toJSON(),
            tenMatHang: matHangData.tenMatHang !== undefined ? matHangData.tenMatHang : mhCungcap.tenMatHang,
            donViTinh: matHangData.donViTinh !== undefined ? matHangData.donViTinh : mhCungcap.donViTinh,
            giaNhap: matHangData.giaNhap !== undefined && matHangData.giaNhap !== null && matHangData.giaNhap !== '' 
              ? parseFloat(matHangData.giaNhap) 
              : mhCungcap.giaNhap,
            moTa: matHangData.moTa !== undefined ? matHangData.moTa : mhCungcap.moTa
          };
          await this.mhCungcapDAO.update({
            maMatHangCungCap: mhCungcap.maMatHangCungCap,
            matHangCungcap: new MatHangCungcap(updateCungcapData)
          });
        }
      }

      return updatedMatHang;
    } catch (error) {
      // Nếu là lỗi validation, throw trực tiếp
      if (error.message.includes('không được để trống') || 
          error.message.includes('phải là số') ||
          error.message.includes('không được bằng 0') ||
          error.message.includes('Không tìm thấy mặt hàng')) {
        throw error;
      }
      throw new Error(`Lỗi khi cập nhật mặt hàng: ${error.message}`);
    }
  }

  async deleteMatHang({ maMatHang }) {
    try {
      return await this.matHangDAO.delete({ maMatHang });
    } catch (error) {
      throw new Error(`Lỗi khi xóa mặt hàng: ${error.message}`);
    }
  }

  async updateTonKho({ maMatHang, soLuong }) {
    try {
      return await this.matHangDAO.updateTonKho({ maMatHang, soLuong });
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật tồn kho: ${error.message}`);
    }
  }
}

module.exports = MatHangService;


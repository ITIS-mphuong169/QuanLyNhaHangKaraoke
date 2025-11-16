/**
 * Service: PhieuDatService
 * Mô tả: Lớp Service xử lý business logic cho PhieuDat
 */
const PhieuDatDAO = require('../dao/PhieuDatDAO');
const PhongDatDAO = require('../dao/PhongdatDAO');
const ChiTietPhieuDatDAO = require('../dao/ChiTietPhieuDatDAO');
const PhongDAO = require('../dao/PhongDAO');
const MatHangDAO = require('../dao/MatHangDAO');
const MHCungcapDAO = require('../dao/MHCungcapDAO');
const PhieuDat = require('../entities/PhieuDat');
const PhongDat = require('../entities/Phongdat');
const ChiTietPhieuDat = require('../entities/ChiTietPhieuDat');

class PhieuDatService {
  constructor(db) {
    this.phieuDatDAO = new PhieuDatDAO(db);
    this.phongDatDAO = new PhongDatDAO(db);
    this.chiTietDAO = new ChiTietPhieuDatDAO(db);
    this.phongDAO = new PhongDAO(db);
    this.matHangDAO = new MatHangDAO(db);
    this.mhCungcapDAO = new MHCungcapDAO(db);
  }

  async getAllPhieuDat() {
    try {
      return await this.phieuDatDAO.getAll();
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách phiếu đặt: ${error.message}`);
    }
  }

  async getPhieuDatById(maPhieuDat) {
    try {
      const phieuDat = await this.phieuDatDAO.getById(maPhieuDat);
      if (!phieuDat) {
        throw new Error('Không tìm thấy phiếu đặt');
      }

      // Lấy thông tin chi tiết: phòng đặt và mặt hàng
      const phongDatList = await this.phongDatDAO.getByPhieuDat(maPhieuDat);
      const chiTietList = await this.chiTietDAO.getByPhieuDat(maPhieuDat);

      return {
        ...phieuDat.toJSON(),
        phongDat: phongDatList.map(pd => pd.toJSON()),
        chiTiet: chiTietList.map(ct => ct.toJSON())
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin phiếu đặt: ${error.message}`);
    }
  }

  async getPhieuDatByTrangThai(trangThai) {
    try {
      return await this.phieuDatDAO.getByTrangThai(trangThai);
    } catch (error) {
      throw new Error(`Lỗi khi lấy phiếu đặt theo trạng thái: ${error.message}`);
    }
  }

  /**
   * Tính số giờ giữa 2 thời điểm
   */
  calculateSoGio(gioBatDau, gioKetThuc) {
    if (!gioBatDau || !gioKetThuc) return 0;
    const start = new Date(gioBatDau);
    const end = new Date(gioKetThuc);
    const diffMs = end - start;
    const diffHours = diffMs / (1000 * 60 * 60);
    return Math.max(0, parseFloat(diffHours.toFixed(2)));
  }

  /**
   * Tính tiền phòng dựa trên danh sách phòng đặt
   */
  async calculateTienPhong(phongDatList) {
    let tongTienPhong = 0;
    
    for (const pd of phongDatList) {
      const phong = await this.phongDAO.getById(pd.maPhong);
      if (phong) {
        const soGio = this.calculateSoGio(pd.gioBatDau, pd.gioKetThuc);
        tongTienPhong += parseFloat(phong.giaGio || 0) * soGio;
      }
    }
    
    return Math.round(tongTienPhong);
  }

  /**
   * Tính tiền mặt hàng dựa trên chi tiết
   */
  async calculateTienMatHang(chiTietList) {
    let tongTienMatHang = 0;
    
    for (const ct of chiTietList) {
      if (ct.maMatHang) {
        const matHang = await this.matHangDAO.getById(ct.maMatHang);
        if (matHang) {
          tongTienMatHang += parseFloat(matHang.giaBan || 0) * parseInt(ct.soLuong || 0);
        }
      }
    }
    
    return Math.round(tongTienMatHang);
  }

  async createPhieuDat(phieuDatData) {
    try {
      if (!phieuDatData.maKhachHang || !phieuDatData.phongDat || phieuDatData.phongDat.length === 0) {
        throw new Error('Thông tin phiếu đặt không đầy đủ');
      }

      // Kiểm tra và cập nhật trạng thái phòng
      for (const pd of phieuDatData.phongDat) {
        const phong = await this.phongDAO.getById(pd.maPhong);
        if (!phong) {
          throw new Error(`Không tìm thấy phòng ${pd.maPhong}`);
        }
        if (phong.trangThai !== 'TRONG') {
          throw new Error(`Phòng ${phong.tenPhong} không còn trống`);
        }

        // Tính số giờ
        pd.soGio = this.calculateSoGio(pd.gioBatDau, pd.gioKetThuc);
        
        // Cập nhật trạng thái phòng
        await this.phongDAO.updateTrangThai(pd.maPhong, 'DANG_SU_DUNG');
      }

      // Tính tiền phòng
      const tienPhong = await this.calculateTienPhong(phieuDatData.phongDat);
      
      // Tính tiền mặt hàng nếu có
      const tienMatHang = phieuDatData.chiTiet && phieuDatData.chiTiet.length > 0
        ? await this.calculateTienMatHang(phieuDatData.chiTiet)
        : 0;

      // Tạo phiếu đặt
      // Chuyển đổi ngayDat thành Date object nếu là string
      let ngayDat = phieuDatData.ngayDat;
      if (typeof ngayDat === 'string') {
        ngayDat = new Date(ngayDat);
      }
      if (!ngayDat || !(ngayDat instanceof Date)) {
        ngayDat = new Date();
      }

      const phieuDat = new PhieuDat({
        maKhachHang: phieuDatData.maKhachHang,
        maNhanVien: phieuDatData.maNhanVien || 1,
        ngayDat: ngayDat,
        tongTien: 0, // Sẽ tính sau khi có giảm giá
        tienPhong: tienPhong,
        tienMatHang: tienMatHang,
        giamGia: 0,
        phuongThucThanhToan: null,
        trangThai: 'DA_DAT',
        ghiChu: phieuDatData.ghiChu || null
      });

      const createdPhieuDat = await this.phieuDatDAO.create(phieuDat);

      // Tạo phòng đặt
      for (const pd of phieuDatData.phongDat) {
        // Chuyển đổi datetime thành Date object nếu là string
        let gioBatDau = pd.gioBatDau;
        let gioKetThuc = pd.gioKetThuc;
        
        if (typeof gioBatDau === 'string') {
          gioBatDau = new Date(gioBatDau);
        }
        if (typeof gioKetThuc === 'string') {
          gioKetThuc = new Date(gioKetThuc);
        }

        const phongDat = new PhongDat({
          maPhieuDat: createdPhieuDat.maPhieuDat,
          maPhong: pd.maPhong,
          gioBatDau: gioBatDau,
          gioKetThuc: gioKetThuc,
          soGio: pd.soGio
        });
        await this.phongDatDAO.create(phongDat);
      }

      // Tạo chi tiết mặt hàng nếu có
      if (phieuDatData.chiTiet && phieuDatData.chiTiet.length > 0) {
        for (const ct of phieuDatData.chiTiet) {
          // Lấy tên mặt hàng từ MatHang hoặc MatHangCungcap
          let tenMatHang = ct.tenMatHang || '';
          if (ct.maMatHang && !tenMatHang) {
            const matHangDetails = await this.matHangDAO.getByIdWithDetails(ct.maMatHang);
            if (matHangDetails) {
              tenMatHang = matHangDetails.tenMatHang || '';
            }
          }

          const chiTiet = new ChiTietPhieuDat({
            maPhieuDat: createdPhieuDat.maPhieuDat,
            maMatHang: ct.maMatHang,
            tenMatHang: tenMatHang,
            soLuong: ct.soLuong || 0
          });
          await this.chiTietDAO.create(chiTiet);
        }
      }

      // Cập nhật tổng tiền
      const tongTien = Math.round(tienPhong + tienMatHang);
      await this.phieuDatDAO.update(createdPhieuDat.maPhieuDat, {
        ...createdPhieuDat.toJSON(),
        tongTien: tongTien,
        tienPhong: Math.round(tienPhong),
        tienMatHang: Math.round(tienMatHang)
      });

      return await this.getPhieuDatById(createdPhieuDat.maPhieuDat);
    } catch (error) {
      throw new Error(`Lỗi khi tạo phiếu đặt: ${error.message}`);
    }
  }

  async updatePhieuDat(maPhieuDat, phieuDatData) {
    try {
      const existingPhieuDat = await this.phieuDatDAO.getById(maPhieuDat);
      if (!existingPhieuDat) {
        throw new Error('Không tìm thấy phiếu đặt để cập nhật');
      }

      // Nếu cập nhật phòng đặt
      if (phieuDatData.phongDat) {
        // Xóa phòng đặt cũ và trả phòng về trạng thái TRONG
        const oldPhongDatList = await this.phongDatDAO.getByPhieuDat(maPhieuDat);
        for (const pd of oldPhongDatList) {
          await this.phongDAO.updateTrangThai(pd.maPhong, 'TRONG');
        }
        await this.phongDatDAO.deleteByPhieuDat(maPhieuDat);

        // Tạo phòng đặt mới
        for (const pd of phieuDatData.phongDat) {
          const phong = await this.phongDAO.getById(pd.maPhong);
          if (!phong) {
            throw new Error(`Không tìm thấy phòng ${pd.maPhong}`);
          }

          // Chuyển đổi datetime thành Date object nếu là string
          let gioBatDau = pd.gioBatDau;
          let gioKetThuc = pd.gioKetThuc;
          
          if (typeof gioBatDau === 'string') {
            gioBatDau = new Date(gioBatDau);
          }
          if (typeof gioKetThuc === 'string') {
            gioKetThuc = new Date(gioKetThuc);
          }

          const soGio = this.calculateSoGio(gioBatDau, gioKetThuc);
          
          const phongDat = new PhongDat({
            maPhieuDat: maPhieuDat,
            maPhong: pd.maPhong,
            gioBatDau: gioBatDau,
            gioKetThuc: gioKetThuc,
            soGio: soGio
          });
          await this.phongDatDAO.create(phongDat);
          await this.phongDAO.updateTrangThai(pd.maPhong, 'DANG_SU_DUNG');
        }

        // Tính lại tiền phòng
        phieuDatData.tienPhong = await this.calculateTienPhong(phieuDatData.phongDat);
      }

      // Nếu cập nhật chi tiết mặt hàng
      if (phieuDatData.chiTiet !== undefined) {
        // Xóa chi tiết cũ
        await this.chiTietDAO.deleteByPhieuDat(maPhieuDat);

        // Tạo chi tiết mới
        if (phieuDatData.chiTiet && phieuDatData.chiTiet.length > 0) {
          for (const ct of phieuDatData.chiTiet) {
            let tenMatHang = ct.tenMatHang || '';
            if (ct.maMatHang && !tenMatHang) {
              const matHangDetails = await this.matHangDAO.getByIdWithDetails(ct.maMatHang);
              if (matHangDetails) {
                tenMatHang = matHangDetails.tenMatHang || '';
              }
            }

            const chiTiet = new ChiTietPhieuDat({
              maPhieuDat: maPhieuDat,
              maMatHang: ct.maMatHang,
              tenMatHang: tenMatHang,
              soLuong: ct.soLuong || 0
            });
            await this.chiTietDAO.create(chiTiet);
          }
        }

        // Tính lại tiền mặt hàng
        phieuDatData.tienMatHang = await this.calculateTienMatHang(phieuDatData.chiTiet || []);
      }

      // Tính tổng tiền
      const tienPhong = phieuDatData.tienPhong !== undefined 
        ? Math.round(parseFloat(phieuDatData.tienPhong)) 
        : Math.round(parseFloat(existingPhieuDat.tienPhong || 0));
      const tienMatHang = phieuDatData.tienMatHang !== undefined 
        ? Math.round(parseFloat(phieuDatData.tienMatHang)) 
        : Math.round(parseFloat(existingPhieuDat.tienMatHang || 0));
      const giamGia = phieuDatData.giamGia !== undefined 
        ? Math.round(parseFloat(phieuDatData.giamGia)) 
        : Math.round(parseFloat(existingPhieuDat.giamGia || 0));
      
      const tongTien = Math.max(0, tienPhong + tienMatHang - giamGia);

      // Cập nhật phiếu đặt
      // Chuyển đổi ngayDat thành Date object nếu là string
      let ngayDat = existingPhieuDat.ngayDat;
      if (phieuDatData.ngayDat !== undefined) {
        ngayDat = phieuDatData.ngayDat;
        if (typeof ngayDat === 'string') {
          ngayDat = new Date(ngayDat);
        }
      }

      const updateData = {
        ...existingPhieuDat.toJSON(),
        maKhachHang: phieuDatData.maKhachHang !== undefined ? phieuDatData.maKhachHang : existingPhieuDat.maKhachHang,
        maNhanVien: phieuDatData.maNhanVien !== undefined ? phieuDatData.maNhanVien : existingPhieuDat.maNhanVien,
        ngayDat: ngayDat,
        tongTien: tongTien,
        tienPhong: tienPhong,
        tienMatHang: tienMatHang,
        giamGia: giamGia,
        phuongThucThanhToan: phieuDatData.phuongThucThanhToan !== undefined ? phieuDatData.phuongThucThanhToan : existingPhieuDat.phuongThucThanhToan,
        trangThai: phieuDatData.trangThai !== undefined ? phieuDatData.trangThai : existingPhieuDat.trangThai,
        ghiChu: phieuDatData.ghiChu !== undefined ? phieuDatData.ghiChu : existingPhieuDat.ghiChu
      };

      const phieuDat = new PhieuDat(updateData);
      await this.phieuDatDAO.update(maPhieuDat, phieuDat);

      return await this.getPhieuDatById(maPhieuDat);
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật phiếu đặt: ${error.message}`);
    }
  }

  async thanhToanPhieuDat(maPhieuDat, phieuDatData) {
    try {
      const existingPhieuDat = await this.phieuDatDAO.getById(maPhieuDat);
      if (!existingPhieuDat) {
        throw new Error('Không tìm thấy phiếu đặt');
      }

      if (existingPhieuDat.trangThai === 'HOAN_THANH') {
        throw new Error('Phiếu đặt đã được thanh toán');
      }

      // Cập nhật chi tiết mặt hàng nếu có
      if (phieuDatData.chiTiet !== undefined) {
        await this.chiTietDAO.deleteByPhieuDat(maPhieuDat);
        
        if (phieuDatData.chiTiet && phieuDatData.chiTiet.length > 0) {
          for (const ct of phieuDatData.chiTiet) {
            let tenMatHang = ct.tenMatHang || '';
            if (ct.maMatHang && !tenMatHang) {
              const matHangDetails = await this.matHangDAO.getByIdWithDetails(ct.maMatHang);
              if (matHangDetails) {
                tenMatHang = matHangDetails.tenMatHang || '';
              }
            }

            const chiTiet = new ChiTietPhieuDat({
              maPhieuDat: maPhieuDat,
              maMatHang: ct.maMatHang,
              tenMatHang: tenMatHang,
              soLuong: ct.soLuong || 0
            });
            await this.chiTietDAO.create(chiTiet);
          }
        }
      }

      // Tính lại tiền mặt hàng
      const chiTietList = phieuDatData.chiTiet || await this.chiTietDAO.getByPhieuDat(maPhieuDat);
      const tienMatHang = await this.calculateTienMatHang(chiTietList);

      // Tính tổng tiền
      const tienPhong = Math.round(parseFloat(existingPhieuDat.tienPhong || 0));
      const giamGia = phieuDatData.giamGia !== undefined 
        ? Math.round(parseFloat(phieuDatData.giamGia)) 
        : Math.round(parseFloat(existingPhieuDat.giamGia || 0));
      const tongTien = Math.max(0, tienPhong + tienMatHang - giamGia);

      // Cập nhật phiếu đặt với trạng thái HOAN_THANH
      const updateData = {
        ...existingPhieuDat.toJSON(),
        tongTien: tongTien,
        tienPhong: tienPhong,
        tienMatHang: tienMatHang,
        giamGia: giamGia,
        phuongThucThanhToan: phieuDatData.phuongThucThanhToan || null,
        trangThai: 'HOAN_THANH',
        ghiChu: phieuDatData.ghiChu !== undefined ? phieuDatData.ghiChu : existingPhieuDat.ghiChu
      };

      const phieuDat = new PhieuDat(updateData);
      await this.phieuDatDAO.update(maPhieuDat, phieuDat);

      // Trả các phòng về trạng thái TRONG
      const phongDatList = await this.phongDatDAO.getByPhieuDat(maPhieuDat);
      for (const pd of phongDatList) {
        await this.phongDAO.updateTrangThai(pd.maPhong, 'TRONG');
      }

      // Cập nhật tồn kho mặt hàng nếu có
      for (const ct of chiTietList) {
        if (ct.maMatHang && ct.soLuong > 0) {
          await this.matHangDAO.updateTonKho(ct.maMatHang, -ct.soLuong);
        }
      }

      return await this.getPhieuDatById(maPhieuDat);
    } catch (error) {
      throw new Error(`Lỗi khi thanh toán phiếu đặt: ${error.message}`);
    }
  }

  async deletePhieuDat(maPhieuDat) {
    try {
      const phieuDat = await this.phieuDatDAO.getById(maPhieuDat);
      if (!phieuDat) {
        throw new Error('Không tìm thấy phiếu đặt');
      }

      // Trả các phòng về trạng thái TRONG
      const phongDatList = await this.phongDatDAO.getByPhieuDat(maPhieuDat);
      for (const pd of phongDatList) {
        await this.phongDAO.updateTrangThai(pd.maPhong, 'TRONG');
      }

      // Xóa phòng đặt và chi tiết (cascade delete)
      await this.phongDatDAO.deleteByPhieuDat(maPhieuDat);
      await this.chiTietDAO.deleteByPhieuDat(maPhieuDat);

      return await this.phieuDatDAO.delete(maPhieuDat);
    } catch (error) {
      throw new Error(`Lỗi khi xóa phiếu đặt: ${error.message}`);
    }
  }
}

module.exports = PhieuDatService;


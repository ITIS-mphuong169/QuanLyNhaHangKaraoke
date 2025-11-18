/**
 * Service: NhapHangService
 * Mô tả: Lớp Service xử lý business logic cho NhapHang
 */
const NhapHangDAO = require('../dao/NhapHangDAO');
const ChiTietNhapHangDAO = require('../dao/ChiTietNhapHangDAO');
const MatHangDAO = require('../dao/MatHangDAO');
const MHCungcapDAO = require('../dao/MHCungcapDAO');
const NhapHang = require('../entities/NhapHang');
const ChiTietNhapHang = require('../entities/ChiTietNhapHang');

class NhapHangService {
  constructor(db) {
    this.nhapHangDAO = new NhapHangDAO(db);
    this.chiTietDAO = new ChiTietNhapHangDAO(db);
    this.matHangDAO = new MatHangDAO(db);
    this.mhCungcapDAO = new MHCungcapDAO(db);
  }

  async getAllNhapHang() {
    try {
      return await this.nhapHangDAO.getAll();
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách phiếu nhập: ${error.message}`);
    }
  }

  async getNhapHangById({ maNhapHang }) {
    try {
      const nhapHang = await this.nhapHangDAO.getById({ maNhapHang });
      if (!nhapHang) {
        throw new Error('Không tìm thấy phiếu nhập');
      }
      const chiTiet = await this.chiTietDAO.getByNhapHang({ maNhapHang });
      return { ...nhapHang, chiTiet };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin phiếu nhập: ${error.message}`);
    }
  }

  async createNhapHang({ nhapHangData }) {
    try {
      if (!nhapHangData.maNhaCungCap || !nhapHangData.chiTiet || nhapHangData.chiTiet.length === 0) {
        throw new Error('Thông tin phiếu nhập không đầy đủ');
      }

      // Tính tổng tiền từ chi tiết (số lượng * đơn giá từ MatHangCungcap)
      let tongTien = 0;

      const nhapHang = new NhapHang({
        ...nhapHangData,
        tongTien: 0, // Sẽ tính sau
        trangThai: 'DA_NHAP'
      });

      const createdNhapHang = await this.nhapHangDAO.create({ nhapHang });

      // Tạo chi tiết và cập nhật tồn kho, giá bán
      for (const ct of nhapHangData.chiTiet) {
        // Lấy thông tin mặt hàng cung cấp để lấy giá nhập
        const mhCungcapList = await this.mhCungcapDAO.getByNhaCungCap({ maNhaCungCap: nhapHangData.maNhaCungCap });
        const mhCungcap = mhCungcapList.find(mh => mh.maMatHang === ct.maMatHang);
        
        if (!mhCungcap) {
          throw new Error(`Không tìm thấy mặt hàng ${ct.tenMatHang} trong danh sách cung cấp`);
        }

        // Đơn giá luôn lấy từ MatHangCungcap, không dùng từ request
        const donGia = mhCungcap.giaNhap || 0;
        const thanhTien = ct.soLuong * donGia;
        tongTien += thanhTien;

        const chiTiet = new ChiTietNhapHang({
          maNhapHang: createdNhapHang.maNhapHang,
          maMatHang: ct.maMatHang,
          tenMatHang: mhCungcap.tenMatHang,
          soLuong: ct.soLuong,
          donGia: donGia,
          thanhTien: thanhTien
        });
        await this.chiTietDAO.create({ chiTiet });

        // Cập nhật tồn kho và giá bán mặt hàng
        if (ct.maMatHang) {
          // Cập nhật tồn kho
          await this.matHangDAO.updateTonKho({ maMatHang: ct.maMatHang, soLuong: ct.soLuong });
          
          // Cập nhật giá bán nếu có trong request
          if (ct.giaBan !== undefined && ct.giaBan !== null && ct.giaBan !== '') {
            const existingMatHang = await this.matHangDAO.getById({ maMatHang: ct.maMatHang });
            if (existingMatHang) {
              await this.matHangDAO.update({
                maMatHang: ct.maMatHang,
                matHang: {
                  ...existingMatHang.toJSON(),
                  giaBan: parseFloat(ct.giaBan)
                }
              });
            }
          }
        }
      }

      // Cập nhật tổng tiền vào phiếu nhập
      await this.nhapHangDAO.update({
        maNhapHang: createdNhapHang.maNhapHang,
        nhapHang: {
          ...createdNhapHang.toJSON(),
          tongTien: tongTien
        }
      });

      return await this.getNhapHangById({ maNhapHang: createdNhapHang.maNhapHang });
    } catch (error) {
      throw new Error(`Lỗi khi tạo phiếu nhập: ${error.message}`);
    }
  }

  async deleteNhapHang({ maNhapHang }) {
    try {
      return await this.nhapHangDAO.delete({ maNhapHang });
    } catch (error) {
      throw new Error(`Lỗi khi xóa phiếu nhập: ${error.message}`);
    }
  }
}

module.exports = NhapHangService;


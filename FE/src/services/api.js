/**
 * Service: API Service
 * Mô tả: Service để gọi API từ backend
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  // Phòng
  async getPhongList() {
    const response = await fetch(`${API_BASE_URL}/phong`);
    const data = await response.json();
    return data;
  }

  async getPhongById(id) {
    const response = await fetch(`${API_BASE_URL}/phong/${id}`);
    const data = await response.json();
    return data;
  }

  async getPhongTrong() {
    const response = await fetch(`${API_BASE_URL}/phong/trong`);
    const data = await response.json();
    return data;
  }

  async createPhong(phongData) {
    const response = await fetch(`${API_BASE_URL}/phong`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(phongData)
    });
    const data = await response.json();
    return data;
  }

  async updatePhong(id, phongData) {
    const response = await fetch(`${API_BASE_URL}/phong/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(phongData)
    });
    const data = await response.json();
    return data;
  }

  async deletePhong(id) {
    const response = await fetch(`${API_BASE_URL}/phong/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }

  async updatePhongTrangThai(id, trangThai) {
    const response = await fetch(`${API_BASE_URL}/phong/${id}/trang-thai`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ trangThai })
    });
    const data = await response.json();
    return data;
  }

  async deletePhong(id) {
    const response = await fetch(`${API_BASE_URL}/phong/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }

  // Khách hàng
  async getKhachHangList() {
    const response = await fetch(`${API_BASE_URL}/khach-hang`);
    const data = await response.json();
    return data;
  }

  async getKhachHangById(id) {
    const response = await fetch(`${API_BASE_URL}/khach-hang/${id}`);
    const data = await response.json();
    return data;
  }

  async searchKhachHang(keyword) {
    const response = await fetch(`${API_BASE_URL}/khach-hang/search?keyword=${encodeURIComponent(keyword)}`);
    const data = await response.json();
    return data;
  }

  async createKhachHang(khachHangData) {
    const response = await fetch(`${API_BASE_URL}/khach-hang`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(khachHangData)
    });
    const data = await response.json();
    return data;
  }

  async updateKhachHang(id, khachHangData) {
    const response = await fetch(`${API_BASE_URL}/khach-hang/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(khachHangData)
    });
    const data = await response.json();
    return data;
  }

  async deleteKhachHang(id) {
    const response = await fetch(`${API_BASE_URL}/khach-hang/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }

  // Mặt hàng
  async getMatHangList() {
    const response = await fetch(`${API_BASE_URL}/mat-hang`);
    const data = await response.json();
    return data;
  }

  async getMatHangById({ id }) {
    const response = await fetch(`${API_BASE_URL}/mat-hang/${id}`);
    const data = await response.json();
    return data;
  }

  async getMatHangByNhaCungCap({ maNhaCungCap }) {
    const response = await fetch(`${API_BASE_URL}/mat-hang/nha-cung-cap/${maNhaCungCap}`);
    const data = await response.json();
    return data;
  }

  async createMatHang({ matHangData }) {
    const response = await fetch(`${API_BASE_URL}/mat-hang`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(matHangData)
    });
    const data = await response.json();
    return data;
  }

  async updateMatHang({ id, matHangData }) {
    const response = await fetch(`${API_BASE_URL}/mat-hang/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(matHangData)
    });
    const data = await response.json();
    return data;
  }

  async deleteMatHang({ id }) {
    const response = await fetch(`${API_BASE_URL}/mat-hang/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }

  // Đặt phòng (cũ - giữ lại để tương thích)
  async getDatPhongList() {
    const response = await fetch(`${API_BASE_URL}/dat-phong`);
    const data = await response.json();
    return data;
  }

  async getDatPhongById(id) {
    const response = await fetch(`${API_BASE_URL}/dat-phong/${id}`);
    const data = await response.json();
    return data;
  }

  async createDatPhong(datPhongData) {
    const response = await fetch(`${API_BASE_URL}/dat-phong`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datPhongData)
    });
    const data = await response.json();
    return data;
  }

  async updateDatPhong(id, datPhongData) {
    const response = await fetch(`${API_BASE_URL}/dat-phong/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datPhongData)
    });
    const data = await response.json();
    return data;
  }

  async updateTrangThaiDatPhong(id, trangThai) {
    const response = await fetch(`${API_BASE_URL}/dat-phong/${id}/trang-thai`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ trangThai })
    });
    const data = await response.json();
    return data;
  }

  // Phiếu đặt phòng (mới)
  async getPhieuDatList() {
    const response = await fetch(`${API_BASE_URL}/phieu-dat`);
    const data = await response.json();
    return data;
  }

  async getPhieuDatById(id) {
    const response = await fetch(`${API_BASE_URL}/phieu-dat/${id}`);
    const data = await response.json();
    return data;
  }

  async getPhieuDatByTrangThai(trangThai) {
    const response = await fetch(`${API_BASE_URL}/phieu-dat/trang-thai/${trangThai}`);
    const data = await response.json();
    return data;
  }

  async createPhieuDat(phieuDatData) {
    const response = await fetch(`${API_BASE_URL}/phieu-dat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(phieuDatData)
    });
    const data = await response.json();
    return data;
  }

  async updatePhieuDat(id, phieuDatData) {
    const response = await fetch(`${API_BASE_URL}/phieu-dat/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(phieuDatData)
    });
    const data = await response.json();
    return data;
  }

  async thanhToanPhieuDat(id, phieuDatData) {
    const response = await fetch(`${API_BASE_URL}/phieu-dat/${id}/thanh-toan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(phieuDatData)
    });
    const data = await response.json();
    return data;
  }

  async deletePhieuDat(id) {
    const response = await fetch(`${API_BASE_URL}/phieu-dat/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }

  async deleteDatPhong(id) {
    const response = await fetch(`${API_BASE_URL}/dat-phong/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }

  // Hóa đơn
  async getHoaDonList() {
    const response = await fetch(`${API_BASE_URL}/hoa-don`);
    const data = await response.json();
    return data;
  }

  async getHoaDonById(id) {
    const response = await fetch(`${API_BASE_URL}/hoa-don/${id}`);
    const data = await response.json();
    return data;
  }

  async createHoaDon(hoaDonData) {
    const response = await fetch(`${API_BASE_URL}/hoa-don`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hoaDonData)
    });
    const data = await response.json();
    return data;
  }

  // Thống kê
  async getThongKeTongHop() {
    const response = await fetch(`${API_BASE_URL}/thong-ke/tong-hop`);
    const data = await response.json();
    return data;
  }

  async getThongKeByDateRange(startDate, endDate) {
    const response = await fetch(`${API_BASE_URL}/thong-ke/khoang-thoi-gian?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    return data;
  }

  async getThongKeByMatHang(maMatHang, startDate, endDate) {
    const response = await fetch(`${API_BASE_URL}/thong-ke/mat-hang/${maMatHang}?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    return data;
  }

  // Nhập hàng
  async getNhapHangList() {
    const response = await fetch(`${API_BASE_URL}/nhap-hang`);
    const data = await response.json();
    return data;
  }

  async getNhapHangById({ id }) {
    const response = await fetch(`${API_BASE_URL}/nhap-hang/${id}`);
    const data = await response.json();
    return data;
  }

  async createNhapHang({ nhapHangData }) {
    const response = await fetch(`${API_BASE_URL}/nhap-hang`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nhapHangData)
    });
    const data = await response.json();
    return data;
  }

  // Nhà cung cấp
  async getNhaCungCapList() {
    const response = await fetch(`${API_BASE_URL}/nha-cung-cap`);
    const data = await response.json();
    return data;
  }

  async getNhaCungCapById(id) {
    const response = await fetch(`${API_BASE_URL}/nha-cung-cap/${id}`);
    const data = await response.json();
    return data;
  }

  async createNhaCungCap(nccData) {
    const response = await fetch(`${API_BASE_URL}/nha-cung-cap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nccData)
    });
    const data = await response.json();
    return data;
  }
}

export default new ApiService();


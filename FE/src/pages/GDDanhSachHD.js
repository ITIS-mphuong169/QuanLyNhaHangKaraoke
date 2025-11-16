/**
 * Component: GDDanhSachHD (Bill List)
 * Mô tả: Giao diện danh sách hóa đơn
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import './GDDanhSachHD.css';

function GDDanhSachHD() {
  const [hoaDonList, setHoaDonList] = useState([]);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    trangThai: ''
  });

  useEffect(() => {
    fetchHoaDonList();
  }, []);

  const fetchHoaDonList = async () => {
    try {
      const data = await apiService.getHoaDonList();
      if (data.success) {
        setHoaDonList(data.data);
      } else {
        // Mock data for testing
        setHoaDonList([]);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách hóa đơn:', error);
      setHoaDonList([]);
    }
  };

  const getTrangThaiLabel = (trangThai) => {
    const labels = {
      'CHUA_THANH_TOAN': 'Chưa thanh toán',
      'DA_THANH_TOAN': 'Đã thanh toán',
      'HUY': 'Hủy'
    };
    return labels[trangThai] || trangThai;
  };

  const getTrangThaiClass = (trangThai) => {
    const classes = {
      'CHUA_THANH_TOAN': 'status-chua-tt',
      'DA_THANH_TOAN': 'status-da-tt',
      'HUY': 'status-huy'
    };
    return classes[trangThai] || '';
  };

  const filteredHoaDon = hoaDonList.filter(hd => {
    if (filter.startDate && new Date(hd.ngayLap) < new Date(filter.startDate)) return false;
    if (filter.endDate && new Date(hd.ngayLap) > new Date(filter.endDate + 'T23:59:59')) return false;
    if (filter.trangThai && hd.trangThai !== filter.trangThai) return false;
    return true;
  });

  return (
    <div className="gd-danh-sach-hd">
      <div className="section-header">
        <h2>Danh Sách Hóa Đơn</h2>
      </div>

      <div className="filter-section">
        <div className="filter-form">
          <div className="form-group">
            <label>Từ ngày</label>
            <input
              type="date"
              value={filter.startDate}
              onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Đến ngày</label>
            <input
              type="date"
              value={filter.endDate}
              onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Trạng thái</label>
            <select
              value={filter.trangThai}
              onChange={(e) => setFilter({ ...filter, trangThai: e.target.value })}
            >
              <option value="">Tất cả</option>
              <option value="CHUA_THANH_TOAN">Chưa thanh toán</option>
              <option value="DA_THANH_TOAN">Đã thanh toán</option>
              <option value="HUY">Hủy</option>
            </select>
          </div>
        </div>
      </div>

      <div className="hoa-don-table">
        {filteredHoaDon.length === 0 ? (
          <p className="empty-message">Không có hóa đơn nào</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã hóa đơn</th>
                <th>Ngày lập</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredHoaDon.map((hd, index) => (
                <tr key={hd.maHoaDon}>
                  <td>{index + 1}</td>
                  <td>HD{hd.maHoaDon}</td>
                  <td>{new Date(hd.ngayLap).toLocaleDateString('vi-VN')}</td>
                  <td>{parseFloat(hd.thanhTien).toLocaleString('vi-VN')} VNĐ</td>
                  <td>
                    <span className={`status-badge ${getTrangThaiClass(hd.trangThai)}`}>
                      {getTrangThaiLabel(hd.trangThai)}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/chi-tiet-hoa-don/${hd.maHoaDon}`}
                      className="btn btn-small btn-primary"
                    >
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default GDDanhSachHD;


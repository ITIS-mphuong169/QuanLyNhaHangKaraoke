/**
 * Component: GDThongKeMH (Item Statistics)
 * Mô tả: Giao diện thống kê mặt hàng
 */
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import './GDThongKeMH.css';

function GDThongKeMH() {
  const [thongKeData, setThongKeData] = useState([]);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    maMatHang: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchThongKe();
  }, []);

  const fetchThongKe = async () => {
    setLoading(true);
    try {
      let data;
      if (filter.startDate && filter.endDate) {
        data = await apiService.getThongKeByDateRange(filter.startDate, filter.endDate);
      } else {
        data = await apiService.getThongKeTongHop();
      }
      if (data.success) {
        setThongKeData(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy thống kê:', error);
      setLoading(false);
    }
  };

  const handleFilter = () => {
    fetchThongKe();
  };

  const tongDoanhThu = thongKeData.reduce((sum, item) => sum + item.doanhThu, 0);
  const tongLoiNhuan = thongKeData.reduce((sum, item) => sum + item.loiNhuan, 0);

  return (
    <div className="gd-thong-ke-mh">
      <div className="section-header">
        <h2>Thống Kê Mặt Hàng</h2>
      </div>

      <div className="filter-section">
        <h3>Bộ Lọc</h3>
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
            <button type="button" className="btn btn-primary" onClick={handleFilter}>
              Lọc
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setFilter({ startDate: '', endDate: '', maMatHang: '' });
                fetchThongKe();
              }}
            >
              Xóa Bộ Lọc
            </button>
          </div>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h4>Tổng Doanh Thu</h4>
          <p className="summary-value">{tongDoanhThu.toLocaleString('vi-VN')} VNĐ</p>
        </div>
        <div className="summary-card">
          <h4>Tổng Lợi Nhuận</h4>
          <p className="summary-value">{tongLoiNhuan.toLocaleString('vi-VN')} VNĐ</p>
        </div>
        <div className="summary-card">
          <h4>Số Mặt Hàng</h4>
          <p className="summary-value">{thongKeData.length}</p>
        </div>
      </div>

      {loading ? (
        <div className="loading">Đang tải dữ liệu...</div>
      ) : (
        <div className="thong-ke-table">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên mặt hàng</th>
                <th>Số lượng bán</th>
                <th>Doanh thu</th>
                <th>Lợi nhuận</th>
                <th>Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>
              {thongKeData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-message">Không có dữ liệu</td>
                </tr>
              ) : (
                thongKeData.map((item, index) => (
                  <tr key={item.maMatHang}>
                    <td>{index + 1}</td>
                    <td>{item.tenMatHang}</td>
                    <td>{item.soLuongBan}</td>
                    <td>{item.doanhThu.toLocaleString('vi-VN')} VNĐ</td>
                    <td>{item.loiNhuan.toLocaleString('vi-VN')} VNĐ</td>
                    <td>
                      {tongDoanhThu > 0
                        ? ((item.doanhThu / tongDoanhThu) * 100).toFixed(1)
                        : 0}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GDThongKeMH;


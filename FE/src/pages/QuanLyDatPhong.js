/**
 * Component: QuanLyDatPhong
 * Mô tả: Giao diện quản lý đặt phòng
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './QuanLyDatPhong.css';

function QuanLyDatPhong() {
  const navigate = useNavigate();
  const [phieuDatList, setPhieuDatList] = useState([]);
  const [filterTrangThai, setFilterTrangThai] = useState('');

  useEffect(() => {
    fetchPhieuDatList();
  }, [filterTrangThai]);

  const fetchPhieuDatList = async () => {
    try {
      let data;
      if (filterTrangThai) {
        data = await apiService.getPhieuDatByTrangThai(filterTrangThai);
      } else {
        data = await apiService.getPhieuDatList();
      }
      if (data.success) {
        setPhieuDatList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phiếu đặt:', error);
      alert('Có lỗi xảy ra khi lấy danh sách phiếu đặt');
    }
  };

  const handleDatPhong = () => {
    navigate('/tao-phieu-dat');
  };

  const handleThanhToan = (maPhieuDat) => {
    navigate(`/thanh-toan/${maPhieuDat}`);
  };

  const handleXemChiTiet = (maPhieuDat) => {
    navigate(`/chi-tiet-phieu-dat/${maPhieuDat}`);
  };

  const handleDelete = async (maPhieuDat) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phiếu đặt này?')) {
      return;
    }

    try {
      const data = await apiService.deletePhieuDat(maPhieuDat);
      if (data.success) {
        alert('Xóa phiếu đặt thành công!');
        fetchPhieuDatList();
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi xóa phiếu đặt: ' + (error.message || error));
    }
  };

  const getTrangThaiLabel = (trangThai) => {
    const labels = {
      'DA_DAT': 'Đã đặt',
      'DANG_SU_DUNG': 'Đang sử dụng',
      'HOAN_THANH': 'Hoàn thành',
      'HUY': 'Hủy'
    };
    return labels[trangThai] || trangThai;
  };

  const getTrangThaiClass = (trangThai) => {
    const classes = {
      'DA_DAT': 'status-da-dat',
      'DANG_SU_DUNG': 'status-dang-su-dung',
      'HOAN_THANH': 'status-hoan-thanh',
      'HUY': 'status-huy'
    };
    return classes[trangThai] || '';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
  };

  return (
    <div className="quan-ly-dat-phong">
      <div className="section-header">
        <h2>Quản Lý Đặt Phòng</h2>
        <button className="btn btn-primary" onClick={handleDatPhong}>
          + Đặt Phòng
        </button>
      </div>

      <div className="filter-section">
        <div className="form-group">
          <label>Lọc theo trạng thái</label>
          <select
            value={filterTrangThai}
            onChange={(e) => setFilterTrangThai(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="DA_DAT">Đã đặt</option>
            <option value="DANG_SU_DUNG">Đang sử dụng</option>
            <option value="HOAN_THANH">Hoàn thành</option>
            <option value="HUY">Hủy</option>
          </select>
        </div>
      </div>

      <div className="phieu-dat-table">
        {phieuDatList.length === 0 ? (
          <p className="empty-message">Chưa có phiếu đặt nào. Hãy đặt phòng mới!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã phiếu</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {phieuDatList.map((pd, index) => (
                <tr key={pd.maPhieuDat}>
                  <td>{index + 1}</td>
                  <td>PD{pd.maPhieuDat}</td>
                  <td>{pd.maKhachHang ? `KH${pd.maKhachHang}` : 'N/A'}</td>
                  <td>{formatDate(pd.ngayDat)}</td>
                  <td>{parseFloat(pd.tongTien || 0).toLocaleString('vi-VN')} VNĐ</td>
                  <td>
                    <span className={`status-badge ${getTrangThaiClass(pd.trangThai)}`}>
                      {getTrangThaiLabel(pd.trangThai)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-small btn-info"
                        onClick={() => handleXemChiTiet(pd.maPhieuDat)}
                      >
                        Chi tiết
                      </button>
                      {(pd.trangThai === 'DA_DAT' || pd.trangThai === 'DANG_SU_DUNG') && (
                        <button
                          className="btn btn-small btn-success"
                          onClick={() => handleThanhToan(pd.maPhieuDat)}
                        >
                          Thanh toán
                        </button>
                      )}
                      {pd.trangThai !== 'HOAN_THANH' && (
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() => handleDelete(pd.maPhieuDat)}
                        >
                          Xóa
                        </button>
                      )}
                    </div>
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

export default QuanLyDatPhong;


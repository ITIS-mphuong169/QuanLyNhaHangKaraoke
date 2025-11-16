/**
 * Component: GDChiTietHD (Bill Detail)
 * Mô tả: Giao diện chi tiết hóa đơn
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './GDChiTietHD.css';

function GDChiTietHD() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hoaDon, setHoaDon] = useState(null);
  const [chiTietList, setChiTietList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChiTietHD();
  }, [id]);

  const fetchChiTietHD = async () => {
    setLoading(true);
    try {
      const hdData = await apiService.getHoaDonById(id);
      if (hdData.success) {
        setHoaDon(hdData.data);
        // TODO: Gọi API lấy chi tiết hóa đơn
        // const ctData = await apiService.getChiTietHoaDon(id);
        // if (ctData.success) setChiTietList(ctData.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết hóa đơn:', error);
      setLoading(false);
    }
  };

  const handleInHoaDon = () => {
    window.print();
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!hoaDon) {
    return <div className="error">Không tìm thấy hóa đơn</div>;
  }

  return (
    <div className="gd-chi-tiet-hd">
      <div className="section-header">
        <h2>Chi Tiết Hóa Đơn #{hoaDon.maHoaDon}</h2>
        <div>
          <button className="btn btn-primary" onClick={handleInHoaDon}>
            In Hóa Đơn
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/danh-sach-hoa-don')}>
            Quay lại
          </button>
        </div>
      </div>

      <div className="hoa-don-info">
        <div className="info-section">
          <h3>Thông Tin Hóa Đơn</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Mã hóa đơn:</label>
              <span>HD{hoaDon.maHoaDon}</span>
            </div>
            <div className="info-item">
              <label>Ngày lập:</label>
              <span>{new Date(hoaDon.ngayLap).toLocaleString('vi-VN')}</span>
            </div>
            <div className="info-item">
              <label>Trạng thái:</label>
              <span className={`status-badge status-${hoaDon.trangThai.toLowerCase()}`}>
                {hoaDon.trangThai === 'DA_THANH_TOAN' ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </span>
            </div>
            <div className="info-item">
              <label>Phương thức thanh toán:</label>
              <span>{hoaDon.phuongThucThanhToan || 'Tiền mặt'}</span>
            </div>
          </div>
        </div>

        <div className="chi-tiet-section">
          <h3>Chi Tiết Hóa Đơn</h3>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên mặt hàng</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {chiTietList.map((ct, index) => (
                <tr key={ct.maChiTiet}>
                  <td>{index + 1}</td>
                  <td>{ct.tenMatHang}</td>
                  <td>{ct.soLuong}</td>
                  <td>{parseFloat(ct.donGia).toLocaleString('vi-VN')} VNĐ</td>
                  <td>{parseFloat(ct.thanhTien).toLocaleString('vi-VN')} VNĐ</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>Tổng tiền:</td>
                <td style={{ fontWeight: 'bold' }}>
                  {parseFloat(hoaDon.thanhTien).toLocaleString('vi-VN')} VNĐ
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GDChiTietHD;


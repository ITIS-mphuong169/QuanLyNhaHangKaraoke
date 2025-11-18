/**
 * Component: GDPhieuNhap (Import Receipt)
 * Mô tả: Giao diện xem phiếu nhập hàng
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './GDPhieuNhap.css';

function GDPhieuNhap() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [phieuNhap, setPhieuNhap] = useState(null);
  const [chiTietList, setChiTietList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhieuNhap();
  }, [id]);

  const fetchPhieuNhap = async () => {
    setLoading(true);
    try {
      const data = await apiService.getNhapHangById(id);
      if (data.success) {
        setPhieuNhap(data.data);
        setChiTietList(data.data.chiTiet || []);
      }
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy phiếu nhập:', error);
      setLoading(false);
    }
  };

  const handleInPhieu = () => {
    window.print();
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!phieuNhap) {
    return <div className="error">Không tìm thấy phiếu nhập</div>;
  }

  return (
    <div className="gd-phieu-nhap">
      <div className="section-header">
        <h2>Phiếu Nhập Hàng #{phieuNhap.maNhapHang}</h2>
        <div>
          <button className="btn btn-primary" onClick={handleInPhieu}>
            In Phiếu
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/tao-phieu-nhap')}>
            Quay lại
          </button>
        </div>
      </div>

      <div className="phieu-nhap-info">
        <div className="info-section">
          <h3>Thông Tin Phiếu Nhập</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Mã phiếu nhập:</label>
              <span>PN{phieuNhap.maNhapHang}</span>
            </div>
            <div className="info-item">
              <label>Nhà cung cấp:</label>
              <span>{phieuNhap.tenNhaCungCap || 'N/A'}</span>
            </div>
            <div className="info-item">
              <label>Ngày nhập:</label>
              <span>{new Date(phieuNhap.ngayNhap).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="info-item">
              <label>Tổng tiền:</label>
              <span>{parseFloat(phieuNhap.tongTien).toLocaleString('vi-VN')} VNĐ</span>
            </div>
          </div>
        </div>

        <div className="chi-tiet-section">
          <h3>Chi Tiết Nhập Hàng</h3>
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
                  {parseFloat(phieuNhap.tongTien).toLocaleString('vi-VN')} VNĐ
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GDPhieuNhap;


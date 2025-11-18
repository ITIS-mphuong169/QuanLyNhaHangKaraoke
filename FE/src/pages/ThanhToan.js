/**
 * Component: ThanhToan
 * Mô tả: Giao diện thanh toán phiếu đặt phòng
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import GDChonMH from './GDChonMH';
import './ThanhToan.css';

function ThanhToan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [phieuDat, setPhieuDat] = useState(null);
  const [matHangList, setMatHangList] = useState([]);
  const [showChonMatHang, setShowChonMatHang] = useState(false);
  const [chiTietList, setChiTietList] = useState([]);
  const [formData, setFormData] = useState({
    giamGia: 0,
    phuongThucThanhToan: '',
    ghiChu: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPhieuDat();
      fetchMatHangList();
    }
  }, [id]);

  const fetchPhieuDat = async () => {
    setLoading(true);
    try {
      const data = await apiService.getPhieuDatById(id);
      if (data.success) {
        setPhieuDat(data.data);
        setChiTietList(data.data.chiTiet || []);
        setFormData({
          giamGia: data.data.giamGia || 0,
          phuongThucThanhToan: data.data.phuongThucThanhToan || '',
          ghiChu: data.data.ghiChu || ''
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin phiếu đặt:', error);
      alert('Có lỗi xảy ra khi lấy thông tin phiếu đặt');
      setLoading(false);
    }
  };

  const fetchMatHangList = async () => {
    try {
      const data = await apiService.getMatHangList();
      if (data.success) {
        setMatHangList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách mặt hàng:', error);
    }
  };

  const handleSelectMatHang = (matHang) => {
    const existingIndex = chiTietList.findIndex(ct => ct.maMatHang === matHang.maMatHang);
    if (existingIndex >= 0) {
      const updated = [...chiTietList];
      updated[existingIndex].soLuong += 1;
      setChiTietList(updated);
    } else {
      setChiTietList([...chiTietList, {
        maMatHang: matHang.maMatHang,
        tenMatHang: matHang.tenMatHang,
        soLuong: 1
      }]);
    }
    setShowChonMatHang(false);
  };

  const handleUpdateChiTiet = (index, field, value) => {
    const updated = [...chiTietList];
    updated[index][field] = value;
    setChiTietList(updated);
  };

  const handleRemoveChiTiet = (index) => {
    setChiTietList(chiTietList.filter((_, i) => i !== index));
  };

  const calculateTienMatHang = () => {
    let tong = 0;
    for (const ct of chiTietList) {
      const matHang = matHangList.find(mh => mh.maMatHang === ct.maMatHang);
      if (matHang) {
        tong += parseFloat(matHang.giaBan || 0) * parseInt(ct.soLuong || 0);
      }
    }
    return Math.round(tong);
  };

  const calculateTongTien = () => {
    const tienPhong = phieuDat ? Math.round(parseFloat(phieuDat.tienPhong || 0)) : 0;
    const tienMatHang = calculateTienMatHang();
    const giamGia = Math.round(parseFloat(formData.giamGia) || 0);
    return Math.max(0, tienPhong + tienMatHang - giamGia);
  };

  const handleGiamGiaChange = (value) => {
    const giamGia = Math.round(parseFloat(value) || 0);
    setFormData({ ...formData, giamGia });
  };

  const handlePercentChange = (percent) => {
    const tienPhong = phieuDat ? Math.round(parseFloat(phieuDat.tienPhong || 0)) : 0;
    const tienMatHang = calculateTienMatHang();
    const tongTruocGiam = tienPhong + tienMatHang;
    const giamGia = Math.round((tongTruocGiam * parseFloat(percent || 0)) / 100);
    setFormData({ ...formData, giamGia });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!window.confirm('Bạn có chắc chắn muốn xác nhận thanh toán? Sau khi thanh toán, các phòng sẽ chuyển về trạng thái trống.')) {
      return;
    }

    try {
      const thanhToanData = {
        chiTiet: chiTietList.map(ct => ({
          maMatHang: parseInt(ct.maMatHang),
          tenMatHang: ct.tenMatHang,
          soLuong: parseInt(ct.soLuong) || 0
        })),
        giamGia: parseFloat(formData.giamGia) || 0,
        phuongThucThanhToan: formData.phuongThucThanhToan || null,
        ghiChu: formData.ghiChu || null
      };

      const data = await apiService.thanhToanPhieuDat(id, thanhToanData);
      if (data.success) {
        alert('Thanh toán thành công!');
        navigate('/dat-phong');
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi thanh toán: ' + (error.message || error));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!phieuDat) {
    return <div className="error">Không tìm thấy phiếu đặt</div>;
  }

  const tienPhong = Math.round(parseFloat(phieuDat.tienPhong || 0));
  const tienMatHang = calculateTienMatHang();
  const giamGia = Math.round(parseFloat(formData.giamGia) || 0);
  const tongTien = calculateTongTien();
  const tongTruocGiam = tienPhong + tienMatHang;

  return (
    <div className="thanh-toan">
      <div className="section-header">
        <h2>Thanh Toán Phiếu Đặt Phòng</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/dat-phong')}>
          Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Thông Tin Phiếu Đặt</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Mã phiếu:</label>
              <span>PD{phieuDat.maPhieuDat}</span>
            </div>
            <div className="info-item">
              <label>Ngày đặt:</label>
              <span>{formatDate(phieuDat.ngayDat)}</span>
            </div>
            <div className="info-item">
              <label>Trạng thái:</label>
              <span>{phieuDat.trangThai}</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Phòng Đã Đặt</h3>
          {phieuDat.phongDat && phieuDat.phongDat.length > 0 ? (
            <table className="phong-dat-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã phòng</th>
                  <th>Giờ bắt đầu</th>
                  <th>Giờ kết thúc</th>
                  <th>Số giờ</th>
                </tr>
              </thead>
              <tbody>
                {phieuDat.phongDat.map((pd, index) => (
                  <tr key={pd.maPhongDat}>
                    <td>{index + 1}</td>
                    <td>P{pd.maPhong}</td>
                    <td>{formatDate(pd.gioBatDau)}</td>
                    <td>{formatDate(pd.gioKetThuc)}</td>
                    <td>{parseFloat(pd.soGio || 0).toFixed(2)} giờ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="empty-message">Chưa có phòng nào</p>
          )}
        </div>

        <div className="form-section">
          <div className="section-header-small">
            <h3>Mặt Hàng Bán Kèm</h3>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowChonMatHang(true)}
            >
              + Thêm Mặt Hàng
            </button>
          </div>

          {chiTietList.length === 0 ? (
            <p className="empty-message">Chưa có mặt hàng nào. Hãy thêm mặt hàng!</p>
          ) : (
            <table className="chi-tiet-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mặt hàng</th>
                  <th>Giá bán</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {chiTietList.map((ct, index) => {
                  const matHang = matHangList.find(mh => mh.maMatHang === ct.maMatHang);
                  const donGia = matHang ? Math.round(parseFloat(matHang.giaBan || 0)) : 0;
                  const thanhTien = Math.round(donGia * parseInt(ct.soLuong || 0));
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ct.tenMatHang}</td>
                      <td>{donGia.toLocaleString('vi-VN')} VNĐ</td>
                      <td>
                        <input
                          type="number"
                          value={ct.soLuong}
                          onChange={(e) => handleUpdateChiTiet(index, 'soLuong', parseInt(e.target.value) || 0)}
                          min="1"
                          style={{ width: '80px' }}
                          required
                        />
                      </td>
                      <td>{thanhTien.toLocaleString('vi-VN')} VNĐ</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-small btn-danger"
                          onClick={() => handleRemoveChiTiet(index)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="form-section">
          <h3>Thông Tin Thanh Toán</h3>
          <div className="tien-info">
            <div className="tien-item">
              <label>Tiền phòng:</label>
              <span>{tienPhong.toLocaleString('vi-VN')} VNĐ</span>
            </div>
            <div className="tien-item">
              <label>Tiền mặt hàng:</label>
              <span>{tienMatHang.toLocaleString('vi-VN')} VNĐ</span>
            </div>
            <div className="tien-item">
              <label>Tổng trước giảm:</label>
              <span>{tongTruocGiam.toLocaleString('vi-VN')} VNĐ</span>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>% Giảm giá</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="Nhập % giảm giá"
                  onChange={(e) => handlePercentChange(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Số tiền giảm giá (VNĐ)</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={giamGia}
                  onChange={(e) => handleGiamGiaChange(e.target.value)}
                />
              </div>
            </div>
            <div className="tien-item tong-tien">
              <label>Tổng tiền thanh toán:</label>
              <span>{tongTien.toLocaleString('vi-VN')} VNĐ</span>
            </div>
            <div className="form-group">
              <label>Phương thức thanh toán</label>
              <select
                value={formData.phuongThucThanhToan}
                onChange={(e) => setFormData({ ...formData, phuongThucThanhToan: e.target.value })}
              >
                <option value="">Chọn phương thức</option>
                <option value="TIEN_MAT">Tiền mặt</option>
                <option value="CHUYEN_KHOAN">Chuyển khoản</option>
                <option value="THE">Thẻ</option>
              </select>
            </div>
            <div className="form-group">
              <label>Ghi chú</label>
              <textarea
                value={formData.ghiChu}
                onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
                rows="3"
                placeholder="Nhập ghi chú (nếu có)"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-large">
            Xác Nhận Thanh Toán
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/dat-phong')}>
            Hủy
          </button>
        </div>
      </form>

      {showChonMatHang && (
        <GDChonMH
          onSelect={handleSelectMatHang}
          onClose={() => setShowChonMatHang(false)}
        />
      )}
    </div>
  );
}

export default ThanhToan;


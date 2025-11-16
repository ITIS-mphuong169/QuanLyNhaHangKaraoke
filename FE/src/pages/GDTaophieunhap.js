/**
 * Component: GDTaophieunhap (Create Import Receipt)
 * Mô tả: Giao diện tạo phiếu nhập hàng
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './GDTaophieunhap.css';

function GDTaophieunhap() {
  const navigate = useNavigate();
  const [nhaCungCapList, setNhaCungCapList] = useState([]);
  const [matHangList, setMatHangList] = useState([]);
  const [selectedNCC, setSelectedNCC] = useState('');
  const [chiTietNhap, setChiTietNhap] = useState([]);
  const [formData, setFormData] = useState({
    maNhaCungCap: '',
    ngayNhap: new Date().toISOString().split('T')[0],
    ghiChu: ''
  });

  useEffect(() => {
    fetchNhaCungCap();
    fetchMatHang();
  }, []);

  const fetchNhaCungCap = async () => {
    try {
      const data = await apiService.getNhaCungCapList();
      if (data.success) {
        setNhaCungCapList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhà cung cấp:', error);
    }
  };

  const fetchMatHang = async () => {
    try {
      const data = await apiService.getMatHangList();
      if (data.success) {
        setMatHangList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách mặt hàng:', error);
    }
  };

  const handleAddMatHang = () => {
    setChiTietNhap([...chiTietNhap, {
      maMatHang: '',
      tenMatHang: '',
      soLuong: 0,
      donGia: 0,
      thanhTien: 0
    }]);
  };

  const handleUpdateChiTiet = (index, field, value) => {
    const updated = [...chiTietNhap];
    updated[index][field] = value;
    if (field === 'soLuong' || field === 'donGia') {
      updated[index].thanhTien = updated[index].soLuong * updated[index].donGia;
    }
    setChiTietNhap(updated);
  };

  const handleRemoveChiTiet = (index) => {
    setChiTietNhap(chiTietNhap.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.maNhaCungCap) {
      alert('Vui lòng chọn nhà cung cấp');
      return;
    }
    if (chiTietNhap.length === 0) {
      alert('Vui lòng thêm ít nhất một mặt hàng');
      return;
    }

    try {
      const nhapHangData = {
        ...formData,
        chiTiet: chiTietNhap.map(ct => ({
          maMatHang: ct.maMatHang,
          tenMatHang: ct.tenMatHang,
          soLuong: ct.soLuong,
          donGia: ct.donGia,
          thanhTien: ct.thanhTien
        }))
      };

      const data = await apiService.createNhapHang(nhapHangData);
      if (data.success) {
        alert('Tạo phiếu nhập thành công!');
        navigate(`/phieu-nhap/${data.data.maNhapHang}`);
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      alert('Có lỗi xảy ra: ' + error.message);
    }
  };

  const tongTien = chiTietNhap.reduce((sum, item) => sum + item.thanhTien, 0);

  return (
    <div className="gd-tao-phieu-nhap">
      <div className="section-header">
        <h2>Tạo Phiếu Nhập Hàng</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Thông Tin Phiếu Nhập</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nhà cung cấp *</label>
              <select
                value={formData.maNhaCungCap}
                onChange={(e) => setFormData({ ...formData, maNhaCungCap: e.target.value })}
                required
              >
                <option value="">Chọn nhà cung cấp</option>
                {nhaCungCapList.map(ncc => (
                  <option key={ncc.maNhaCungCap} value={ncc.maNhaCungCap}>
                    {ncc.tenNhaCungCap}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Ngày nhập *</label>
              <input
                type="date"
                value={formData.ngayNhap}
                onChange={(e) => setFormData({ ...formData, ngayNhap: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Ghi chú</label>
            <textarea
              value={formData.ghiChu}
              onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
              rows="3"
            />
          </div>
        </div>

        <div className="form-section">
          <div className="section-header-small">
            <h3>Chi Tiết Nhập Hàng</h3>
            <button type="button" className="btn btn-secondary" onClick={handleAddMatHang}>
              + Thêm Mặt Hàng
            </button>
          </div>

          {chiTietNhap.length === 0 ? (
            <p className="empty-message">Chưa có mặt hàng nào. Hãy thêm mặt hàng!</p>
          ) : (
            <table className="chi-tiet-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mặt hàng</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {chiTietNhap.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <select
                        value={item.maMatHang}
                        onChange={(e) => {
                          const selected = matHangList.find(mh => mh.maMatHang === e.target.value);
                          handleUpdateChiTiet(index, 'maMatHang', e.target.value);
                          handleUpdateChiTiet(index, 'tenMatHang', selected?.tenMatHang || '');
                        }}
                        required
                      >
                        <option value="">Chọn mặt hàng</option>
                        {matHangList.map(mh => (
                          <option key={mh.maMatHang} value={mh.maMatHang}>
                            {mh.tenMatHang}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.soLuong}
                        onChange={(e) => handleUpdateChiTiet(index, 'soLuong', parseInt(e.target.value))}
                        min="1"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.donGia}
                        onChange={(e) => handleUpdateChiTiet(index, 'donGia', parseFloat(e.target.value))}
                        min="0"
                        step="1000"
                        required
                      />
                    </td>
                    <td>{item.thanhTien.toLocaleString('vi-VN')} VNĐ</td>
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
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>Tổng tiền:</td>
                  <td style={{ fontWeight: 'bold' }}>{tongTien.toLocaleString('vi-VN')} VNĐ</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Tạo Phiếu Nhập
          </button>
          <button type="button" className="btn btn-secondary">
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default GDTaophieunhap;


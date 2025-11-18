/**
 * Component: TaoPhieuDat
 * Mô tả: Giao diện tạo phiếu đặt phòng
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import GDChonMH from './GDChonMH';
import './TaoPhieuDat.css';

function TaoPhieuDat() {
  const navigate = useNavigate();
  const [phongList, setPhongList] = useState([]);
  const [khachHangList, setKhachHangList] = useState([]);
  const [matHangList, setMatHangList] = useState([]);
  const [showKhachHangForm, setShowKhachHangForm] = useState(false);
  const [showChonMatHang, setShowChonMatHang] = useState(false);
  const [phongDatList, setPhongDatList] = useState([]);
  const [chiTietList, setChiTietList] = useState([]);
  const [formData, setFormData] = useState({
    maKhachHang: '',
    ghiChu: ''
  });
  const [khachHangForm, setKhachHangForm] = useState({
    hoTen: '',
    soDienThoai: '',
    email: '',
    diaChi: '',
    ngaySinh: '',
    gioiTinh: '',
    loaiKhachHang: 'THUONG'
  });

  useEffect(() => {
    fetchPhongTrong();
    fetchKhachHangList();
    fetchMatHangList();
  }, []);

  const fetchPhongTrong = async () => {
    try {
      const data = await apiService.getPhongTrong();
      if (data.success) {
        setPhongList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phòng trống:', error);
    }
  };

  const fetchKhachHangList = async () => {
    try {
      const data = await apiService.getKhachHangList();
      if (data.success) {
        setKhachHangList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách khách hàng:', error);
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

  const handleCreateKhachHang = async (e) => {
    e.preventDefault();
    try {
      const data = await apiService.createKhachHang(khachHangForm);
      if (data.success) {
        alert('Thêm khách hàng thành công!');
        setFormData({ ...formData, maKhachHang: data.data.maKhachHang });
        setShowKhachHangForm(false);
        fetchKhachHangList();
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi thêm khách hàng: ' + (error.message || error));
    }
  };

  const handleAddPhong = () => {
    setPhongDatList([...phongDatList, {
      maPhong: '',
      gioBatDau: '',
      gioKetThuc: '',
      soGio: 0
    }]);
  };

  const handleUpdatePhongDat = (index, field, value) => {
    const updated = [...phongDatList];
    updated[index][field] = value;

    // Tính số giờ tự động
    if (field === 'gioBatDau' || field === 'gioKetThuc') {
      if (updated[index].gioBatDau && updated[index].gioKetThuc) {
        const start = new Date(updated[index].gioBatDau);
        const end = new Date(updated[index].gioKetThuc);
        const diffMs = end - start;
        const diffHours = diffMs / (1000 * 60 * 60);
        updated[index].soGio = Math.max(0, parseFloat(diffHours.toFixed(2)));
      }
    }

    setPhongDatList(updated);
  };

  const handleRemovePhongDat = (index) => {
    setPhongDatList(phongDatList.filter((_, i) => i !== index));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.maKhachHang) {
      alert('Vui lòng chọn khách hàng');
      return;
    }
    
    if (phongDatList.length === 0) {
      alert('Vui lòng thêm ít nhất một phòng');
      return;
    }

    // Validate giờ bắt đầu và kết thúc
    for (const pd of phongDatList) {
      if (!pd.maPhong || !pd.gioBatDau || !pd.gioKetThuc) {
        alert('Vui lòng điền đầy đủ thông tin phòng');
        return;
      }
      if (new Date(pd.gioKetThuc) <= new Date(pd.gioBatDau)) {
        alert('Giờ kết thúc phải lớn hơn giờ bắt đầu');
        return;
      }
    }

    try {
      const phieuDatData = {
        maKhachHang: parseInt(formData.maKhachHang),
        maNhanVien: 1, // Tạm thời để là 1
        ngayDat: new Date(),
        phongDat: phongDatList.map(pd => ({
          maPhong: parseInt(pd.maPhong),
          gioBatDau: pd.gioBatDau,
          gioKetThuc: pd.gioKetThuc,
          soGio: pd.soGio
        })),
        chiTiet: chiTietList.map(ct => ({
          maMatHang: parseInt(ct.maMatHang),
          tenMatHang: ct.tenMatHang,
          soLuong: parseInt(ct.soLuong) || 0
        })),
        ghiChu: formData.ghiChu || null
      };

      const data = await apiService.createPhieuDat(phieuDatData);
      if (data.success) {
        alert('Tạo phiếu đặt thành công!');
        navigate('/dat-phong');
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi tạo phiếu đặt: ' + (error.message || error));
    }
  };

  return (
    <div className="tao-phieu-dat">
      <div className="section-header">
        <h2>Tạo Phiếu Đặt Phòng</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/dat-phong')}>
          Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Thông Tin Khách Hàng</h3>
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label>Khách hàng *</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <select
                  value={formData.maKhachHang}
                  onChange={(e) => setFormData({ ...formData, maKhachHang: e.target.value })}
                  required
                  style={{ flex: 1 }}
                >
                  <option value="">Chọn khách hàng</option>
                  {khachHangList.map(kh => (
                    <option key={kh.maKhachHang} value={kh.maKhachHang}>
                      {kh.hoTen} - {kh.soDienThoai}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowKhachHangForm(true)}
                >
                  + Thêm mới
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header-small">
            <h3>Phòng Đặt</h3>
            <button type="button" className="btn btn-secondary" onClick={handleAddPhong}>
              + Thêm Phòng
            </button>
          </div>

          {phongDatList.length === 0 ? (
            <p className="empty-message">Chưa có phòng nào. Hãy thêm phòng!</p>
          ) : (
            <table className="phong-dat-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Phòng</th>
                  <th>Giờ bắt đầu</th>
                  <th>Giờ kết thúc</th>
                  <th>Số giờ</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {phongDatList.map((pd, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <select
                        value={pd.maPhong}
                        onChange={(e) => handleUpdatePhongDat(index, 'maPhong', e.target.value)}
                        required
                      >
                        <option value="">Chọn phòng</option>
                        {phongList.map(p => (
                          <option key={p.maPhong} value={p.maPhong}>
                            {p.tenPhong} - {p.loaiPhong} ({p.giaGio.toLocaleString('vi-VN')} VNĐ/giờ)
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="datetime-local"
                        value={pd.gioBatDau}
                        onChange={(e) => handleUpdatePhongDat(index, 'gioBatDau', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="datetime-local"
                        value={pd.gioKetThuc}
                        onChange={(e) => handleUpdatePhongDat(index, 'gioKetThuc', e.target.value)}
                        required
                      />
                    </td>
                    <td>{pd.soGio.toFixed(2)} giờ</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-small btn-danger"
                        onClick={() => handleRemovePhongDat(index)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  <th>Số lượng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {chiTietList.map((ct, index) => {
                  const matHang = matHangList.find(mh => mh.maMatHang === ct.maMatHang);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ct.tenMatHang}</td>
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
          <h3>Ghi Chú</h3>
          <div className="form-group">
            <textarea
              value={formData.ghiChu}
              onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
              rows="3"
              placeholder="Nhập ghi chú (nếu có)"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Tạo Phiếu Đặt
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/dat-phong')}>
            Hủy
          </button>
        </div>
      </form>

      {showKhachHangForm && (
        <div className="modal-overlay" onClick={() => setShowKhachHangForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Thêm Khách Hàng Mới</h3>
            <form onSubmit={handleCreateKhachHang}>
              <div className="form-group">
                <label>Họ tên *</label>
                <input
                  type="text"
                  value={khachHangForm.hoTen}
                  onChange={(e) => setKhachHangForm({ ...khachHangForm, hoTen: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Số điện thoại *</label>
                <input
                  type="text"
                  value={khachHangForm.soDienThoai}
                  onChange={(e) => setKhachHangForm({ ...khachHangForm, soDienThoai: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={khachHangForm.email}
                  onChange={(e) => setKhachHangForm({ ...khachHangForm, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  value={khachHangForm.diaChi}
                  onChange={(e) => setKhachHangForm({ ...khachHangForm, diaChi: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Thêm Mới
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowKhachHangForm(false)}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showChonMatHang && (
        <GDChonMH
          onSelect={handleSelectMatHang}
          onClose={() => setShowChonMatHang(false)}
        />
      )}
    </div>
  );
}

export default TaoPhieuDat;


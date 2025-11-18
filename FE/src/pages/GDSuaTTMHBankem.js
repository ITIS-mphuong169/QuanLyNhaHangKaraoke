/**
 * Component: GDSuaTTMHBankem (Edit Related Item)
 * Mô tả: Giao diện sửa thông tin mặt hàng bán kèm
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './GDSuaTTMHBankem.css';

function GDSuaTTMHBankem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenMatHang: '',
    donViTinh: '',
    giaBan: '',
    giaNhap: '',
    tonKho: '',
    moTa: '',
    maNhaCungCap: ''
  });
  const [nhaCungCapList, setNhaCungCapList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNhaCungCapList();
    if (id) {
      fetchMatHang();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchNhaCungCapList = async () => {
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
    setLoading(true);
    try {
      const data = await apiService.getMatHangById(id);
      if (data.success) {
        const mh = data.data;
        setFormData({
          tenMatHang: mh.tenMatHang,
          donViTinh: mh.donViTinh,
          giaBan: mh.giaBan,
          giaNhap: mh.giaNhap || '',
          tonKho: mh.tonKho,
          moTa: mh.moTa || '',
          maNhaCungCap: mh.maNhaCungCap || ''
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin mặt hàng:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = id
        ? await apiService.updateMatHang(id, formData)
        : await apiService.createMatHang(formData);

      if (data.success) {
        alert(id ? 'Cập nhật mặt hàng thành công!' : 'Thêm mặt hàng thành công!');
        navigate('/mat-hang');
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi lưu mặt hàng');
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="gd-sua-tt-mh-bankem">
      <div className="section-header">
        <h2>{id ? 'Sửa Thông Tin Mặt Hàng' : 'Thêm Mặt Hàng Mới'}</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/mat-hang')}>
          Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-section">
          <h3>Thông Tin Cơ Bản</h3>
          <div className="form-group">
            <label>Tên mặt hàng *</label>
            <input
              type="text"
              value={formData.tenMatHang}
              onChange={(e) => setFormData({ ...formData, tenMatHang: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Đơn vị tính *</label>
            <input
              type="text"
              value={formData.donViTinh}
              onChange={(e) => setFormData({ ...formData, donViTinh: e.target.value })}
              placeholder="Ví dụ: chai, hộp, đĩa..."
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Thông Tin Giá và Tồn Kho</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Giá nhập (VNĐ)</label>
              <input
                type="number"
                value={formData.giaNhap}
                onChange={(e) => setFormData({ ...formData, giaNhap: e.target.value })}
                min="0"
                step="1000"
              />
            </div>
            <div className="form-group">
              <label>Giá bán (VNĐ) *</label>
              <input
                type="number"
                value={formData.giaBan}
                onChange={(e) => setFormData({ ...formData, giaBan: e.target.value })}
                min="0"
                step="1000"
                required
              />
            </div>
            <div className="form-group">
              <label>Tồn kho *</label>
              <input
                type="number"
                value={formData.tonKho}
                onChange={(e) => setFormData({ ...formData, tonKho: e.target.value })}
                min="0"
                required
              />
            </div>
          </div>
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
        </div>

        <div className="form-section">
          <h3>Mô Tả</h3>
          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              value={formData.moTa}
              onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
              rows="4"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {id ? 'Cập Nhật' : 'Thêm Mới'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/mat-hang')}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default GDSuaTTMHBankem;


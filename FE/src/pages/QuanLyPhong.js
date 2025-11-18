/**
 * Component: QuanLyPhong
 * Mô tả: Giao diện quản lý phòng karaoke
 */
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import './QuanLyPhong.css';

function QuanLyPhong() {
  const [phongList, setPhongList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPhong, setEditingPhong] = useState(null);
  const [formData, setFormData] = useState({
    tenPhong: '',
    loaiPhong: '',
    sucChua: '',
    giaGio: '',
    moTa: '',
    trangThai: 'TRONG'
  });

  useEffect(() => {
    fetchPhongList();
  }, []);

  const fetchPhongList = async () => {
    try {
      const data = await apiService.getPhongList();
      if (data.success) {
        setPhongList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phòng:', error);
      alert('Có lỗi xảy ra khi lấy danh sách phòng');
    }
  };

  const handleAdd = () => {
    setEditingPhong(null);
    setFormData({
      tenPhong: '',
      loaiPhong: '',
      sucChua: '',
      giaGio: '',
      moTa: '',
      trangThai: 'TRONG'
    });
    setShowForm(true);
  };

  const handleEdit = (phong) => {
    setEditingPhong(phong);
    setFormData({
      tenPhong: phong.tenPhong,
      loaiPhong: phong.loaiPhong,
      sucChua: phong.sucChua,
      giaGio: phong.giaGio,
      moTa: phong.moTa || '',
      trangThai: phong.trangThai
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        sucChua: parseInt(formData.sucChua) || 0,
        giaGio: parseFloat(formData.giaGio) || 0
      };

      let data;
      if (editingPhong) {
        data = await apiService.updatePhong(editingPhong.maPhong, submitData);
      } else {
        data = await apiService.createPhong(submitData);
      }

      if (data.success) {
        alert(editingPhong ? 'Cập nhật phòng thành công!' : 'Thêm phòng thành công!');
        setShowForm(false);
        fetchPhongList();
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi lưu phòng: ' + (error.message || error));
    }
  };

  const handleDelete = async (maPhong) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phòng này?')) {
      return;
    }

    try {
      const data = await apiService.deletePhong(maPhong);
      if (data.success) {
        alert('Xóa phòng thành công!');
        fetchPhongList();
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi xóa phòng: ' + (error.message || error));
    }
  };

  const handleUpdateTrangThai = async (maPhong, trangThai) => {
    try {
      const data = await apiService.updatePhongTrangThai(maPhong, trangThai);
      if (data.success) {
        fetchPhongList();
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái: ' + (error.message || error));
    }
  };

  const getTrangThaiLabel = (trangThai) => {
    const labels = {
      'TRONG': 'Trống',
      'DANG_SU_DUNG': 'Đang sử dụng',
      'BAO_TRI': 'Bảo trì'
    };
    return labels[trangThai] || trangThai;
  };

  const getTrangThaiClass = (trangThai) => {
    const classes = {
      'TRONG': 'status-trong',
      'DANG_SU_DUNG': 'status-dang-su-dung',
      'BAO_TRI': 'status-bao-tri'
    };
    return classes[trangThai] || '';
  };

  return (
    <div className="quan-ly-phong">
      <div className="section-header">
        <h2>Quản Lý Phòng Karaoke</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          + Thêm Phòng Mới
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingPhong ? 'Chỉnh Sửa Phòng' : 'Thêm Phòng Mới'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên phòng *</label>
                <input
                  type="text"
                  value={formData.tenPhong}
                  onChange={(e) => setFormData({ ...formData, tenPhong: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Loại phòng *</label>
                <select
                  value={formData.loaiPhong}
                  onChange={(e) => setFormData({ ...formData, loaiPhong: e.target.value })}
                  required
                >
                  <option value="">Chọn loại phòng</option>
                  <option value="VIP">VIP</option>
                  <option value="Thường">Thường</option>
                  <option value="Đặc biệt">Đặc biệt</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Sức chứa *</label>
                  <input
                    type="number"
                    value={formData.sucChua}
                    onChange={(e) => setFormData({ ...formData, sucChua: e.target.value })}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Giá theo giờ (VNĐ) *</label>
                  <input
                    type="number"
                    value={formData.giaGio}
                    onChange={(e) => setFormData({ ...formData, giaGio: e.target.value })}
                    min="0"
                    step="10000"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingPhong ? 'Cập Nhật' : 'Thêm Mới'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="phong-grid">
        {phongList.length === 0 ? (
          <p className="empty-message">Chưa có phòng nào. Hãy thêm phòng mới!</p>
        ) : (
          phongList.map(phong => (
            <div key={phong.maPhong} className="phong-card">
              <div className="phong-header">
                <h3>{phong.tenPhong}</h3>
                <span className={`status-badge ${getTrangThaiClass(phong.trangThai)}`}>
                  {getTrangThaiLabel(phong.trangThai)}
                </span>
              </div>
              <div className="phong-info">
                <p><strong>Loại:</strong> {phong.loaiPhong}</p>
                <p><strong>Sức chứa:</strong> {phong.sucChua} người</p>
                <p><strong>Giá:</strong> {parseFloat(phong.giaGio).toLocaleString('vi-VN')} VNĐ/giờ</p>
              </div>
              <div className="phong-actions">
                <button 
                  className="btn btn-small btn-edit" 
                  onClick={() => handleEdit(phong)}
                >
                  Sửa
                </button>
                {phong.trangThai === 'TRONG' && (
                  <button 
                    className="btn btn-small btn-success"
                    onClick={() => handleUpdateTrangThai(phong.maPhong, 'DANG_SU_DUNG')}
                  >
                    Sử dụng
                  </button>
                )}
                {phong.trangThai === 'DANG_SU_DUNG' && (
                  <button 
                    className="btn btn-small btn-warning"
                    onClick={() => handleUpdateTrangThai(phong.maPhong, 'TRONG')}
                  >
                    Trả phòng
                  </button>
                )}
                <button 
                  className="btn btn-small btn-danger" 
                  onClick={() => handleDelete(phong.maPhong)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default QuanLyPhong;


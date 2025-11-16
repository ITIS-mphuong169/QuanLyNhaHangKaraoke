/**
 * Component: QuanLyKhachHang
 * Mô tả: Giao diện quản lý khách hàng
 */
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import './QuanLyKhachHang.css';

function QuanLyKhachHang() {
  const [khachHangList, setKhachHangList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingKhachHang, setEditingKhachHang] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [formData, setFormData] = useState({
    hoTen: '',
    soDienThoai: '',
    email: '',
    diaChi: '',
    ngaySinh: '',
    gioiTinh: '',
    loaiKhachHang: 'THUONG'
  });

  useEffect(() => {
    fetchKhachHangList();
  }, []);

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

  const handleAdd = () => {
    setEditingKhachHang(null);
    setFormData({
      hoTen: '',
      soDienThoai: '',
      email: '',
      diaChi: '',
      ngaySinh: '',
      gioiTinh: '',
      loaiKhachHang: 'THUONG'
    });
    setShowForm(true);
  };

  const handleEdit = (khachHang) => {
    setEditingKhachHang(khachHang);
    setFormData({
      hoTen: khachHang.hoTen,
      soDienThoai: khachHang.soDienThoai,
      email: khachHang.email || '',
      diaChi: khachHang.diaChi || '',
      ngaySinh: khachHang.ngaySinh ? khachHang.ngaySinh.split('T')[0] : '',
      gioiTinh: khachHang.gioiTinh || '',
      loaiKhachHang: khachHang.loaiKhachHang || 'THUONG'
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = editingKhachHang
        ? await apiService.updateKhachHang(editingKhachHang.maKhachHang, formData)
        : await apiService.createKhachHang(formData);

      if (data.success) {
        alert(editingKhachHang ? 'Cập nhật khách hàng thành công!' : 'Thêm khách hàng thành công!');
        setShowForm(false);
        fetchKhachHangList();
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi lưu khách hàng');
    }
  };

  const handleDelete = async (maKhachHang) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      return;
    }

    try {
      const data = await apiService.deleteKhachHang(maKhachHang);
      if (data.success) {
        alert('Xóa khách hàng thành công!');
        fetchKhachHangList();
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi xóa khách hàng');
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      fetchKhachHangList();
      return;
    }

    try {
      const data = await apiService.searchKhachHang(searchKeyword);
      if (data.success) {
        setKhachHangList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
    }
  };

  const getLoaiKhachHangLabel = (loai) => {
    const labels = {
      'THUONG': 'Thường',
      'VIP': 'VIP',
      'THAN_THIET': 'Thân thiết'
    };
    return labels[loai] || loai;
  };

  return (
    <div className="quan-ly-khach-hang">
      <div className="section-header">
        <h2>Quản Lý Khách Hàng</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          + Thêm Khách Hàng Mới
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, số điện thoại, email..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn btn-secondary" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingKhachHang ? 'Chỉnh Sửa Khách Hàng' : 'Thêm Khách Hàng Mới'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Họ tên *</label>
                <input
                  type="text"
                  value={formData.hoTen}
                  onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Số điện thoại *</label>
                  <input
                    type="tel"
                    value={formData.soDienThoai}
                    onChange={(e) => setFormData({ ...formData, soDienThoai: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  value={formData.diaChi}
                  onChange={(e) => setFormData({ ...formData, diaChi: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    value={formData.ngaySinh}
                    onChange={(e) => setFormData({ ...formData, ngaySinh: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Giới tính</label>
                  <select
                    value={formData.gioiTinh}
                    onChange={(e) => setFormData({ ...formData, gioiTinh: e.target.value })}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Loại khách hàng</label>
                <select
                  value={formData.loaiKhachHang}
                  onChange={(e) => setFormData({ ...formData, loaiKhachHang: e.target.value })}
                >
                  <option value="THUONG">Thường</option>
                  <option value="VIP">VIP</option>
                  <option value="THAN_THIET">Thân thiết</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingKhachHang ? 'Cập Nhật' : 'Thêm Mới'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="khach-hang-table">
        {khachHangList.length === 0 ? (
          <p className="empty-message">Chưa có khách hàng nào. Hãy thêm khách hàng mới!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Loại</th>
                <th>Điểm tích lũy</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {khachHangList.map((khachHang, index) => (
                <tr key={khachHang.maKhachHang}>
                  <td>{index + 1}</td>
                  <td>{khachHang.hoTen}</td>
                  <td>{khachHang.soDienThoai}</td>
                  <td>{khachHang.email || '-'}</td>
                  <td>
                    <span className={`badge badge-${khachHang.loaiKhachHang.toLowerCase()}`}>
                      {getLoaiKhachHangLabel(khachHang.loaiKhachHang)}
                    </span>
                  </td>
                  <td>{khachHang.diemTichLuy || 0}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-small btn-edit" onClick={() => handleEdit(khachHang)}>
                        Sửa
                      </button>
                      <button className="btn btn-small btn-danger" onClick={() => handleDelete(khachHang.maKhachHang)}>
                        Xóa
                      </button>
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

export default QuanLyKhachHang;


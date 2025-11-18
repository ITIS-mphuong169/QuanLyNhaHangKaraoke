/**
 * Component: GDQLTTMHbankem (Manage Related Items)
 * Mô tả: Giao diện quản lý thông tin mặt hàng bán kèm
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import GDChonMH from './GDChonMH';
import GDNhapSL from './GDNhapSL';
import './GDQLTTMHbankem.css';

function GDQLTTMHbankem() {
  const [matHangList, setMatHangList] = useState([]);
  const [showChonMH, setShowChonMH] = useState(false);
  const [showNhapSL, setShowNhapSL] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedMatHang, setSelectedMatHang] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
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

  useEffect(() => {
    fetchMatHangList();
    fetchNhaCungCapList();
  }, []);

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

  const handleAdd = () => {
    setFormData({
      tenMatHang: '',
      donViTinh: '',
      giaBan: '',
      giaNhap: '',
      moTa: '',
      maNhaCungCap: ''
    });
    setShowForm(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        giaBan: parseFloat(formData.giaBan) || 0,
        giaNhap: parseFloat(formData.giaNhap) || 0,
        tonKho: 0  //  mặc định là 0 khi thêm mới
      };

      const data = await apiService.createMatHang({ matHangData: submitData });
      if (data.success) {
        alert('Thêm mặt hàng mới thành công!');
        setShowForm(false);
        fetchMatHangList();
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi thêm mặt hàng mới');
    }
  };

  const handleSelectMatHang = (matHang) => {
    setSelectedMatHang(matHang);
    setShowChonMH(false);
    setShowNhapSL(true);
  };

  const handleConfirmSoLuong = async ({ soLuong }) => {
    if (!selectedMatHang) return;

    try {
      // TODO: Xử lý bán hàng
      alert(`Đã bán ${soLuong} ${selectedMatHang.donViTinh} ${selectedMatHang.tenMatHang}`);
      setShowNhapSL(false);
      setSelectedMatHang(null);
      fetchMatHangList();
    } catch (error) {
      alert('Có lỗi xảy ra: ' + error.message);
    }
  };

  const handleEdit = (matHang) => {
    // Navigate to edit page
    window.location.href = `/sua-mat-hang/${matHang.maMatHang}`;
  };

  const handleDelete = async (maMatHang) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa mặt hàng này?')) {
      return;
    }

    try {
      const data = await apiService.deleteMatHang({ id: maMatHang });
      if (data.success) {
        alert('Xóa mặt hàng thành công!');
        fetchMatHangList();
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi xóa mặt hàng');
    }
  };

  const filteredList = matHangList.filter(mh =>
    mh.tenMatHang.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="gd-qltt-mh-bankem">
      <div className="section-header">
        <h2>Quản Lý Thông Tin Mặt Hàng Bán Kèm</h2>
        <div>
          <button className="btn btn-primary" onClick={handleAdd}>
            + Thêm Mặt Hàng Mới
          </button>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-form">
          <div className="form-group">
            <label>Tìm kiếm</label>
            <input
              type="text"
              placeholder="Tìm kiếm mặt hàng..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mat-hang-table">
        {filteredList.length === 0 ? (
          <p className="empty-message">Chưa có mặt hàng nào. Hãy thêm mặt hàng mới!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên mặt hàng</th>
                <th>Đơn vị</th>
                <th>Giá bán</th>
                <th>Tồn kho</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((mh, index) => (
                <tr key={mh.maMatHang}>
                  <td>{index + 1}</td>
                  <td>{mh.tenMatHang}</td>
                  <td>{mh.donViTinh}</td>
                  <td>{parseFloat(mh.giaBan).toLocaleString('vi-VN')} VNĐ</td>
                  <td className={mh.tonKho < 10 ? 'low-stock' : ''}>
                    {mh.tonKho} {mh.donViTinh}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-small btn-edit"
                        onClick={() => handleEdit(mh)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => handleDelete(mh.maMatHang)}
                      >
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

      {showChonMH && (
        <GDChonMH
          onSelect={handleSelectMatHang}
          onClose={() => setShowChonMH(false)}
        />
      )}

      {showNhapSL && selectedMatHang && (
        <GDNhapSL
          matHang={selectedMatHang}
          onConfirm={handleConfirmSoLuong}
          onClose={() => {
            setShowNhapSL(false);
            setSelectedMatHang(null);
          }}
        />
      )}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <h3>Thêm Mặt Hàng Mới</h3>
            <form onSubmit={handleSubmitForm}>
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
              </div>
              <div className="form-group">
                <label>Tồn kho</label>
                <input
                  type="text"
                  value="0"
                  disabled
                  style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                />
                <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                  Tồn kho mặc định là 0. Vui lòng nhập hàng để cập nhật tồn kho.
                </small>
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
              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  rows="4"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Thêm Mới
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GDQLTTMHbankem;


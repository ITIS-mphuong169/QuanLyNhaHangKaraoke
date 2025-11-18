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
  const [phieuNhapList, setPhieuNhapList] = useState([]);
  const [loadingPhieuNhap, setLoadingPhieuNhap] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    maNhaCungCap: '',
    ngayNhap: new Date().toISOString().split('T')[0],
    ghiChu: ''
  });

  const getTenNhaCungCap = (phieu) => {
    if (phieu.tenNhaCungCap) {
      return phieu.tenNhaCungCap;
    }
    const ncc = nhaCungCapList.find(
      (item) => Number(item.maNhaCungCap) === Number(phieu.maNhaCungCap)
    );
    return ncc?.tenNhaCungCap || 'N/A';
  };

  useEffect(() => {
    fetchNhaCungCap();
    fetchPhieuNhapList();
  }, []);

  useEffect(() => {
    if (formData.maNhaCungCap) {
      fetchMatHangByNCC(formData.maNhaCungCap);
    } else {
      setMatHangList([]);
      setChiTietNhap([]);
    }
  }, [formData.maNhaCungCap]);

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

  const fetchMatHangByNCC = async (maNhaCungCap) => {
    try {
      const data = await apiService.getMatHangByNhaCungCap({ maNhaCungCap });
      if (data.success) {
        setMatHangList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách mặt hàng theo nhà cung cấp:', error);
      setMatHangList([]);
    }
  };

  const fetchPhieuNhapList = async () => {
    setLoadingPhieuNhap(true);
    try {
      const data = await apiService.getNhapHangList();
      if (data.success) {
        setPhieuNhapList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phiếu nhập:', error);
    } finally {
      setLoadingPhieuNhap(false);
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

      const data = await apiService.createNhapHang({ nhapHangData });
      if (data.success) {
        alert('Tạo phiếu nhập thành công!');
        // Refresh danh sách phiếu nhập
        fetchPhieuNhapList();
        // Reset form
        setFormData({
          maNhaCungCap: '',
          ngayNhap: new Date().toISOString().split('T')[0],
          ghiChu: ''
        });
        setChiTietNhap([]);
        setMatHangList([]);
        setShowCreateForm(false);
        // Navigate to detail page
        navigate(`/phieu-nhap/${data.data.maNhapHang}`);
      } else {
        alert('Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      alert('Có lỗi xảy ra: ' + error.message);
    }
  };

  const tongTien = chiTietNhap.reduce((sum, item) => sum + item.thanhTien, 0);

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setFormData({
      maNhaCungCap: '',
      ngayNhap: new Date().toISOString().split('T')[0],
      ghiChu: ''
    });
    setChiTietNhap([]);
    setMatHangList([]);
  };

  return (
    <div className="gd-tao-phieu-nhap">
      <div className="section-header">
        <h2>Quản Lý Phiếu Nhập Hàng</h2>
      </div>

      {showCreateForm && (
        <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Thông Tin Phiếu Nhập</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nhà cung cấp *</label>
              <select
                value={formData.maNhaCungCap}
                onChange={(e) => {
                  setFormData({ ...formData, maNhaCungCap: e.target.value });
                  // Xóa danh sách chi tiết khi thay đổi nhà cung cấp
                  setChiTietNhap([]);
                }}
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
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleAddMatHang}
              disabled={!formData.maNhaCungCap}
            >
              + Thêm Mặt Hàng
            </button>
            {!formData.maNhaCungCap && (
              <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                Vui lòng chọn nhà cung cấp trước
              </small>
            )}
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
                          const selected = matHangList.find(mh => mh.maMatHang === parseInt(e.target.value));
                          if (selected) {
                            handleUpdateChiTiet(index, 'maMatHang', selected.maMatHang);
                            handleUpdateChiTiet(index, 'tenMatHang', selected.tenMatHang || '');
                            // Tự động điền đơn giá từ MatHangCungcap
                            handleUpdateChiTiet(index, 'donGia', selected.giaNhap || 0);
                          }
                        }}
                        required
                        disabled={!formData.maNhaCungCap}
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
                        onChange={(e) => handleUpdateChiTiet(index, 'soLuong', parseInt(e.target.value) || 0)}
                        min="1"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.donGia}
                        readOnly
                        style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                      />
                      <small style={{ display: 'block', marginTop: '2px', fontSize: '11px', color: '#666' }}>
                        Giá tự động từ thông tin mặt hàng
                      </small>
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
          <button type="button" className="btn btn-secondary" onClick={handleCancelCreate}>
            Hủy
          </button>
        </div>
      </form>
      )}

      <div className="form-section">
        <div className="section-header-small">
          <h3>Danh Sách Phiếu Nhập</h3>
          <div>
            {!showCreateForm && (
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => setShowCreateForm(true)}
                style={{ marginRight: '10px' }}
              >
                + Tạo Phiếu Nhập Mới
              </button>
            )}
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={fetchPhieuNhapList}
              disabled={loadingPhieuNhap}
            >
              {loadingPhieuNhap ? 'Đang tải...' : 'Làm mới'}
            </button>
          </div>
        </div>

        {loadingPhieuNhap ? (
          <p className="empty-message">Đang tải danh sách phiếu nhập...</p>
        ) : phieuNhapList.length === 0 ? (
          <p className="empty-message">Chưa có phiếu nhập nào.</p>
        ) : (
          <div className="phieu-nhap-list">
            <table className="chi-tiet-table">
              <thead>
                <tr>
                  <th>Mã phiếu</th>
                  <th>Nhà cung cấp</th>
                  <th>Ngày nhập</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {phieuNhapList.map((phieu) => (
                  <tr key={phieu.maNhapHang}>
                    <td>PN{phieu.maNhapHang}</td>
                    <td>{getTenNhaCungCap(phieu)}</td>
                    <td>{new Date(phieu.ngayNhap).toLocaleDateString('vi-VN')}</td>
                    <td>{parseFloat(phieu.tongTien || 0).toLocaleString('vi-VN')} VNĐ</td>
                    <td>
                      <span className={`status-badge ${phieu.trangThai === 'DA_NHAP' ? 'status-success' : 'status-cancelled'}`}>
                        {phieu.trangThai === 'DA_NHAP' ? 'Đã nhập' : 'Đã hủy'}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-small btn-primary"
                        onClick={() => navigate(`/phieu-nhap/${phieu.maNhapHang}`)}
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default GDTaophieunhap;


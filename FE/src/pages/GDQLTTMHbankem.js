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
  const [selectedMatHang, setSelectedMatHang] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedDanhMuc, setSelectedDanhMuc] = useState('');

  useEffect(() => {
    fetchMatHangList();
  }, [selectedDanhMuc]);

  const fetchMatHangList = async () => {
    try {
      let data;
      if (selectedDanhMuc) {
        data = await apiService.getMatHangByDanhMuc(selectedDanhMuc);
      } else {
        data = await apiService.getMatHangList();
      }
      if (data.success) {
        setMatHangList(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách mặt hàng:', error);
    }
  };

  const handleAdd = () => {
    setShowChonMH(true);
  };

  const handleSelectMatHang = (matHang) => {
    setSelectedMatHang(matHang);
    setShowChonMH(false);
    setShowNhapSL(true);
  };

  const handleConfirmSoLuong = async (soLuong) => {
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
      const data = await apiService.deleteMatHang(maMatHang);
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
          <Link to="/sua-mat-hang" className="btn btn-secondary">
            Sửa Mặt Hàng
          </Link>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-form">
          <div className="form-group">
            <label>Danh mục</label>
            <select
              value={selectedDanhMuc}
              onChange={(e) => setSelectedDanhMuc(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="Đồ uống">Đồ uống</option>
              <option value="Đồ ăn">Đồ ăn</option>
              <option value="Đồ nhậu">Đồ nhậu</option>
              <option value="Trái cây">Trái cây</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
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
                <th>Danh mục</th>
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
                  <td>{mh.danhMuc}</td>
                  <td>{mh.donViTinh}</td>
                  <td>{parseFloat(mh.giaBan).toLocaleString('vi-VN')} VNĐ</td>
                  <td className={mh.tonKho < 10 ? 'low-stock' : ''}>
                    {mh.tonKho} {mh.donViTinh}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-small btn-success"
                        onClick={() => {
                          setSelectedMatHang(mh);
                          setShowNhapSL(true);
                        }}
                        disabled={mh.tonKho === 0}
                      >
                        Bán
                      </button>
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
          danhMuc={selectedDanhMuc}
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
    </div>
  );
}

export default GDQLTTMHbankem;


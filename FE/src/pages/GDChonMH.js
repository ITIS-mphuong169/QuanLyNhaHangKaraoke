/**
 * Component: GDChonMH (Select Item)
 * Mô tả: Giao diện chọn mặt hàng
 */
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import './GDChonMH.css';

function GDChonMH({ onSelect, onClose, danhMuc }) {
  const [matHangList, setMatHangList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedDanhMuc, setSelectedDanhMuc] = useState(danhMuc || '');

  useEffect(() => {
    fetchMatHang();
  }, [selectedDanhMuc]);

  const fetchMatHang = async () => {
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

  const handleSelect = (matHang) => {
    if (onSelect) {
      onSelect(matHang);
    }
    if (onClose) {
      onClose();
    }
  };

  const filteredList = matHangList.filter(mh =>
    mh.tenMatHang.toLowerCase().includes(searchKeyword.toLowerCase()) &&
    mh.trangThai === 'CON_HANG'
  );

  return (
    <div className="gd-chon-mh">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Chọn Mặt Hàng</h3>
            <button className="btn-close" onClick={onClose}>×</button>
          </div>

          <div className="filter-bar">
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

          <div className="mh-list">
            {filteredList.length === 0 ? (
              <p className="empty-message">Không tìm thấy mặt hàng nào</p>
            ) : (
              filteredList.map(mh => (
                <div
                  key={mh.maMatHang}
                  className="mh-item"
                  onClick={() => handleSelect(mh)}
                >
                  <div className="mh-info">
                    <h4>{mh.tenMatHang}</h4>
                    <p>Danh mục: {mh.danhMuc}</p>
                    <p>Giá: {parseFloat(mh.giaBan).toLocaleString('vi-VN')} VNĐ</p>
                    <p>Tồn kho: {mh.tonKho} {mh.donViTinh}</p>
                  </div>
                  <button className="btn btn-primary">Chọn</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GDChonMH;


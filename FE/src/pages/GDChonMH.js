/**
 * Component: GDChonMH (Select Item)
 * Mô tả: Giao diện chọn mặt hàng
 */
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import './GDChonMH.css';

function GDChonMH({ onSelect, onClose }) {
  const [matHangList, setMatHangList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchMatHang();
  }, []);

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

  const handleSelect = (matHang) => {
    if (onSelect) {
      onSelect(matHang);
    }
    if (onClose) {
      onClose();
    }
  };

  const filteredList = matHangList.filter(mh =>
    mh.tenMatHang.toLowerCase().includes(searchKeyword.toLowerCase())
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


/**
 * Component: GDChonNCC (Select Supplier)
 * Mô tả: Giao diện chọn nhà cung cấp
 */
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import './GDChonNCC.css';

function GDChonNCC({ onSelect, onClose }) {
  const [nhaCungCapList, setNhaCungCapList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchNhaCungCap();
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

  const handleSelect = (ncc) => {
    if (onSelect) {
      onSelect(ncc);
    }
    if (onClose) {
      onClose();
    }
  };

  const filteredList = nhaCungCapList.filter(ncc =>
    ncc.tenNhaCungCap.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    ncc.soDienThoai.includes(searchKeyword)
  );

  return (
    <div className="gd-chon-ncc">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Chọn Nhà Cung Cấp</h3>
            <button className="btn-close" onClick={onClose}>×</button>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm nhà cung cấp..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="ncc-list">
            {filteredList.length === 0 ? (
              <p className="empty-message">Không tìm thấy nhà cung cấp nào</p>
            ) : (
              filteredList.map(ncc => (
                <div
                  key={ncc.maNhaCungCap}
                  className="ncc-item"
                  onClick={() => handleSelect(ncc)}
                >
                  <div className="ncc-info">
                    <h4>{ncc.tenNhaCungCap}</h4>
                    <p>Liên hệ: {ncc.nguoiLienHe}</p>
                    <p>Điện thoại: {ncc.soDienThoai}</p>
                    {ncc.diaChi && <p>Địa chỉ: {ncc.diaChi}</p>}
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

export default GDChonNCC;


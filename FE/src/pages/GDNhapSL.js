/**
 * Component: GDNhapSL (Input Quantity)
 * Mô tả: Giao diện nhập số lượng
 */
import React, { useState } from 'react';
import './GDNhapSL.css';

function GDNhapSL({ matHang, onConfirm, onClose }) {
  const [soLuong, setSoLuong] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!soLuong || soLuong <= 0) {
      setError('Số lượng phải lớn hơn 0');
      return;
    }

    if (matHang && soLuong > matHang.tonKho) {
      setError(`Số lượng vượt quá tồn kho (${matHang.tonKho} ${matHang.donViTinh})`);
      return;
    }

    if (onConfirm) {
      onConfirm({ soLuong });
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="gd-nhap-sl">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content-small" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Nhập Số Lượng</h3>
            <button className="btn-close" onClick={onClose}>×</button>
          </div>

          {matHang && (
            <div className="mat-hang-info">
              <p><strong>Mặt hàng:</strong> {matHang.tenMatHang}</p>
              <p><strong>Tồn kho:</strong> {matHang.tonKho} {matHang.donViTinh}</p>
              <p><strong>Đơn giá:</strong> {parseFloat(matHang.giaBan).toLocaleString('vi-VN')} VNĐ</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label>Số lượng *</label>
              <input
                type="number"
                value={soLuong}
                onChange={(e) => setSoLuong(parseInt(e.target.value) || 0)}
                min="1"
                max={matHang ? matHang.tonKho : undefined}
                required
                autoFocus
              />
            </div>
            {matHang && (
              <div className="thanh-tien-preview">
                <p><strong>Thành tiền:</strong> {(soLuong * matHang.giaBan).toLocaleString('vi-VN')} VNĐ</p>
              </div>
            )}
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Xác nhận
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GDNhapSL;


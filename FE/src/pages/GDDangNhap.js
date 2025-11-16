/**
 * Component: GDDangNhap (Login Interface)
 * Mô tả: Giao diện đăng nhập hệ thống
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GDDangNhap.css';

function GDDangNhap() {
  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // TODO: Gọi API đăng nhập
      // const response = await fetch('http://localhost:3001/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Tạm thời mock login
      if (formData.taiKhoan && formData.matKhau) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ taiKhoan: formData.taiKhoan }));
        navigate('/quan-ly');
      } else {
        setError('Vui lòng nhập đầy đủ thông tin');
      }
    } catch (error) {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="gd-dang-nhap">
      <div className="login-container">
        <div className="login-box">
          <h2>Đăng Nhập Hệ Thống</h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label>Tài khoản</label>
              <input
                type="text"
                value={formData.taiKhoan}
                onChange={(e) => setFormData({ ...formData, taiKhoan: e.target.value })}
                placeholder="Nhập tài khoản"
                required
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                value={formData.matKhau}
                onChange={(e) => setFormData({ ...formData, matKhau: e.target.value })}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Đăng Nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GDDangNhap;


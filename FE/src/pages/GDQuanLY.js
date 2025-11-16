/**
 * Component: GDQuanLY (Management Interface)
 * Mô tả: Giao diện quản lý tổng quan
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './GDQuanLY.css';

function GDQuanLY() {
  return (
    <div className="gd-quan-ly">
      <div className="dashboard-header">
        <h1>Trang Quản Lý</h1>
        <p>Chào mừng đến với hệ thống quản lý nhà hàng karaoke</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/mat-hang" className="dashboard-card">
          <div className="card-icon">📦</div>
          <h3>Quản Lý Mặt Hàng Bán Kèm</h3>
          <p>Quản lý thông tin mặt hàng bán kèm</p>
        </Link>

        <Link to="/tao-phieu-nhap" className="dashboard-card">
          <div className="card-icon">🚚</div>
          <h3>Nhập Mặt Hàng Từ Nhà Cung Cấp</h3>
          <p>Nhập mặt hàng bán kèm từ nhà cung cấp</p>
        </Link>

        <Link to="/thong-ke-mh" className="dashboard-card">
          <div className="card-icon">📊</div>
          <h3>Thống Kê Mặt Hàng Theo Doanh Thu</h3>
          <p>Xem thống kê mặt hàng theo doanh thu</p>
        </Link>
      </div>
    </div>
  );
}

export default GDQuanLY;


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
          <h3>Quản Lý Thông Tin Mặt Hàng Bán Kèm</h3>
        </Link>

        <Link to="/tao-phieu-nhap" className="dashboard-card">
          <h3>Nhập Mặt Hàng Bán kèm Từ Nhà Cung Cấp</h3>
        </Link>

        <Link to="/thong-ke-mh" className="dashboard-card">
          <h3>Thống Kê Mặt Hàng Bán Kèm Theo Doanh Thu</h3>
        </Link>
      </div>
    </div>
  );
}

export default GDQuanLY;


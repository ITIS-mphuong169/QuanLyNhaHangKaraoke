/**
 * Main App Component
 * Mô tả: Component chính của ứng dụng với routing
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import QuanLyPhong from './pages/QuanLyPhong';
import QuanLyKhachHang from './pages/QuanLyKhachHang';
import GDDangNhap from './pages/GDDangNhap';
import GDQuanLY from './pages/GDQuanLY';
import GDTaophieunhap from './pages/GDTaophieunhap';
import GDThongKeMH from './pages/GDThongKeMH';
import GDDanhSachHD from './pages/GDDanhSachHD';
import GDChiTietHD from './pages/GDChiTietHD';
import GDPhieuNhap from './pages/GDPhieuNhap';
import GDQLTTMHbankem from './pages/GDQLTTMHbankem';
import GDSuaTTMHBankem from './pages/GDSuaTTMHBankem';
// Các component cũ - có thể xóa nếu không dùng
// import ItemManagement from '../../src/components/ItemManagement';
// import RevenueStatistics from '../../src/components/RevenueStatistics';
// import SupplierImport from '../../src/components/SupplierImport';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="main-nav">
          <div className="nav-container">
            <h1 className="logo">Hệ Thống Quản Lý Nhà Hàng Karaoke</h1>
            <ul className="nav-menu">
              <li><Link to="/quan-ly">Trang Chủ</Link></li>
              <li><Link to="/phong">Quản Lý Phòng</Link></li>
              <li><Link to="/khach-hang">Quản Lý Khách Hàng</Link></li>
              <li><Link to="/mat-hang">Quản Lý Mặt Hàng</Link></li>
              <li><Link to="/nha-cung-cap">Nhà Cung Cấp</Link></li>
              <li><Link to="/thong-ke-mh">Thống Kê Mặt Hàng</Link></li>
              <li><Link to="/danh-sach-hoa-don">Hóa Đơn</Link></li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dang-nhap" replace />} />
            <Route path="/dang-nhap" element={<GDDangNhap />} />
            <Route path="/quan-ly" element={<GDQuanLY />} />
            <Route path="/phong" element={<QuanLyPhong />} />
            <Route path="/khach-hang" element={<QuanLyKhachHang />} />
            <Route path="/mat-hang" element={<GDQLTTMHbankem />} />
            <Route path="/sua-mat-hang/:id?" element={<GDSuaTTMHBankem />} />
            <Route path="/quan-ly-mat-hang" element={<ItemManagementWrapper />} />
            <Route path="/nha-cung-cap" element={<SupplierImportWrapper />} />
            <Route path="/thong-ke" element={<RevenueStatisticsWrapper />} />
            <Route path="/thong-ke-mh" element={<GDThongKeMH />} />
            <Route path="/tao-phieu-nhap" element={<GDTaophieunhap />} />
            <Route path="/phieu-nhap/:id" element={<GDPhieuNhap />} />
            <Route path="/danh-sach-hoa-don" element={<GDDanhSachHD />} />
            <Route path="/chi-tiet-hoa-don/:id" element={<GDChiTietHD />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Wrapper components - tạm thời redirect về trang chính
function ItemManagementWrapper() {
  return <Navigate to="/mat-hang" replace />;
}

function SupplierImportWrapper() {
  return <Navigate to="/tao-phieu-nhap" replace />;
}

function RevenueStatisticsWrapper() {
  return <Navigate to="/thong-ke-mh" replace />;
}

export default App;


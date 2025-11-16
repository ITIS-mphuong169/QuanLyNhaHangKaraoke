/**
 * Main Application File
 * Mô tả: File chính của backend server
 */
const express = require('express');
const cors = require('cors');
const { query } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database wrapper để inject vào routes
const db = { query };

// Routes
const phongRoutes = require('./routes/phongRoutes');
const khachHangRoutes = require('./routes/khachHangRoutes');
const matHangRoutes = require('./routes/matHangRoutes');
const datPhongRoutes = require('./routes/datPhongRoutes');
const thongKeRoutes = require('./routes/thongKeRoutes');
const nhapHangRoutes = require('./routes/nhapHangRoutes');
const nhaCungCapRoutes = require('./routes/nhaCungCapRoutes');

app.use('/api/phong', phongRoutes(db));
app.use('/api/khach-hang', khachHangRoutes(db));
app.use('/api/mat-hang', matHangRoutes(db));
app.use('/api/dat-phong', datPhongRoutes(db));
app.use('/api/thong-ke', thongKeRoutes(db));
app.use('/api/nhap-hang', nhapHangRoutes(db));
app.use('/api/nha-cung-cap', nhaCungCapRoutes(db));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server đang hoạt động' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Có lỗi xảy ra trên server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Không tìm thấy route' });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

module.exports = app;


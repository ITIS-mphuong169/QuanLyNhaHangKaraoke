/**
 * Routes: thongKeRoutes
 * Mô tả: Định nghĩa các routes cho Thống Kê
 */
const express = require('express');
const router = express.Router();
const ThongKeMHBanKemController = require('../controllers/ThongKeMHBanKemController');

function createThongKeRoutes(db) {
  const thongKeController = new ThongKeMHBanKemController(db);

  router.get('/tong-hop', (req, res) => thongKeController.getThongKeTongHop(req, res));
  router.get('/khoang-thoi-gian', (req, res) => thongKeController.getThongKeByDateRange(req, res));
  router.get('/mat-hang/:maMatHang', (req, res) => thongKeController.getThongKeByMatHang(req, res));

  return router;
}

module.exports = createThongKeRoutes;


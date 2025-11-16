/**
 * Routes: khachHangRoutes
 * Mô tả: Định nghĩa các routes cho KhachHang
 */
const express = require('express');
const router = express.Router();
const KhachHangController = require('../controllers/KhachHangController');

function createKhachHangRoutes(db) {
  const khachHangController = new KhachHangController(db);

  router.get('/', (req, res) => khachHangController.getAllKhachHang(req, res));
  router.get('/search', (req, res) => khachHangController.searchKhachHang(req, res));
  router.get('/:id', (req, res) => khachHangController.getKhachHangById(req, res));
  router.post('/', (req, res) => khachHangController.createKhachHang(req, res));
  router.put('/:id', (req, res) => khachHangController.updateKhachHang(req, res));
  router.delete('/:id', (req, res) => khachHangController.deleteKhachHang(req, res));

  return router;
}

module.exports = createKhachHangRoutes;


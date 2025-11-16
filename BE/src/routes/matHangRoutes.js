/**
 * Routes: matHangRoutes
 * Mô tả: Định nghĩa các routes cho MatHang
 */
const express = require('express');
const router = express.Router();
const MatHangController = require('../controllers/MatHangController');

function createMatHangRoutes(db) {
  const matHangController = new MatHangController(db);

  router.get('/', (req, res) => matHangController.getAllMatHang(req, res));
  router.get('/danh-muc/:danhMuc', (req, res) => matHangController.getMatHangByDanhMuc(req, res));
  router.get('/search', (req, res) => matHangController.searchMatHang(req, res));
  router.get('/:id', (req, res) => matHangController.getMatHangById(req, res));
  router.post('/', (req, res) => matHangController.createMatHang(req, res));
  router.put('/:id', (req, res) => matHangController.updateMatHang(req, res));
  router.delete('/:id', (req, res) => matHangController.deleteMatHang(req, res));

  return router;
}

module.exports = createMatHangRoutes;


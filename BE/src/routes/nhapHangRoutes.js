/**
 * Routes: nhapHangRoutes
 * Mô tả: Định nghĩa các routes cho NhapHang
 */
const express = require('express');
const router = express.Router();
const NhapHangController = require('../controllers/NhapHangController');

function createNhapHangRoutes(db) {
  const nhapHangController = new NhapHangController(db);

  router.get('/', (req, res) => nhapHangController.getAllNhapHang(req, res));
  router.get('/:id', (req, res) => nhapHangController.getNhapHangById(req, res));
  router.post('/', (req, res) => nhapHangController.createNhapHang(req, res));
  router.delete('/:id', (req, res) => nhapHangController.deleteNhapHang(req, res));

  return router;
}

module.exports = createNhapHangRoutes;


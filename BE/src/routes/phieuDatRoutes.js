/**
 * Routes: phieuDatRoutes
 * Mô tả: Định nghĩa các routes cho PhieuDat
 */
const express = require('express');
const router = express.Router();
const PhieuDatController = require('../controllers/PhieuDatController');

function createPhieuDatRoutes(db) {
  const phieuDatController = new PhieuDatController(db);

  router.get('/', (req, res) => phieuDatController.getAllPhieuDat(req, res));
  router.get('/trang-thai/:trangThai', (req, res) => phieuDatController.getPhieuDatByTrangThai(req, res));
  router.get('/:id', (req, res) => phieuDatController.getPhieuDatById(req, res));
  router.post('/', (req, res) => phieuDatController.createPhieuDat(req, res));
  router.put('/:id', (req, res) => phieuDatController.updatePhieuDat(req, res));
  router.post('/:id/thanh-toan', (req, res) => phieuDatController.thanhToanPhieuDat(req, res));
  router.delete('/:id', (req, res) => phieuDatController.deletePhieuDat(req, res));

  return router;
}

module.exports = createPhieuDatRoutes;


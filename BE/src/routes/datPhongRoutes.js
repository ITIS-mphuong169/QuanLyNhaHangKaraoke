/**
 * Routes: datPhongRoutes
 * Mô tả: Định nghĩa các routes cho DatPhong
 */
const express = require('express');
const router = express.Router();
const DatPhongController = require('../controllers/DatPhongController');

function createDatPhongRoutes(db) {
  const datPhongController = new DatPhongController(db);

  router.get('/', (req, res) => datPhongController.getAllDatPhong(req, res));
  router.get('/:id', (req, res) => datPhongController.getDatPhongById(req, res));
  router.post('/', (req, res) => datPhongController.createDatPhong(req, res));
  router.put('/:id', (req, res) => datPhongController.updateDatPhong(req, res));
  router.patch('/:id/trang-thai', (req, res) => datPhongController.updateTrangThai(req, res));
  router.delete('/:id', (req, res) => datPhongController.deleteDatPhong(req, res));

  return router;
}

module.exports = createDatPhongRoutes;


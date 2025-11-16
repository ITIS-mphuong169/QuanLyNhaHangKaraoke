/**
 * Routes: phongRoutes
 * Mô tả: Định nghĩa các routes cho Phong
 */
const express = require('express');
const router = express.Router();
const PhongController = require('../controllers/PhongController');

// Khởi tạo controller với database connection
// Lưu ý: Cần inject database connection vào đây
function createPhongRoutes(db) {
  const phongController = new PhongController(db);

  router.get('/', (req, res) => phongController.getAllPhong(req, res));
  router.get('/trong', (req, res) => phongController.getPhongTrong(req, res));
  router.get('/:id', (req, res) => phongController.getPhongById(req, res));
  router.post('/', (req, res) => phongController.createPhong(req, res));
  router.put('/:id', (req, res) => phongController.updatePhong(req, res));
  router.patch('/:id/trang-thai', (req, res) => phongController.updateTrangThai(req, res));
  router.delete('/:id', (req, res) => phongController.deletePhong(req, res));

  return router;
}

module.exports = createPhongRoutes;


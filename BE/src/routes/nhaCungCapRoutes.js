/**
 * Routes: nhaCungCapRoutes
 * Mô tả: Định nghĩa các routes cho NhaCungCap
 */
const express = require('express');
const router = express.Router();
const NhaCungCapController = require('../controllers/NhaCungCapController');

function createNhaCungCapRoutes(db) {
  const nhaCungCapController = new NhaCungCapController(db);

  router.get('/', (req, res) => nhaCungCapController.getAllNhaCungCap(req, res));
  router.get('/:id', (req, res) => nhaCungCapController.getNhaCungCapById(req, res));
  router.post('/', (req, res) => nhaCungCapController.createNhaCungCap(req, res));
  router.put('/:id', (req, res) => nhaCungCapController.updateNhaCungCap(req, res));
  router.delete('/:id', (req, res) => nhaCungCapController.deleteNhaCungCap(req, res));

  return router;
}

module.exports = createNhaCungCapRoutes;


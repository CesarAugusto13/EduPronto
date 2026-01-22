const express = require('express');
const router = express.Router();
const atividadeController = require('../controllers/atividade.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, atividadeController.criar);
router.get('/', authMiddleware, atividadeController.listar);

module.exports = router;

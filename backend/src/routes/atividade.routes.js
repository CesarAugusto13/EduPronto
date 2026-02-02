const express = require('express');
const router = express.Router();
const atividadeController = require('../controllers/atividade.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, atividadeController.criar);
router.get('/', authMiddleware, atividadeController.listar);
router.get('/:id', authMiddleware, atividadeController.buscarPorId); // 👈 NOVO
router.put('/:id', authMiddleware, atividadeController.atualizar);   // 👈
router.delete('/:id', authMiddleware, atividadeController.excluir);  // 👈

module.exports = router;

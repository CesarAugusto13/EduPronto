const express = require("express");
const router = express.Router();

const publicAtividadeController = require(
  "../controllers/publicAtividade.controller"
);

router.get(
  "/atividades/:id",
  publicAtividadeController.buscarPublicaPorId
);

module.exports = router;

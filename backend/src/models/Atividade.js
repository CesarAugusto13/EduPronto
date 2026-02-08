const mongoose = require("mongoose");

const AtividadeSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
  },
  materia: {
    type: String,
    required: true,
  },
  turma: {
    type: String,
    required: true,
  },
  dataEntrega: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["ativa", "encerrada"],
    default: "ativa",
  },
  publica: {
    type: Boolean,
    default: false,
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
    required: true,
  },
  criadaEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Atividade", AtividadeSchema);

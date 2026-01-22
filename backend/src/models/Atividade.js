const mongoose = require('mongoose');

const AtividadeSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  materia: {
    type: String,
    required: true
  },
  ano: {
    type: String,
    required: true
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true
  },
  criadaEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Atividade', AtividadeSchema);

const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  biografia: {
    type: String,
    default: ''
  },
  escola: {
    type: String,
    default: ''
  },
  formacoes: {
    type: [String],
    default: []
  },
  foto: {
    type: String,
    default: ''
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Professor', ProfessorSchema);

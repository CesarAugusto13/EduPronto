const Professor = require('../models/Professor');
const bcrypt = require('bcryptjs');

/**
 * PERFIL LOGADO
 */
exports.me = async (req, res) => {
  return res.json(req.user);
};

/**
 * ATUALIZAR PERFIL
 */
exports.update = async (req, res) => {
  const {
    nome,
    biografia,
    email,
    escola,
    formacoes,
    senha
  } = req.body;

  const data = {
    nome,
    biografia,
    email,
    escola,
    formacoes
  };

  if (senha) {
    data.senha = await bcrypt.hash(senha, 10);
  }

  const professor = await Professor.findByIdAndUpdate(
    req.user._id,
    data,
    { new: true }
  ).select('-senha');

  return res.json({
    message: 'Perfil atualizado com sucesso',
    professor
  });
};

/**
 * UPLOAD FOTO
 */
exports.uploadFoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhuma imagem enviada' });
  }

  const professor = await Professor.findByIdAndUpdate(
    req.user._id,
    { foto: `/uploads/${req.file.filename}` },
    { new: true }
  ).select('-senha');

  return res.json({
    message: 'Foto atualizada',
    professor
  });
};

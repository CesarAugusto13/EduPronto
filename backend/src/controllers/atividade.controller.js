const mongoose = require('mongoose');
const Atividade = require('../models/Atividade');

// CREATE — Criar nova atividade
exports.criar = async (req, res) => {
  try {
    const {
      titulo,
      descricao,
      turma,
      dataEntrega,
      status,
      materia,
      publica,
    } = req.body;

    const atividade = await Atividade.create({
      titulo,
      descricao,
      turma,
      dataEntrega,
      status: status || "ativa",
      materia,
      publica: Boolean(publica), // 🔥 AQUI ESTÁ A CORREÇÃO
      professor: req.user._id, // vem do token
    });

    return res.status(201).json(atividade);
  } catch (error) {
    console.error("ERRO AO CRIAR ATIVIDADE:", error);
    return res.status(400).json({ message: error.message });
  }
};

// READ — Listar atividades do professor logado
exports.listar = async (req, res) => {
  try {
    const atividades = await Atividade.find({
      professor: req.user._id,
    }).sort({ criadaEm: -1 });

    return res.json(atividades);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar atividades' });
  }
};

// READ — Buscar atividade por ID
exports.buscarPorId = async (req, res) => {
  try {
    const atividade = await Atividade.findOne({
      _id: req.params.id,
      professor: req.user._id, // segurança
    });

    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    return res.json(atividade);
  } catch (error) {
    return res.status(400).json({ message: 'ID inválido' });
  }
};


// UPDATE — Atualizar atividade
exports.atualizar = async (req, res) => {
  try {
    const atividade = await Atividade.findOneAndUpdate(
      { _id: req.params.id, professor: req.user._id },
      req.body,
      { new: true }
    );

    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    return res.json(atividade);
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao atualizar atividade' });
  }
};



// DELETE — Excluir atividade
exports.excluir = async (req, res) => {
  try {
    const atividade = await Atividade.findOneAndDelete({
      _id: req.params.id,
      professor: req.user._id,
    });

    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    return res.json({ message: 'Atividade removida com sucesso' });
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao excluir atividade' });
  }
};

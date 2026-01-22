const Atividade = require('../models/Atividade');

exports.criar = async (req, res) => {
  try {
    const atividade = await Atividade.create({
      ...req.body,
      professor: req.professorId
    });

    return res.status(201).json(atividade);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar atividade' });
  }
};

exports.listar = async (req, res) => {
  try {
    const atividades = await Atividade.find()
      .populate('professor', 'nome email')
      .sort({ criadaEm: -1 });

    return res.json(atividades);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar atividades' });
  }
};

const Atividade = require("../models/Atividade");

exports.buscarPublicaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID não informado" });
    }

    const atividade = await Atividade.findById(id);

    if (!atividade) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }

    if (!atividade.publica) {
      return res.status(403).json({ message: "Atividade não é pública" });
    }

    return res.json(atividade);
  } catch (error) {
    console.error("🔥 ERRO REAL:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
};

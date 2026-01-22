const Professor = require('../models/Professor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * REGISTRO
 */
exports.register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Body da requisição não enviado'
      });
    }

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        message: 'Nome, email e senha são obrigatórios'
      });
    }

    const professorExiste = await Professor.findOne({ email });
    if (professorExiste) {
      return res.status(400).json({
        message: 'Email já cadastrado'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const professor = await Professor.create({
      nome,
      email,
      senha: senhaHash
    });

    return res.status(201).json({
      message: 'Professor registrado com sucesso',
      professor: {
        id: professor._id,
        nome: professor.nome,
        email: professor.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Erro no registro'
    });
  }
};

/**
 * LOGIN
 */
exports.login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Body da requisição não enviado'
      });
    }

    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        message: 'Email e senha são obrigatórios'
      });
    }

    const professor = await Professor.findOne({ email });
    if (!professor) {
      return res.status(400).json({
        message: 'Credenciais inválidas'
      });
    }

    const senhaValida = await bcrypt.compare(senha, professor.senha);
    if (!senhaValida) {
      return res.status(400).json({
        message: 'Credenciais inválidas'
      });
    }

    const token = jwt.sign(
      { id: professor._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({
      token,
      professor: {
        id: professor._id,
        nome: professor.nome,
        email: professor.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Erro no login'
    });
  }
};

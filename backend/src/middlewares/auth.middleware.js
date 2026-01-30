const jwt = require('jsonwebtoken');
const Professor = require('../models/Professor');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' '); // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const professor = await Professor
      .findById(decoded.id)
      .select('-senha');

    if (!professor) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    req.user = professor;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const atividadeRoutes = require('./routes/atividade.routes');

const app = express();

app.use(express.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/atividades', atividadeRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

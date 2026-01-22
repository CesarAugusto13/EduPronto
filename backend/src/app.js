const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const atividadeRoutes = require('./routes/atividade.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/atividades', atividadeRoutes);

module.exports = app;

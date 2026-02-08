const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const atividadeRoutes = require('./routes/atividade.routes');
const profileRoutes = require('./routes/profile.routes');
const publicRoutes = require("./routes/public.routes");

const app = express();

app.use(cors());
app.use(express.json());
    
app.use('/auth', authRoutes);
app.use('/atividades', atividadeRoutes);
app.use('/profile', profileRoutes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use("/public", publicRoutes);


module.exports = app;

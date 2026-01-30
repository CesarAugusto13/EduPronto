require('dotenv').config();
const connectDB = require('./config/database');
const app = require('./app');

const PORT = 3000;

connectDB();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

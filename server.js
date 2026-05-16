const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
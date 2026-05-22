require('dotenv').config();
const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/pages/index.html');
});

app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
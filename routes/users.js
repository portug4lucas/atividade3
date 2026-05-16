const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY name ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id_user = $1 RETURNING *',
      [id]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir usuário.' });
  }
});

module.exports = router;
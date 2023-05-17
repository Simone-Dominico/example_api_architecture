const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

let pessoas = JSON.parse(fs.readFileSync('./data/persons.json', 'utf8'));

app.get('/pessoas', (req, res) => {
  res.json(pessoas);
});

app.get('/pessoas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pessoa = pessoas.find(p => p.id === id);
  if (!pessoa) {
    res.status(404).json({ mensagem: 'Pessoa não encontrada' });
  } else {
    res.json(pessoa);
  }
});

app.post('/pessoas', (req, res) => {
  const novaPessoa = req.body;
  novaPessoa.id = pessoas.length ? Math.max(...pessoas.map(p => p.id)) + 1 : 1;
  pessoas.push(novaPessoa);
  fs.writeFileSync('./data/persons.json', JSON.stringify(pessoas, null, 2));
  res.status(201).json(novaPessoa);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

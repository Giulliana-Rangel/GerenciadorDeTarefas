const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json()); 
app.use(cors()); // Use o middleware cors() aqui
app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

// implemente os endpoints aqui
const tasksRoutes = require('./routes/tasks.routes');

app.use('/tasks', tasksRoutes);
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
});

module.exports = app;


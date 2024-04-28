const express = require('express');

const app = express();
app.use(express.json()); 
app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

// implemente os endpoints aqui
const tasksRoutes = require('./routes/tasks.routes');

app.use('/tasks', tasksRoutes);
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
});

module.exports = app;

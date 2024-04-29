//crie querys para buscar todos os registros, buscar por id, criar, atualizar e deletar um registro
const Task = require('../db/connection');

// Crie uma query na camada model para listar todas as tarefas em um banco de dados mysql
const getAll = async () => {
   const [rows] = await Task.query('SELECT * FROM tasks');
    return rows;
};

// Crie uma query na camada model para listar uma tarefa por id em um banco de dados mysql
const getById = async (id) => {
    const [rows] = await Task.query('SELECT * FROM tasks WHERE id = ?', id);
    return rows;
};

const create = async (task) => {
    const [rows] = await Task.query(
        'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?)',
     [task.title, task.description, task.status, task.user_id]);
    return rows;
}

const update = async (task) => {
    const [rows] = await Task.query(
        'UPDATE tasks SET title = ?, description = ?, status = ?, user_id = ? WHERE id = ?', 
    [task.title, task.description, task.status, task.user_id, task.id]);
    return rows;
};

const remove = async (id) => {
    const [rows] = await Task.query('DELETE FROM tasks WHERE id = ?', id);
    return rows;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};


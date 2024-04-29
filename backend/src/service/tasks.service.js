const tasksModel = require('../model/tasks.model');

// crie na camada service o método findAllTasks que retorna todas as tarefas do banco de dados
// crie na camada service o método findTaskById que retorna a tarefa com o id especificado
// crie na camada service o método createTask que cria uma nova tarefa no banco de dados
// crie na camada service o método updateTask que atualiza a tarefa com o id especificado
// crie na camada service o método deleteTask que deleta a tarefa com o id especificado
// utilize em todos os métodos da camada service os métodos correspondentes da camada model
// utilize o status 404 para quando não encontrar a tarefa com o id especificado
// utilize o status 400 para quando não conseguir criar a tarefa
// utilize o status 400 para quando não conseguir atualizar a tarefa
// utilize o status 400 para quando não conseguir deletar a tarefa
// utilize o status 200 para quando encontrar a tarefa com o id especificado
// utilize o status 200 para quando conseguir criar a tarefa
// utilize o status 200 para quando conseguir atualizar a tarefa
// utilize o status 200 para quando conseguir deletar a tarefa
// utilize o status 200 para quando encontrar todas as tarefas
// utilize try/catch em todos os métodos da camada service

const findAllTasks = async () => {
    try {
        const tasks = await tasksModel.getAll();
        return tasks;
    } catch (error) {
        throw new Error(error);
    }
    }

const findTaskById = async (id) => {
    try {
        const task = await tasksModel.getById(id);
        if (!task) {
            return { message: 'Tarefa não encontrada' };
        }
        return task;
    } catch (error) {
        throw new Error(error);
    }
}
const createTask = async (task) => {
    try {
        const newTask = await tasksModel.create(task);
        if (!newTask) {
            return { message: 'Não foi possível criar a tarefa' };
        }
        return newTask;
    } catch (error) {
        throw new Error(error);
    }
}
const updateTask = async (id, task) => {
    try {
        const updatedTask = await tasksModel.update(id, task);
        if (!updatedTask) {
            return { message: 'Não foi possível atualizar a tarefa' };
        }
        return updatedTask;
    } catch (error) {
        throw new Error(error);
    }
}
const deleteTask = async (id) => {
    try {
        const deletedTask = await tasksModel.remove(id);
        if (!deletedTask) {
            return { message: 'Não foi possível deletar a tarefa' };
        }
        return deletedTask;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    findAllTasks,
    findTaskById,
    createTask,
    updateTask,
    deleteTask,
};



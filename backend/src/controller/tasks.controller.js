//"Crie um método na camada de controller para lidar com a criação de uma nova tarefa. O método deve receber os dados da requisição HTTP, validar os parâmetros e chamar o método correspondente na camada de serviço para criar a tarefa."
//Crie um método na camada de controller para lidar com a atualização de uma tarefa. O método deve receber os dados da requisição HTTP, validar os parâmetros e chamar o método correspondente na camada de serviço para atualizar a tarefa.
//Crie um método na camada de controller para lidar com a exclusão de uma tarefa. O método deve receber os dados da requisição HTTP, validar os parâmetros e chamar o método correspondente na camada de serviço para deletar a tarefa.
//Crie um método na camada de controller para lidar com a busca de todas as tarefas. O método deve chamar o método correspondente na camada de serviço para buscar todas as tarefas.
//Crie um método na camada de controller para lidar com a busca de uma tarefa por id. O método deve receber os dados da requisição HTTP, validar os parâmetros e chamar o método correspondente na camada de serviço para buscar a tarefa.

const findAllTasks = async (_req, res) => {
    try {
        const tasks = await tasksService.findAllTasks();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const findTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await tasksService.findTaskById(id);
        if (task.message) {
            return res.status(404).json(task);
        }
        return res.status(200).json(task);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const createTask = async (req, res) => {
    try {
        const task = req.body;
        const newTask = await tasksService.createTask(task);
        if (newTask.message) {
            return res.status(400).json(newTask);
        }
        return res.status(200).json(newTask);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = req.body;
        const updatedTask = await tasksService.updateTask(id, task);
        if (updatedTask.message) {
            return res.status(400).json(updatedTask);
        }
        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await tasksService.deleteTask(id);
        if (deletedTask.message) {
            return res.status(400).json(deletedTask);
        }
        return res.status(200).json(deletedTask);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    findAllTasks,
    findTaskById,
    createTask,
    updateTask,
    deleteTask,
};
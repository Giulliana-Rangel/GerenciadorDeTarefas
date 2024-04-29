// crie o codigo que faça a requisição para a api https://localhost:3002/tasks
// e exiba o resultado no console

let tasks = [];

// Função para listar todas as tarefas
async function listTasks() {
    const response = await fetch('http://localhost:3002/tasks');
    tasks = await response.json();
    const tasksElement = document.getElementById('tasks');
    tasksElement.innerHTML = '';
    tasks.forEach(task => {
        tasksElement.innerHTML += `<li>${task.title} - ${task.description} - ${task.status}</li>`;
    });
}

// Função para adicionar uma nova tarefa
async function addTask(title, description, status) {
    const response = await fetch('http://localhost:3002/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: title, taskDescription: description, status: status }),
    });
    const task = await response.json();
    tasks.push(task);
}

// Função para atualizar uma tarefa
async function updateTask(taskId, taskName, taskStatus) {
    const response = await fetch(`http://localhost:3002/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: taskName, status: taskStatus }),
    });
    const updatedTask = await response.json();
    const index = tasks.findIndex(task => task.id === taskId);
    tasks[index] = updatedTask;
}

// Função para excluir uma tarefa
async function deleteTask(taskId) {
    await fetch(`http://localhost:3002/tasks/${taskId}`, {
        method: 'DELETE',
    });
    tasks = tasks.filter(task => task.id !== taskId);
}

// Função para excluir todas as tarefas
async function deleteAllTasks() {
    tasks.forEach(async (task) => {
        await deleteTask(task.id);
    });
}

// Função para excluir todas as tarefas concluídas
async function deleteAllCompletedTasks() {
    tasks.forEach(async (task) => {
        if (task.status === 'concluida') {
            await deleteTask(task.id);
        }
    });
}

// Adicionando event listeners para os botões
document.getElementById('addTask').addEventListener('click', () => {
    const taskName = document.querySelector('input[name="task"]').value;
    const taskStatus = document.getElementById('statusTask').value;
    addTask(taskName, taskStatus);
});

document.getElementById('listTasks').addEventListener('click', listTasks);

document.getElementById('updateTask').addEventListener('click', () => {
    const taskId = prompt('Digite o ID da tarefa que você deseja atualizar');
    const taskName = prompt('Digite o novo nome da tarefa');
    const taskStatus = prompt('Digite o novo status da tarefa');
    updateTask(taskId, taskName, taskStatus);
});

document.getElementById('deleteTask').addEventListener('click', () => {
    const taskId = prompt('Digite o ID da tarefa que você deseja excluir');
    deleteTask(taskId);
});

document.getElementById('deleteAllTasks').addEventListener('click', deleteAllTasks);

document.getElementById('deleteAllCompletedTasks').addEventListener('click', deleteAllCompletedTasks);












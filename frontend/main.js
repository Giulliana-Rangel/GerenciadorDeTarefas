// Variável global para armazenar o ID da tarefa em edição
let editingTaskId = null;

// Função para adicionar uma nova tarefa
async function addTask(title, description, status) {
    try {
        const response = await fetch('http://localhost:3002/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, status }),
        });

        if (!response.ok) {
            throw new Error('Failed to add task');
        }

        await listTasks();
        alert('Tarefa adicionada com sucesso!');
    } catch (error) {
        console.error('Error adding task:', error);
        alert('Erro ao adicionar tarefa');
    }
}

// Adicionando event listener ao formulário de adicionar tarefa
document.getElementById('taskForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;

    await addTask(title, description, status);

    const modal = document.getElementById('taskModal');
    modal.style.display = 'none';
});


// Função para adicionar uma nova tarefa
async function addTask(title, description, status) {
    try {
        const response = await fetch('http://localhost:3002/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, status }),
        });

        if (!response.ok) {
            throw new Error('Failed to add task');
        }

        await listTasks();
        alert('Tarefa adicionada com sucesso!');
    } catch (error) {
        console.error('Error adding task:', error);
        alert('Erro ao adicionar tarefa');
    }
}


// Função para abrir o modal de edição preenchido com os dados da tarefa
function openEditModal(task) {
    const modal = document.getElementById('taskModal');
    const titleInput = document.getElementById('taskTitle');
    const descriptionInput = document.getElementById('taskDescription');
    const statusSelect = document.getElementById('taskStatus');

    titleInput.value = task.title;
    descriptionInput.value = task.description;
    statusSelect.value = task.status;

    modal.style.display = 'block';

    // Definir o ID da tarefa em edição
    editingTaskId = task.id;
}

// Função para adicionar ou atualizar uma tarefa
async function addTask(title, description, status) {
    try {
        let method = 'POST'; // Definir o método padrão como POST

        // Se houver um ID de tarefa em edição, alterar o método para PUT
        if (editingTaskId) {
            method = 'PUT';
        }

        const url = editingTaskId ? `http://localhost:3002/tasks/${editingTaskId}` : 'http://localhost:3002/tasks';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, status }),
        });

        if (!response.ok) {
            throw new Error('Failed to add/update task');
        }

        // Limpar o ID de tarefa em edição após adicionar/atualizar
        editingTaskId = null;

        // Atualiza a lista de tarefas após adicionar/atualizar
        await listTasks();
        alert('Tarefa adicionada/atualizada com sucesso!');
    } catch (error) {
        console.error('Error adding/updating task:', error);
        alert('Erro ao adicionar/atualizar tarefa');
    }
}

// Função para excluir uma tarefa
async function deleteTask(id) {
    try {
        const response = await fetch(`http://localhost:3002/tasks/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        // Atualiza a lista de tarefas após a exclusão
        await listTasks();
        alert('Tarefa excluída com sucesso!');
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Erro ao excluir tarefa');
    }
}

// Adicionando event listener ao formulário de tarefa
document.getElementById('taskForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;

    addTask(title, description, status);

    const modal = document.getElementById('taskModal');
    modal.style.display = 'none';
});

// Adicionando event listener ao botão de excluir tarefa
function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-task-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const taskId = button.dataset.taskId;
            await deleteTask(taskId);
        });
    });
}

// Adicionando event listener ao botão de listar tarefas
document.getElementById('btnListTasks').addEventListener('click', listTasks);

// Adicionando event listener ao fechar o modal de edição
document.querySelector('.close').addEventListener('click', () => {
    const modal = document.getElementById('taskModal');
    modal.style.display = 'none';
    
    // Limpar o ID de tarefa em edição ao fechar o modal
    editingTaskId = null;
});

// Adicionando event listener ao formulário de edição de tarefa
document.getElementById('editTaskForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('editTaskId').value;
    const title = document.getElementById('editTaskTitle').value;
    const description = document.getElementById('editTaskDescription').value;
    const status = document.getElementById('editTaskStatus').value;
    updateTask(id, title, description, status);
    // Fechar o modal após salvar a alteração da tarefa
    const modal = document.getElementById('editTaskModal');
    modal.style.display = 'none';
});

// Inicializar botões de exclusão após listar tarefas
async function listTasks() {
    try {
        const response = await fetch('http://localhost:3002/tasks');
        const tasks = await response.json();

        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = `Title: ${task.title}, Description: ${task.description}, Status: ${task.status}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-task-btn');
            deleteButton.dataset.taskId = task.id;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => openEditModal(task));

            taskItem.appendChild(deleteButton);
            taskItem.appendChild(editButton);

            taskList.appendChild(taskItem);
        });

        // Configurar botões de exclusão após listar tarefas
        setupDeleteButtons();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Chamar listTasks para listar as tarefas no carregamento da página
listTasks();

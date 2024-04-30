// Função para abrir o modal de adicionar tarefa
document.getElementById("addTaskBtn").addEventListener("click", function() {
    document.getElementById("addTaskModal").style.display = "block";
});

// Função para fechar o modal ao clicar no botão fechar
document.querySelectorAll(".close").forEach(function(closeBtn) {
    closeBtn.addEventListener("click", function() {
        document.querySelectorAll(".modal").forEach(function(modal) {
            modal.style.display = "none";
        });
    });
});

// Função para listar tarefas e mostrar botões de ação
document.getElementById("listTasksBtn").addEventListener("click", function() {
    document.getElementById("taskList").style.display = "block";
    document.getElementById("action-buttons").style.display = "block";
    
    // Requisição GET para obter a lista de tarefas
    fetch('http://localhost:3002/tasks')
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = ''; // Limpa a lista antes de adicionar novos elementos
            
            // Adiciona cada tarefa à lista
            data.forEach(task => {
                const taskCard = document.createElement('div');
                taskCard.classList.add('task-card');
                taskCard.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Status: ${task.status}</p>
                    <p>User ID: ${task.user_id}</p>
                    <button class="delete-btn" data-id="${task.id}">Excluir</button>
                    <button class="edit-btn" data-id="${task.id}">Editar</button>
                `;
                taskList.appendChild(taskCard);
            });

            // Adiciona ouvinte de eventos para botões de excluir
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const taskId = btn.getAttribute('data-id');
                    // Requisição DELETE para excluir a tarefa
                    fetch(`http://localhost:3002/tasks/${taskId}`, { method: 'DELETE' })
                        .then(response => response.json())
                        .then(data => {
                            // Atualiza a lista de tarefas após excluir
                            document.getElementById("listTasksBtn").click();
                        });
                });
            });

            // Adiciona ouvinte de eventos para botões de editar
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove a classe 'active' de todos os botões de edição
                    document.querySelectorAll('.edit-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    // Adiciona a classe 'active' ao botão de edição clicado
                    btn.classList.add('active');

                    const taskId = btn.getAttribute('data-id');
                    // Requisição GET para obter os detalhes da tarefa a ser editada
                    fetch(`http://localhost:3002/tasks/${taskId}`)
                        .then(response => response.json())
                        .then(task => {
                            // Preenche o formulário de edição com os detalhes da tarefa
                            document.getElementById("editTitle").value = task.title;
                            document.getElementById("editDescription").value = task.description;
                            document.getElementById("editStatus").value = task.status;
                            document.getElementById("editUserId").value = task.user_id;
                            // Abre o modal de edição
                            document.getElementById("editTaskModal").style.display = "block";
                        });
                });
            });
        });
});

// Função para adicionar tarefa
document.getElementById("addTaskForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o recarregamento da página ao enviar o formulário
    
    // Obtém os valores do formulário
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;
    const userId = parseInt(document.getElementById("user_id").value);

    // Cria um objeto com os dados da nova tarefa
    const newTask = { title, description, status, user_id: userId };

    // Requisição POST para adicionar a nova tarefa
    fetch('http://localhost:3002/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar tarefa');
        }
        return response.json();
    })
    .then(data => {
        // Exibe um alerta de sucesso
        alert('Tarefa adicionada com sucesso');
        // Fecha o modal de adição de tarefa
        document.getElementById("addTaskModal").style.display = "none";
    })
    .catch(error => {
        // Exibe um alerta de erro
        alert('Erro ao adicionar tarefa');
        console.error('Erro ao adicionar tarefa:', error);
    });
});

// Função para editar tarefa
document.getElementById("editTaskForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o recarregamento da página ao enviar o formulário
    
    // Obtém os valores do formulário
    const title = document.getElementById("editTitle").value;
    const description = document.getElementById("editDescription").value;
    const status = document.getElementById("editStatus").value;
    const userId = parseInt(document.getElementById("editUserId").value);

    // Cria um objeto com os dados da tarefa editada
    const editedTask = { title, description, status, user_id: userId };

    // Obtém o ID da tarefa a ser editada apenas se houver um botão de edição ativo
    const activeEditBtn = document.querySelector('.edit-btn.active');
    console.log("Botão de edição ativo:", activeEditBtn); // Adicionando log para depurar
    if (activeEditBtn) {
        const taskId = activeEditBtn.getAttribute('data-id');
        console.log("ID da tarefa a ser editada:", taskId); // Adicionando log para depurar

        // Requisição PUT para editar a tarefa
        fetch(`http://localhost:3002/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedTask),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao editar tarefa');
            }
            return response.json();
        })
        .then(data => {
            // Exibe um alerta de sucesso
            alert('Tarefa editada com sucesso');
            // Fecha o modal de edição de tarefa
            document.getElementById("editTaskModal").style.display = "none";
            // Atualiza a lista de tarefas após editar
            document.getElementById("listTasksBtn").click();
        })
        .catch(error => {
            // Exibe um alerta de erro
            alert('Erro ao editar tarefa');
            console.error('Erro ao editar tarefa:', error);
        });
    } else {
        alert('Nenhuma tarefa selecionada para editar');
    }
});


// Função para deletar todas as tarefas
document.getElementById("deleteAllBtn").addEventListener("click", function() {
    // Requisição DELETE para excluir todas as tarefas
    fetch('http://localhost:3002/tasks', { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            // Atualiza a lista de tarefas após excluir
            document.getElementById("listTasksBtn").click();
        });
});

// Função para deletar as tarefas concluídas
document.getElementById("deleteCompletedBtn").addEventListener("click", function() {
    // Requisição DELETE para excluir apenas as tarefas concluídas
    fetch('http://localhost:3002/tasks?status=done', { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            // Atualiza a lista de tarefas após excluir
            document.getElementById("listTasksBtn").click();
        });
});





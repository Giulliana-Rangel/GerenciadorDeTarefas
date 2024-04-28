-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS todo_list;

-- Usar o banco de dados criado
USE todo_list;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Criar tabela de tarefas
CREATE TABLE IF NOT EXISTS tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('todo', 'doing', 'done') NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Inserir usuários
INSERT INTO users (name, email, password) VALUES ('Alice', 'alice@example.com', 'senha123');

-- Inserir tarefas
INSERT INTO tasks (title, description, status, user_id) VALUES ('Estudar SQL', 'Estudar SQL para melhorar minhas habilidades de programação', 'todo', 1);
INSERT INTO tasks (title, description, status, user_id) VALUES ('Fazer compras', 'Comprar pão, leite e ovos no supermercado', 'doing', 1);
INSERT INTO tasks (title, description, status, user_id) VALUES ('Limpar a casa', 'Limpar a casa e organizar os armários', 'done', 1);




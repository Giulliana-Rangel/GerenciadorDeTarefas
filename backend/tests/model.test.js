//crie testes unitarios para a camada model, q sao querys mysql de um CRUD para gerenciamento de contatos
//deve testar os metodos de inserir, atualizar, deletar e buscar
// os parâmentros são titulos, descrições, status e user_id

const model = require('../src/model/tasks.model');
const db = require('../src/db/connection');
const jest = require('jest');

describe('Model', () => {
    before(async () => {
        await db.query('TRUNCATE TABLE tasks');
    });
    
    describe('getAll', () => {
        it('retorna um array vazio quando não há tarefas', async () => {
            const tasks = await model.getAll();
            expect(tasks).to.be.an('array');
            expect(tasks).to.be.empty;
        });
    
        it('retorna um array com uma tarefa quando há uma tarefa', async () => {
            await db.query('INSERT INTO tasks (title, description, status, user_id) VALUES ("Estudar", "Estudar MySQL", "pendente", 1)');
            const tasks = await model.getAll();
            expect(tasks).to.be.an('array');
            expect(tasks).to.have.lengthOf(1);
            expect(tasks[0]).to.have.property('title', 'Estudar');
            expect(tasks[0]).to.have.property('description', 'Estudar MySQL');
            expect(tasks[0]).to.have.property('status', 'pendente');
            expect(tasks[0]).to.have.property('user_id', 1);
        });
    });

    describe('getById', () => {
        it('retorna um objeto vazio quando a tarefa não existe', async () => {
            const task = await model.getById(1);
            expect(task).to.be.an('array');
            expect(task).to.be.empty;
        });

        it('retorna um objeto com a tarefa quando a tarefa existe', async () => {
            await db.query('INSERT INTO tasks (title, description, status, user_id) VALUES ("Estudar", "Estudar MySQL", "pendente", 1)');
            const task = await model.getById(1);
            expect(task).to.be.an('array');
            expect(task).to.have.lengthOf(1);
            expect(task[0]).to.have.property('title', 'Estudar');
            expect(task[0]).to.have.property('description', 'Estudar MySQL');
            expect(task[0]).to.have.property('status', 'pendente');
            expect(task[0]).to.have.property('user_id', 1);
        });
    });

    describe('create', () => {
        it('retorna um objeto com a tarefa criada', async () => {
            const task = {
                title: 'Estudar',
                description: 'Estudar MySQL',
                status: 'pendente',
                user_id: 1,
            };

            const createdTask = await model.create(task);   
            expect(createdTask).to.be.an('object');
            expect(createdTask).to.have.property('title', 'Estudar');
            expect(createdTask).to.have.property('description', 'Estudar MySQL');
            expect(createdTask).to.have.property('status', 'pendente');
            expect(createdTask).to.have.property('user_id', 1);
        });
    });

    describe('update', () => {
        it('retorna um objeto com a tarefa atualizada', async () => {
            const task = {
                id: 1,
                title: 'Estudar',
                description: 'Estudar MySQL',
                status: 'pendente',
                user_id: 1,
            };

            const updatedTask = await model.update(task);
            expect(updatedTask).to.be.an('object');
            expect(updatedTask).to.have.property('title', 'Estudar');
            expect(updatedTask).to.have.property('description', 'Estudar MySQL');
            expect(updatedTask).to.have.property('status', 'pendente');
            expect(updatedTask).to.have.property('user_id', 1);
        });
    });

    describe('remove', () => {
        it('retorna um objeto vazio quando a tarefa é deletada', async () => {
            const task = await model.remove(1);
            expect(task).to.be.an('array');
            expect(task).to.be.empty;
        });
    });

    after(async () => {
        await db.query('TRUNCATE TABLE tasks');
    });

});









const lists = {
    todo: document.getElementById('list-todo'),
    doing: document.getElementById('list-doing'),
    done: document.getElementById('list-done')
};

const counts = {
    todo: document.getElementById('count-todo'),
    doing: document.getElementById('count-doing'),
    done: document.getElementById('count-done')
};

const modal = document.getElementById('taskModal');
const addBtn = document.getElementById('addTaskBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const titleInput = document.getElementById('taskTitle');
const descInput = document.getElementById('taskDesc');
const modalTitle = document.getElementById('modalTitle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editId = null;

/* Modal */
addBtn.onclick = () => openModal();
cancelBtn.onclick = closeModal;

function openModal(task = null) {
    modal.classList.add('active');
    if (task) {
        modalTitle.innerText = 'Edit Task';
        titleInput.value = task.title;
        descInput.value = task.desc;
        editId = task.id;
    } else {
        modalTitle.innerText = 'Add Task';
        titleInput.value = '';
        descInput.value = '';
        editId = null;
    }
}

function closeModal() {
    modal.classList.remove('active');
}

/* Save */
saveBtn.onclick = () => {
    const title = titleInput.value.trim();
    if (!title) return alert('Title required');

    if (editId) {
        const task = tasks.find(t => t.id === editId);
        task.title = title;
        task.desc = descInput.value.trim();
    } else {
        tasks.push({
            id: Date.now(),
            title,
            desc: descInput.value.trim(),
            status: 'todo'
        });
    }

    update();
    closeModal();
};

/* Render */
function render() {
    Object.values(lists).forEach(l => l.innerHTML = '');
    let counter = { todo: 0, doing: 0, done: 0 };

    tasks.forEach(task => {
        counter[task.status]++;
        lists[task.status].appendChild(createCard(task));
    });

    counts.todo.innerText = counter.todo;
    counts.doing.innerText = counter.doing;
    counts.done.innerText = counter.done;
}

function createCard(task) {
    const div = document.createElement('div');
    div.className = 'task-card';

    div.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.desc || ''}</p>
        <div class="task-actions">
            <button class="task-btn btn-move">${nextLabel(task.status)}</button>
            <button class="task-btn btn-del">Del</button>
            <button class="task-btn btn-edit">Edit</button>
        </div>
    `;

    const [move, del, edit] = div.querySelectorAll('button');
    move.onclick = () => moveTask(task);
    del.onclick = () => deleteTask(task.id);
    edit.onclick = () => openModal(task);

    return div;
}

function nextLabel(status) {
    if (status === 'todo') return 'Start';
    if (status === 'doing') return 'Done';
    return 'Reopen';
}

function moveTask(task) {
    task.status =
        task.status === 'todo' ? 'doing' :
        task.status === 'doing' ? 'done' : 'todo';
    update();
}

function deleteTask(id) {
    if (confirm('Delete task?')) {
        tasks = tasks.filter(t => t.id !== id);
        update();
    }
}

function update() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
}

render();

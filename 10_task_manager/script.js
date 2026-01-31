const todoList = document.getElementById('list-todo');
const doingList = document.getElementById('list-doing');
const doneList = document.getElementById('list-done');

const countTodo = document.getElementById('count-todo');
const countDoing = document.getElementById('count-doing');
const countDone = document.getElementById('count-done');

const modal = document.getElementById('taskModal');
const addTaskBtn = document.getElementById('addTaskBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');

const titleInput = document.getElementById('taskTitle');
const descInput = document.getElementById('taskDesc');

let tasks = JSON.parse(localStorage.getItem('miniproject_tasks')) || [];
let isEditing = false;
let currentEditId = null;

// Modal Logic
addTaskBtn.onclick = () => {
    isEditing = false;
    titleInput.value = '';
    descInput.value = '';
    document.getElementById('modalTitle').innerText = 'Add New Task';
    modal.classList.add('active');
};

cancelBtn.onclick = () => modal.classList.remove('active');

saveBtn.onclick = () => {
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (!title) return alert('Title is required');

    if (isEditing) {
        const task = tasks.find(t => t.id === currentEditId);
        task.title = title;
        task.desc = desc;
    } else {
        const newTask = {
            id: Date.now(),
            title,
            desc,
            status: 'todo' // todo, doing, done
        };
        tasks.push(newTask);
    }

    saveTasks();
    renderTasks();
    modal.classList.remove('active');
};

// Render Logic
function renderTasks() {
    todoList.innerHTML = '';
    doingList.innerHTML = '';
    doneList.innerHTML = '';

    let cTodo = 0, cDoing = 0, cDone = 0;

    tasks.forEach(task => {
        const card = createCard(task);
        if (task.status === 'todo') {
            todoList.appendChild(card);
            cTodo++;
        } else if (task.status === 'doing') {
            doingList.appendChild(card);
            cDoing++;
        } else {
            doneList.appendChild(card);
            cDone++;
        }
    });

    countTodo.innerText = cTodo;
    countDoing.innerText = cDoing;
    countDone.innerText = cDone;
}

function createCard(task) {
    const div = document.createElement('div');
    div.className = 'task-card';
    div.innerHTML = `
        <h3>${escapeHtml(task.title)}</h3>
        <p>${escapeHtml(task.desc)}</p>
        <div class="task-actions">
            ${getNextBtn(task)}
            <button class="task-btn btn-del" onclick="deleteTask(${task.id})">Del</button>
            <button class="task-btn" onclick="editTask(${task.id})" style="background:#6b7280">Edit</button>
        </div>
    `;
    return div;
}

function getNextBtn(task) {
    if (task.status === 'todo') return `<button class="task-btn btn-move" onclick="moveTask(${task.id}, 'doing')">Start</button>`;
    if (task.status === 'doing') return `<button class="task-btn btn-move" onclick="moveTask(${task.id}, 'done')">Done</button>`;
    return `<button class="task-btn btn-move" onclick="moveTask(${task.id}, 'todo')">Reopen</button>`;
}

function moveTask(id, newStatus) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = newStatus;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm('Delete task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        isEditing = true;
        currentEditId = id;
        titleInput.value = task.title;
        descInput.value = task.desc;
        document.getElementById('modalTitle').innerText = 'Edit Task';
        modal.classList.add('active');
    }
}

function saveTasks() {
    localStorage.setItem('miniproject_tasks', JSON.stringify(tasks));
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

// Init
renderTasks();

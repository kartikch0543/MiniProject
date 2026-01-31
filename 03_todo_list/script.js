const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const pendingCount = document.getElementById('pendingCount');
const emptyState = document.getElementById('emptyState');

// Set date
const options = { weekday: 'long', month: 'short', day: 'numeric' };
document.getElementById('date').innerText = new Date().toLocaleDateString('en-US', options);

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    const pending = tasks.filter(t => !t.completed).length;
    pendingCount.innerText = pending;

    if (tasks.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;

            // Priority Color
            let priorityColor = '#3498db';
            if (task.priority === 'High') priorityColor = '#e74c3c';
            if (task.priority === 'Low') priorityColor = '#2ecc71';

            li.innerHTML = `
                <div class="task-content" onclick="toggleTask(${index})">
                    <div class="checkbox-custom"></div>
                    <div>
                        <span class="task-text">${escapeHtml(task.text)}</span>
                        <span style="font-size:0.8rem; color:${priorityColor}; margin-left:10px;">[${task.priority || 'Normal'}]</span>
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteTask(${index})">
                    Delete
                </button>
            `;
            taskList.appendChild(li);
        });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    const priority = document.getElementById('priorityInput').value;
    if (text) {
        tasks.push({ text, completed: false, priority });
        taskInput.value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function clearAll() {
    tasks = [];
    renderTasks();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial Render
renderTasks();

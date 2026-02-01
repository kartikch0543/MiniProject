const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const priorityInput = document.getElementById('priorityInput');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';

    emptyState.style.display = tasks.length === 0 ? 'block' : 'none';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        let color = '#64748b';
        if (task.priority === 'High') color = '#ef4444';
        if (task.priority === 'Low') color = '#22c55e';

        li.innerHTML = `
            <div class="task-text" onclick="toggleTask(${index})">
                <span>${task.text}</span>
                <small class="task-meta">
                    ${task.date} • ${task.time} • 
                    <span style="color:${color}">[${task.priority}]</span>
                </small>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">✖</button>
        `;

        taskList.appendChild(li);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task
function addTask() {
    const text = taskInput.value.trim();
    const priority = priorityInput.value;

    if (!text) {
        alert('Please write a task first 😊');
        return;
    }

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString();

    tasks.push({
        text,
        priority,
        completed: false,
        time,
        date
    });

    taskInput.value = '';
    renderTasks();
}

// Toggle completed
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Events
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();

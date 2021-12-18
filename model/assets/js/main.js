const inputTask = document.querySelector('.input-new-task');
const addTask = document.querySelector('.btn-add-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li');
    return li;
}

function createBtnErase(li) {
    li.innerText += '  ';
    const btn = document.createElement('button');
    btn.innerHTML = 'Erase';
    //btn.classList.add('erase');
    btn.setAttribute('class', 'erase');
    btn.setAttribute('title', 'Erase task');
    li.appendChild(btn);
}

document.addEventListener('click', function(e) {
    const el = e.target;
    
    if(el.classList.contains('erase')) {
        el.parentElement.remove();
        saveTasks();
    }
});

inputTask.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if(!inputTask === '') return;
        createTask(inputTask.value);
    }
});

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}

function createTask(input) {
    const li = createLi();
    li.innerText = input;
    tasks.appendChild(li);
    createBtnErase(li)
    clearInput();
    saveTasks();
}

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const listTasks = [];

    for(let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Erase', '').trim();
        listTasks.push(taskText);
    }
    const tasksJson = JSON.stringify(listTasks);
    localStorage.setItem('tasks', tasksJson);
}

addTask.addEventListener('click', function() {
    if(!inputTask === '') return;
    createTask(inputTask.value);
});

function loadTasks() {
    const tasks = localStorage.getItem('tasks');
    const listTasks = JSON.parse(tasks);

    for(let task of listTasks) {
        createTask(task);
    }
}

loadTasks();
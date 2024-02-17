
let tasks = [];

function salvarDados() {
  localStorage.setItem('listaTarefas', JSON.stringify(tasks));
}

function carregarDados() {
  const dadosSalvos = localStorage.getItem('listaTarefas');
  if (dadosSalvos) {
    tasks = JSON.parse(dadosSalvos);
    renderTasks();
  }
}

window.addEventListener('load', carregarDados);

document.getElementById('addTask').addEventListener('click', () => {
  const newTaskText = document.getElementById('newTask').value.trim();
  if (newTaskText !== '') {
    const task = { text: newTaskText, completed: false };
    tasks.push(task);
    renderTasks();
    document.getElementById('newTask').value = '';

    salvarDados();
  }
});

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  salvarDados();
}


function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('div');
    listItem.classList.add('flex', 'justify-between', 'items-center', 'mb-8');

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.style.textDecoration = 'line-through';
      taskText.style.opacity = '0.5';
      taskText.style.textDecorationColor = 'white'; 
      taskText.style.textDecorationThickness = '3px';
      salvarDados();
    }

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('flex');

    const completedButton = document.createElement('button');
    completedButton.textContent = 'Completed';
    completedButton.classList.add('px-2', 'py-1','rounded-md', 'btn2','mr-2');
    completedButton.addEventListener('click', () => {
      toggleCompleted(index);
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('px-2','py-1','btn2','rounded-md');
    removeButton.addEventListener('click', () => {
      removeTask(index);
    });

    
    buttonsContainer.appendChild(completedButton);
    
    buttonsContainer.appendChild(removeButton);
    listItem.appendChild(taskText);
    listItem.appendChild(buttonsContainer);

    if (index > 0) { 
      listItem.classList.add('taskWithBorder');
    }

    taskList.appendChild(listItem);
    

  });
}

renderTasks();

document.getElementById('newTask').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    
    event.preventDefault();

    document.getElementById('addTask').click();
  }
});
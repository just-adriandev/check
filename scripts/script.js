// seu-arquivo-javascript.js

let tasks = [];

document.getElementById('addTask').addEventListener('click', () => {
  const newTaskText = document.getElementById('newTask').value.trim();
  if (newTaskText !== '') {
    const task = { text: newTaskText, completed: false };
    tasks.push(task);
    renderTasks();
    document.getElementById('newTask').value = '';
  }
});

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
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
    listItem.classList.add('flex', 'justify-between', 'items-center', 'mb-2');

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.style.color = task.color;
    if (task.completed) {
      taskText.style.textDecoration = 'line-through';
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
    taskList.appendChild(listItem);
  });
}

renderTasks();

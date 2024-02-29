import { get } from "./services/apis.js";

document.addEventListener('DOMContentLoaded', async () => {
  const tasks = (await get()).data;

  renderTasks(tasks);
});

function renderTasks(tasks) {
  const listElement = document.querySelector('.todo-list');
  listElement.innerHTML = '';

  tasks.forEach(task => {
    const itemElement = document.createElement('li');
    const viewDiv = document.createElement('div');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const button = document.createElement('button');

    itemElement.className = 'todo-item';
    viewDiv.className = 'view';
    checkbox.type = 'checkbox';
    checkbox.className = 'toggle-item';
    checkbox.dataset.id = task.id;
    label.textContent = task.name;
    label.className = 'todo-item-label';
    label.id = task.id
    button.className = 'btn-destroy';

    viewDiv.append(checkbox, label, button);
    itemElement.append(viewDiv);
    listElement.prepend(itemElement);

    checkbox.addEventListener('click', function (event) {
      event.preventDefault();

      const id = checkbox.dataset.id;
      const toggleLabelElement = document.getElementById(id);

      toggleLabelElement.classList.toggle('completed');
    })

  });
}

const todoInput = document.getElementById('todo-input');

todoInput.addEventListener('keyup', function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    if (todoInput.value.trim() === '') {
      return;
    }

    const task = {
      name: todoInput.value.trim(),
      isCompleted: false
    }

    post(task);

    tasks.push(task);

    todoInput.value = '';

    renderTasks(tasks);
  }
});


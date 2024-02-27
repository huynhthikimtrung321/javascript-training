import { handleGet } from "./api";

document.addEventListener('DOMContentLoaded', async () => {
  const tasks = (await handleGet()).data;

  renderTasks(tasks);
});

function renderTasks(tasks) {
  const listElement = document.querySelector('.todo-list');

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
    label.textContent = task.name;
    label.className = 'todo-item-label';
    button.className = 'btn-destroy';

    viewDiv.append(checkbox, label, button);
    itemElement.append(viewDiv);
    listElement.prepend(itemElement);
  });
}

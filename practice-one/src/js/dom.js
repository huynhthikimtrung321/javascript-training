import { get, post, edit, deleted } from "./services/apis.js";

function renderTasks(tasks) {
  const listElement = document.querySelector('.todo-list');
  listElement.innerHTML = '';

  tasks.forEach(task => {
    const taskItemElement = `
      <li>
        <div class="show" id="show-task-${task.id}">
          <input type="checkbox" class="toggle-item" id="${task.id}">
          <label for="${task.id}" class="todo-item-label" data-id="${task.id}"></label>
          <p class="todo-item-name" data-id=${task.id}>${task.name}</p>
          <button id="delete-task-${task.id}" data-id="${task.id}" class="btn-destroy"></button>
        </div>
        <input class="hidden input-hidden" id="edit-task-${task.id}">
      </li>
    `
    listElement.innerHTML += taskItemElement;
  });

  bindToggleTaskStatusEvent();
  bindToggleEditTaskEvent();
  bindDeleteTaskEvent();
}

function bindToggleTaskStatusEvent() {
  const checkboxes = document.querySelectorAll('.toggle-item');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function (event) {
      event.preventDefault();

      const id = checkbox.id;
      checkbox.nextElementSibling.classList.toggle('completed');
    })
  });
}

function bindAddTaskEvent() {
  const todoInput = document.getElementById('todo-input');

  todoInput.addEventListener('keyup', async function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      if (todoInput.value.trim() === '') {
        return;
      }

      const newTask = {
        name: todoInput.value.trim(),
        isCompleted: false
      }

      await post(newTask);

      const tasks = await get();

      todoInput.value = '';

      renderTasks(tasks);
    }
  });
}

function bindEditTaskEvent(id) {
  const todoInput = document.getElementById(`edit-task-${id}`);

  todoInput.addEventListener('keyup', async function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      if (todoInput.value.trim() === '') {
        return;
      }

      const newTask = {
        name: todoInput.value.trim(),
        isCompleted: false
      }

      await edit(id, newTask);

      const tasks = await get();

      todoInput.value = '';

      renderTasks(tasks);
    }
  });
}

function bindToggleEditTaskEvent() {
  const todoItemElements = document.querySelectorAll('.todo-item-name');

  Array.from(todoItemElements).forEach((element) => {
    const id = element.dataset.id;
    const showTaskElement = document.getElementById(`show-task-${id}`);
    const editTaskElement = document.getElementById(`edit-task-${id}`);

    element.addEventListener('dblclick', function (event) {
      showTaskElement.classList.toggle('hidden');
      editTaskElement.classList.toggle('hidden');

      editTaskElement.focus();
    });

    editTaskElement.addEventListener('focusout', () => {
      showTaskElement.classList.toggle('hidden');
      editTaskElement.classList.toggle('hidden');
    });

    bindEditTaskEvent(id);

  });
}

function bindDeleteTaskEvent() {
  const deleteButtons = document.querySelectorAll('.btn-destroy');

  for ( const item of deleteButtons ){
    item.addEventListener('click', async function (event){
      const id = event.target.dataset.id;

    await deleted(id);

    const tasks = await get();

    renderTasks(tasks);
    })
  }
}


export {
  renderTasks,
  bindToggleTaskStatusEvent,
  bindAddTaskEvent,
  bindToggleEditTaskEvent,
  bindDeleteTaskEvent
}

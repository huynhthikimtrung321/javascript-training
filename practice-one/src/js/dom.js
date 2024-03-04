import { get, post, edit, deleted } from "./services/apis.js";

function renderTasks(tasks) {
  const listElement = document.querySelector('.todo-list');
  listElement.innerHTML = '';

  tasks.forEach(task => {
    const completed = task.isCompleted ? 'completed' : '';

    const taskItemElement = `
      <li>
        <div class="show" id="show-task-${task.id}">
          <input type="checkbox" class="toggle-item" id="${task.id}">
          <label for="${task.id}" class="todo-item-label ${completed}" data-id="${task.id}"></label>
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
    checkbox.addEventListener('click', async function (event) {
      event.preventDefault();

      const id = checkbox.id;
      const target = tasks.find(task => task.id === id);
      target.isCompleted = !target.isCompleted;

      await edit(id, target);

      renderTasks(tasks);
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

  for (const item of deleteButtons) {
    item.addEventListener('click', async function (event) {
      const id = event.target.dataset.id;

      await deleted(id);

      const tasks = await get();

      renderTasks(tasks);
    })
  }
}

async function bindToggleAllTasksEvent() {
  const checkboxes = document.querySelectorAll('.toggle-item');
  const toggleAll = document.querySelector('.toggle');

  if (toggleAll) {
    toggleAll.addEventListener('click', async () => {
      const allCompleted = Array.from(checkboxes).every(checkbox =>
        checkbox.nextElementSibling.classList.contains('completed')
      );

      let tasks = await get();
      for (let checkbox of checkboxes) {
        const id = checkbox.id;
        const isCompleted = !allCompleted;
        const inputElement = checkbox.nextElementSibling;

        if (isCompleted) {
          inputElement.classList.add('completed');
          checkbox.checked = true;
        } else {
          inputElement.classList.remove('completed');
          checkbox.checked = false;
        }

        const target = tasks.find(task => task.id === id);
        target.isCompleted = allCompleted;

        await edit(id, target);
      }

      renderTasks(tasks);
    });
  }
}

function bindFilterEvent() {
  const filterButtons = document.querySelectorAll('.btn-filter');

  for (const button of filterButtons) {
    button.addEventListener('click', async function (event) {

      filterButtons.forEach(btn => btn.classList.remove('btn-filter-clicked'));

      button.classList.add('btn-filter-clicked');
      let tasks = await get();

      const filter = button.dataset.filter;

      let filteredTasks = tasks;

      switch (filter) {
        case 'all': {
          break;
        }

        case 'active': {
          filteredTasks = tasks.filter(tasks => tasks.isCompleted === false);
          renderTasks(filteredTasks);
          break;
        }

        case 'complete': {
          filteredTasks = tasks.filter(tasks => tasks.isCompleted === true);
          renderTasks(filteredTasks);
          break;
        }
      }

      renderTasks(filteredTasks);
    })
  }
}

export {
  renderTasks,
  bindToggleTaskStatusEvent,
  bindAddTaskEvent,
  bindToggleEditTaskEvent,
  bindDeleteTaskEvent,
  bindToggleAllTasksEvent,
  bindFilterEvent
}

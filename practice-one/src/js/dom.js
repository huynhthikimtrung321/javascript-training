import { get, post, edit, deleted } from "./services/apis.js";

const getRandomId = () => Math.floor(Math.random() * Date.now()).toString(36).slice(0, 10);

function renderTasks(tasks) {
  const listElement = document.querySelector('.todo-list');
  listElement.innerHTML = '';

  tasks.forEach(task => {

    const taskItemElement = `
      <li>
        <div class="show" id="show-task-${task.id}">
          <input type="checkbox" checked=${task.isCompleted} class="toggle-item" id="${task.id}">
          <label for="${task.id}" class="todo-item-label ${task.isCompleted && 'completed'}" data-id="${task.id}"></label>
          <p class="todo-item-name ${task.isCompleted && 'text-completed'}" data-id=${task.id}>${task.name}</p>
          <button id="delete-task-${task.id}" data-id="${task.id}" class="btn-destroy"></button>
        </div>
        <input class="hidden input-hidden" id="edit-task-${task.id}">
      </li>
    `
    listElement.innerHTML += taskItemElement;
  });

  bindTaskCount(tasks.filter(task => task.isCompleted === false).length);

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
      const tasks = await get();
      const target = tasks.find(task => task.id === id);
      target.isCompleted = !target.isCompleted;

      await edit(id, target);

      renderTasks(tasks);
    })
  });
}

async function bindAddTaskEvent() {
  const todoInput = document.getElementById('todo-input');
  const tasks = await get();

  todoInput.addEventListener('keyup', async function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      if (todoInput.value.trim() === '') {
        return;
      }

      const newTask = {
        id: getRandomId(),
        name: todoInput.value.trim(),
        isCompleted: false
      }

      await post(newTask);
      tasks.push(newTask);

      todoInput.value = '';

      renderTasks(tasks);
    }
  });
}

async function bindEditTaskEvent(id) {
  const todoInput = document.getElementById(`edit-task-${id}`);
  const tasks = await get();

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

      const task = await edit(id, newTask);

      tasks.forEach((item, index) => {
        if (item.id === task.id) {
          tasks[index] = task;
        }
      })

      todoInput.value = '';

      renderTasks(tasks);
    }
  });
}

function bindToggleEditTaskEvent() {
  const todoItemElements = document.querySelectorAll('.todo-item-name');

  todoItemElements.forEach((element) => {
    const id = element.dataset.id;
    const showTaskElement = document.getElementById(`show-task-${id}`);
    const editTaskElement = document.getElementById(`edit-task-${id}`);

    element.addEventListener('dblclick', function () {
      showTaskElement.classList.toggle('hidden');
      editTaskElement.classList.toggle('hidden');

      editTaskElement.value = document.querySelector(`.todo-item-name[data-id="${id}"]`).textContent

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

      item.classList.add('btn-clicked');

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
      let tasks = await get();

      const allCompleted = tasks.every(task => task.isCompleted === true);

      for (let checkbox of checkboxes) {
        const id = checkbox.id;

        const target = tasks.find(task => task.id === id);
        target.isCompleted = !allCompleted;

        await edit(id, target);
      }

      tasks = await get();
      renderTasks(tasks);
    });
  }
}

async function bindFilterEvent() {
  const filterButtons = document.querySelectorAll('.btn-filter');

  for (const button of filterButtons) {
    button.addEventListener('click', async function () {
      let tasks = await get();
      filterButtons.forEach(btn => btn.classList.remove('btn-clicked'));
      button.classList.add('btn-clicked');
      const filter = button.dataset.filter;
      let filteredTasks = tasks;

      switch (filter) {
        case 'all': {
          break;
        }

        case 'active': {
          filteredTasks = tasks.filter(tasks => tasks.isCompleted === false);
          break;
        }

        case 'complete': {
          filteredTasks = tasks.filter(tasks => tasks.isCompleted === true);
          break;
        }
      }

      renderTasks(filteredTasks);
    })
  }
}

async function bindDeleteCompletedTaskEvent() {
  const deleteCompleteButtons = document.querySelectorAll('.btn-clear-completed');
  const tasks = await get();

  for (const item of deleteCompleteButtons) {
    item.addEventListener('click', async function() {
      for (const task of tasks) {
        if (!task.isCompleted) {
          continue;
        }

        const id = task.id;
        await deleted(id);
      }

      const updatedTasks = await get();
      renderTasks(updatedTasks);
    })
  }
}

function bindTaskCount(taskCount) {
  const counterElement = document.querySelector('.todo-count');

  counterElement.textContent = taskCount;
}

export {
  renderTasks,
  bindToggleTaskStatusEvent,
  bindAddTaskEvent,
  bindToggleEditTaskEvent,
  bindDeleteTaskEvent,
  bindToggleAllTasksEvent,
  bindFilterEvent,
  bindDeleteCompletedTaskEvent,
  bindTaskCount
}

import { get, post, edit} from "./services/apis.js";

let tasks = [];
let toggleStates = {

};

document.addEventListener('DOMContentLoaded', async () => {
  tasks = (await get());

  renderTasks(tasks);
});

function renderTasks(tasks) {
  const listElement = document.querySelector('.todo-list');
  listElement.innerHTML = '';

  tasks.slice().reverse().forEach(task => {
    toggleStates[task.id] = true;
    const toggleState = toggleStates[task.id];
    console.log(toggleState)
    const taskItemElement = `
      <div>
        <div class="show" id="show-${task.id}">
          <input type="checkbox" class="toggle-item" id="${task.id}">
          <label for="${task.id}" class="todo-item-label" data-id="${task.id}"></label>
          <p class="todo-item-name" data-id=${task.id}>${task.name}</p>
          <button data-id="${task.id}" class="btn-destroy"></button>
        </div>
      </div>
    `
    listElement.innerHTML += taskItemElement;
  });

  const todoItemElements = document.querySelectorAll('.todo-item-name');

  Array.from(todoItemElements).forEach((element) => {
    element.addEventListener('dblclick', function(event) {
      const id = element.dataset.id;
      const showTaskElement = document.getElementById(`show-${id}`);

      let toggleState = toggleStates[id];
      console.log(toggleState)
      toggleState = !toggleState;

      const taskItemHTML = `
        <div>
          ${
            toggleState
            ?
            `
            <div class="show" id="show-${id}">
              <input type="checkbox" class="toggle-item" id="${id}">
              <label for="${id}" class="todo-item-label" data-id="${id}"></label>
              <p class="todo-item-name" data-id=${id}>${element.textContent}</p>
              <button data-id="${id}" class="btn-destroy"></button>
            </div>
            `
            :
            `
            <input autofocus data-id="${id}" class="input-hidden">
            `
          }
        </div>
      `

      showTaskElement.innerHTML = taskItemHTML;
    });
  });

  const checkboxes = document.querySelectorAll('.toggle-item');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function (event) {
      event.preventDefault();

      const id = checkbox.id;

      const toggleLabelElement = document.querySelector(`[data-id="${id}"]`);

      toggleLabelElement.classList.toggle('completed');
    })
  });
}

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

    const task = await post(newTask);

    tasks.push(task);

    todoInput.value = '';

    renderTasks(tasks);
  }
});

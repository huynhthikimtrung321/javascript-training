import { get } from "./services/apis.js";
import {
  renderTasks,
  bindAddTaskEvent,
  bindToggleAllTasksEvent,
  bindFilterEvent,
  bindDeleteCompletedTaskEvent,
  counterTasks
} from "./dom.js";

document.addEventListener('DOMContentLoaded', async () => {
  tasks = (await get());

  renderTasks(tasks);

  bindAddTaskEvent();
  bindToggleAllTasksEvent();
  bindFilterEvent();
  bindDeleteCompletedTaskEvent();
});

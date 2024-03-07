import { get } from "./services/apis.js";
import {
  renderTasks,
  bindAddTaskEvent,
  bindToggleAllTasksEvent,
  bindFilterEvent,
  bindDeleteCompletedTaskEvent,
  bindTaskCount
} from "./dom.js";

document.addEventListener('DOMContentLoaded', async () => {
  const tasks = (await get());

  renderTasks(tasks);

  bindAddTaskEvent();
  bindToggleAllTasksEvent();
  bindFilterEvent();
  bindDeleteCompletedTaskEvent();
});

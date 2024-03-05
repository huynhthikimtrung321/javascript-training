import { get, post, edit } from "./services/apis.js";
import {
  renderTasks,
  bindAddTaskEvent,
  bindToggleAllTasksEvent
} from "./dom.js";

document.addEventListener('DOMContentLoaded', async () => {
  tasks = (await get());

  renderTasks(tasks);

  bindAddTaskEvent();
  bindToggleAllTasksEvent();
});

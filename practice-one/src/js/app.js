import { get, post, edit } from "./services/apis.js";
import {
  renderTasks,
  bindToggleTaskStatusEvent,
  bindAddTaskEvent,
  bindToggleEditTaskEvent
} from "./dom.js";

document.addEventListener('DOMContentLoaded', async () => {
  tasks = (await get());

  renderTasks(tasks);

  bindAddTaskEvent();
});

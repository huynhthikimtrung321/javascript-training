import { get } from "./services/apis.js";
import {
  renderTasks,
  bindAddTaskEvent
} from "./dom.js";

document.addEventListener('DOMContentLoaded', async () => {
  tasks = (await get());

  renderTasks(tasks);

  bindAddTaskEvent();
});

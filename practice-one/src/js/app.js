import { get } from "./services/apis.js";
import {
  renderTasks,
  bindAddTaskEvent,
  selectorAll
} from "./dom.js";

document.addEventListener('DOMContentLoaded', async () => {
  tasks = (await get());

  renderTasks(tasks);

  bindAddTaskEvent();
  selectorAll();
});

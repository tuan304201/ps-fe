import { defineStore } from "pinia";
import tasksData from "@/components/Table/data/task.json";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: tasksData,
  }),
  actions: {
    setTasks(newTasks) {
      this.tasks = newTasks;
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
  },
});

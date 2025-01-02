import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private storageKey = 'tasks';

  private tasks: Task[] = [];

  constructor() {}

  // Obtener todas las tareas
  obtenerTasks(): Task[] {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  // Agregar nueva tarea
  añadirTask(task: Task): void {
    const tasks = this.obtenerTasks();
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  // Eliminar tarea por ID
  eliminarTask(id: number): void {
    let tasks = this.obtenerTasks();
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  // Actualizar tarea
  actualizarTask(updatedTask: Task): void {
    const tasks = this.obtenerTasks();
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }

  obtenerTasksPendiente(): number {
    return this.tasks.filter((task) => !task.isCompleted).length;
  }

  // Cantidad de tareas completadas
  obtenerTasksCompletadas(): number {
    return this.tasks.filter((task) => task.isCompleted).length;
  }

}

import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private storageKey = 'tasks';

  private tasks: Task[] = [];

  constructor() {}


  // Obtener array tareas
  obtenerTasks(): Task[] {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  // Añadir tarea
  añadirTask(task: Task): void {
    const tasks = this.obtenerTasks();
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id || 0)) + 1 : 1;
    tasks.push({ ...task, id: newId });
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }


  // Eliminar tarea
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

  // Conteo de tareas pendientes
  obtenerTasksPendiente(): number {
    return this.obtenerTasks().filter((task) => !task.isCompleted).length;
  }

  // Conteo de tareas completadas
  obtenerTasksCompletadas(): number {
    return this.obtenerTasks().filter((task) => task.isCompleted).length;
  }

}

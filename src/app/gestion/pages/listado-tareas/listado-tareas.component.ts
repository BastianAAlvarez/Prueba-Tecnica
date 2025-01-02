import { Component } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-listado-tareas',
  standalone: false,

  templateUrl: './listado-tareas.component.html',
  styles: `
  .card{
    max-width: 12rem;
    max-height: 10rem;
  }
  .color-back{
    background-color: #6f42c1;
  }
  `
})
export class ListadoTareasComponent {


  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  conteoTasksPendientes: number = 0;
  conteoTasksCompletadas: number = 0;

  ngOnInit(): void {
    this.updateTaskCounts();
    this.tasks = this.taskService.obtenerTasks();
  }

  // Actualizar conteo tras eliminacion de tarea
  deleteTask(id: number): void {
    this.taskService.eliminarTask(id);
    this.tasks = this.taskService.obtenerTasks();
    this.updateTaskCounts();
  }

  // Cambio de estado
  toggleCompletion(task: Task): void {
    task.isCompleted = !task.isCompleted;
    this.taskService.actualizarTask(task);
    this.updateTaskCounts();
  }

  // Actualizar conteo de tareas
  updateTaskCounts(): void {
    this.conteoTasksPendientes = this.taskService.obtenerTasksPendiente();
    this.conteoTasksCompletadas = this.taskService.obtenerTasksCompletadas();
  }

}

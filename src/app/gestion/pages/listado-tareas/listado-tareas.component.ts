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

  pendingTasksCount: number = 0;
  completedTasksCount: number = 0;

  ngOnInit(): void {
    this.updateTaskCounts();
    this.tasks = this.taskService.obtenerTasks();
  }

  deleteTask(id: number): void {
    this.taskService.eliminarTask(id);
    this.tasks = this.taskService.obtenerTasks();
  }

  toggleCompletion(task: Task): void {
    task.isCompleted = !task.isCompleted;
    this.taskService.actualizarTask(task);
  }

  updateTaskCounts(): void {
    this.pendingTasksCount = this.taskService.obtenerTasksPendiente();
    this.completedTasksCount = this.taskService.obtenerTasksCompletadas();
  }

}

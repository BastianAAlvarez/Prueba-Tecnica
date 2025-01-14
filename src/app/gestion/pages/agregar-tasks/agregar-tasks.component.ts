import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-agregar-tasks',
  standalone: false,

  templateUrl: './agregar-tasks.component.html',
  styles: ``
})
export class AgregarTasksComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      titulo: ['', [Validators.required]],
      descripcion: [''],
      fechaLimite: ['', [Validators.required, this.validateDate]],
      Tipo: ['', [Validators.required,  Validators.maxLength(15)]]
    });
  }

  ngOnInit(): void {
    // Configurar la fecha inicial como la fecha del sistema
    const today = new Date();
    this.taskForm.addControl('fechaInicial', this.fb.control(today.toISOString().split('T')[0]));
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask = {
        ...this.taskForm.value,
        fechaInicial: this.taskForm.get('fechaInicial')?.value,
        isCompleted: false
      };
      // Una vez validado se añade la tarea
      this.taskService.añadirTask(newTask);
      this.taskForm.reset();
    }
  }


  // Validacion de que la fecha no puede ser igual o anterior a la fecha actual
  validateDate(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return { invalidDate: true };
    }
    return null;
  }
}



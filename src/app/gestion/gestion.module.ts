import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoTareasComponent } from './pages/listado-tareas/listado-tareas.component';
import { AgregarTasksComponent } from './pages/agregar-tasks/agregar-tasks.component';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListadoTareasComponent,
    AgregarTasksComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    ListadoTareasComponent,
    AgregarTasksComponent,

  ]
})
export class GestionModule { }

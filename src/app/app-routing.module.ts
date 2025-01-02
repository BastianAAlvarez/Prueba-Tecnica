import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoTareasComponent } from './gestion/pages/listado-tareas/listado-tareas.component';
import { AgregarTasksComponent } from './gestion/pages/agregar-tasks/agregar-tasks.component';



const routes: Routes = [
  {
    path: 'list',
    component: ListadoTareasComponent
  },
  {
    path: 'agregar',
    component: AgregarTasksComponent
  },
  {
    path:'**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export interface Task {
  id: number;
  titulo: string;
  descripcion?: string;
  fechaInicial: Date;
  fechaLimite: Date;
  Tipo: string;
  isCompleted: boolean;
}

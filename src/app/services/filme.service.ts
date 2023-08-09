import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private tarefas: Tarefa[] =[];

  constructor() { }
  public getTarefas(): Tarefa[]{
    return this.tarefas;
  
}
}
interface Tarefa{
  value: string
  date: Date;
  done?:boolean;
}

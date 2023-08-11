import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  updateFilmes(index: number, tarefa: any, date: any) {
    throw new Error('Method not implemented.');
  }
  delFilme(index: number) {
    throw new Error('Method not implemented.');
  }
  private tarefas: Tarefa[] =[];

  constructor() { }
  public getTarefas(): Tarefa[]{
    return this.tarefas;
  
}
public addTarefas(value: string, date: string){
  date = date.replace(/-/g,"/")
  let tarefa: Tarefa = {value: value, date: new Date(date), done: false};
this.tarefas.push(tarefa);


}


}


interface Tarefa{
  value: string
  date: Date;
  done?:boolean;
}

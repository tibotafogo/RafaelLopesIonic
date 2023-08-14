import { Injectable } from '@angular/core';
import  { Preferences} from '@capacitor/preferences';



@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private tarefas: Tarefa[] =[];

  constructor() { }
  public getTarefas(): Tarefa[]{
    return this.tarefas;
  
}
public addTarefas(value: string, date: string){
  date = date.replace(/-/g,"/")
  let tarefa: Tarefa = {value: value, date: new Date(date), done: false};
this.tarefas.push(tarefa);
this.setToStorage();
}

public delTarefas(index: number){
  this.tarefas.splice(index,1);
  this.setToStorage();
}
public updateTarefas(index: number, value: string, date: string){
  let tarefa: Tarefa = this.tarefas[index];
  tarefa.value = value;
  date = date.replace(/-/g, "/");
  tarefa.date = new Date(date)
  this.tarefas.splice(index,1,tarefa);
  this.setToStorage();
}

public async setToStorage(){
  await Preferences.set({
    key: 'filme',
    value: JSON.stringify(this.tarefas)
  });
}
public async getFromStorage(){
  const storedData = await Preferences.get({key: 'filme'});
  if (storedData.value) {
    this.tarefas = JSON.parse(storedData.value);
  }else{
    this.tarefas = []
  }
}

}
interface Tarefa{
  value: string
  date: Date;
  done?:boolean;
}

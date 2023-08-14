import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { FilmeService } from '../services/filme.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  type: string = "pending"

  constructor(public alertController: AlertController, public filmeService: FilmeService, 
    public toastController: ToastController)
{ }

async presentAlertPromptAdd(){
  const alert = await this.alertController.create({
    header: 'Adicionar tarefa',
    inputs: [
      {
        name: 'tarefa',
        type: 'text',
        placeholder: 'Tarefa'
      
      },
      {
        name : 'date',
        type: 'text',
        placeholder: 'Tarefa'
      },
      {
       name: 'date',
       type: 'date',
       min: '2023-01-01',
       max: '2025- 12-31' 
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Salvar',
        handler: (alertData) => {
          if (alertData.tarefa !="") {
            this.filmeService.addTarefas(alertData.tarefa, alertData.date);
          }
          else{
            this.presentToast();
            this.presentAlertPromptAdd();
          }
        }
      }
    ]
  });
  await alert.present();
}
async presentAlertPromptDelete(index: number) {
  const alert = await this.alertController.create({
    header: 'Excluir tarefa',
    message: 'Deseja realmente excluir a tarefa ?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Excluir',
        role: 'cancel'
      },
      {
        text: 'Excluir',
        handler: () => {
          this.filmeService.delTarefas(index);
        }
      }
    ]
  });
  await alert.present();
}
async presentAlertPromptUpdate(index: number, tarefa: any) {
  const alert = await this.alertController.create({
    header: 'Atualizar tarefa',
    inputs: [
      {
        name: 'tarefa',
        type: 'text',
        placeholder: 'Tarefa',
        value: tarefa.value
      },
      {
        name: 'date',
        type: 'date',
        min: '2023-01-01',
        max: '2025-12-31',
        value: tarefa.date.getFullYear() + "-" + ((tarefa.date.getMonth() + 1) < 10 ? "0" + tarefa.date.getMonth() + 1 : tarefa.date.getMonth() + 1) + "-" + ((tarefa.date.getDay() + 1) < 10 ? "0" + tarefa.date.getDay() : tarefa.date.getDay())
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Salvar',
        handler: (alertData) => {
          if (alertData.tarefa != "") {
            this.filmeService.updateTarefas(index, alertData.tarefa, alertData.date);
          }
          else {
            this.presentToast();
            this.presentAlertPromptUpdate(index, tarefa);
          }
        }
      }
    ]
      });
    await alert.present();
}
async presentToast() {
  const toast = await this.toastController.create({
    message: "Preencha a tarefa !",
    duration: 2000
  });
  await toast.present();
}

}



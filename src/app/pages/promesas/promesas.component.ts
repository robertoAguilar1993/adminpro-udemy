import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.ejemploPromesa().then((mensaje) => console.log('Termino con exito', mensaje))
    .catch((error) => console.error('Termino con error', error));
    console.log('Iniciando segunda tarea');
  }

  ngOnInit() {

  }

  ejemploPromesa(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('Iniciando la promesa');
      let contador = 0;
      setInterval(() => {
        contador ++;
        if (contador === 3) {
          resolve(true);
        }
      }, 1000);
    });

  }

}

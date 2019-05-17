import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public id: string;
  public tipo: string;
  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { }

  mostrarModal(id: string, tipo: string) {
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from '../../services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public imagenTemp: any;
  imagenSubir: File;

  constructor(
    public _modalUploadServise: ModalUploadService,
    public _subirArchivoService: SubirArchivoService
    ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadServise.ocultarModal();
  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    console.log('Actualizadndo foto');
    this._subirArchivoService.subirArchivo(
      this.imagenSubir,
      this._modalUploadServise.tipo,
      this._modalUploadServise.id )
      .then((resp: any) => {
        this._modalUploadServise.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch(err => {
        console.log(err);
        this.cerrarModal();
      });
  }


}

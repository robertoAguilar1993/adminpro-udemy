import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: any;

  constructor ( private _usuarioServece: UsuarioService ) {
    this.usuario = _usuarioServece.getUsuario();
  }

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    console.log('Guardar usuario');
    console.log(forma);
  }

  cargarImagen(img: String) {
    return URL_SERVICIOS + '/img/usuarios/' + img;
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
    this._usuarioServece.cambiarImagen( this.imagenSubir, this.usuario._id );

  }



}

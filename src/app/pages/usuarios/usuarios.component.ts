import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';
import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    private _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
          .subscribe(rep => {
            this.cargarUsuarios();
          });
  }

  cargarUsuarios() {
    this._usuarioService.cargarUsuarios().subscribe((resp: any) => {
      this.usuarios = resp.results;
      this.totalRegistros = resp.total;
      this.cargando = false;
      console.log('Usuariuos');
      console.log(this.usuarios);
    });
  }

  cargarImagen(img: String,  google: boolean) {
    if (google) {
      return img;
    }
    return URL_SERVICIOS + '/img/usuarios/' + img;
  }
  cambiarDesde(valor: number) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this._usuarioService.cargarUsuarios( this.desde ).subscribe((resp: any) => {
      this.usuarios = resp.results;
      this.totalRegistros = resp.total;
      this.cargando = false;
      console.log('Usuariuos');
      console.log(this.usuarios);
    });
  }

  buscarUsuario( termino: string) {

    if ( termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

      this._usuarioService.buscarUsuario(termino).subscribe((resp: any) => {
        this.usuarios = resp;
      });
  }


  borrarUsuario(usuarioBorrar: Usuario) {
    if (this._usuarioService.usuario._id === usuarioBorrar._id) {
      swal('No se puede borrar usuario', 'No se puede borrar asi mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta apunto de borrar a' + usuarioBorrar.nombre ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._usuarioService.borrarUsuario(usuarioBorrar._id)
          .subscribe((resp: any ) => {
            this.desde = 0;
            this.cargarUsuarios();
          });
      }
    });

  }


  guardarUsuario( usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal(id, 'usuarios');
  }

}

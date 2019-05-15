import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';

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
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
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
  cambiarDesde(desde: number) {

  }

}

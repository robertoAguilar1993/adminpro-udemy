import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _sidebarService: SidebarService,
    private _usuarioService: UsuarioService) {
    }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this._sidebarService.cargarMenu();
  }

  cargarImagen(img: String,  google: boolean) {
    if (google) {
      return img;
    }
    return URL_SERVICIOS + '/img/usuarios/' + img;
  }

}

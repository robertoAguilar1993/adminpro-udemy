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
      this.usuario = _usuarioService.getUsuario();
    }

  ngOnInit() {
  }

  cargarImagen(img: String) {
    return URL_SERVICIOS + '/img/usuarios/' + img;
  }

}

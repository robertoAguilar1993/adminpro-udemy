import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(private _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.getUsuario();
  }

  ngOnInit() {
  }

  cargarImagen(img: String) {
    return URL_SERVICIOS + '/img/usuarios/' + img;
  }

}

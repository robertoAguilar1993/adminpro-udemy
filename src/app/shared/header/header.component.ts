import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private _usuarioService: UsuarioService,
    public router: Router
    ) {
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  cargarImagen(img: String,  google: boolean) {
    if ( google ) {
      return img;
    }
    return URL_SERVICIOS + '/img/usuarios/' + img;
  }

  buscar(termino: string) {
    console.log(termino);
    if (termino && termino.length > 0) {
      this.router.navigate(['/busqueda', termino]);
    }
  }

}

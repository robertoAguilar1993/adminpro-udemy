import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuadGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
    ) {

  }

  canActivate() {
    console.log('paso por el login guard');

    if ( this._usuarioService.estaLogueado() ) {
      console.log('ESTA LOGUEADO');
      return true;
    } else {
      console.log('NO ESTA LOGUEADO');
      this.router.navigate(['/login']) ;
      return false;
    }
  }
}

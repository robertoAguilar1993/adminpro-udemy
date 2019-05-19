import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {

  }

  canActivate() {
    if ( this._usuarioService.usuario.role === 'ADMIN_ROLE' ) {
      return true;
    } {
      console.log('Bloqueado por el ADMIN CARD');
      this._usuarioService.logout();
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
   }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string) {
    const url = URL_SERVICIOS + '/login/google';
    console.log('Entrando en: ' + url);
    return this.http.post(url, {token})
      .pipe(map((res: any) => {
        console.log('loginGoogle');
        console.log(res);
        this.guardarStorage(res.usuario.id, res.token, res.usuario);
        return true;
      }));
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(map((res: any) => {

         this.guardarStorage(res.usuario.id, res.token, res.usuario);
        console.log('paso bien');
        return true;
      }));
  }

  /**
   * Servicio para crear un usuario
   */
  crearUsuario(usuario: Usuario) {
    console.log('Usuario a crear');
    console.log(usuario);
    const url = URL_SERVICIOS + '/usuario';
   return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));
  }

  getUsuario() {
    if (localStorage.getItem('usuario')) {
      const usuarioLocalStoge = JSON.parse(localStorage.getItem('usuario'));
      console.log('Usuario de usuarioLocalStoge');
      console.log(usuarioLocalStoge);

      return new Usuario(
        usuarioLocalStoge.nombre,
        usuarioLocalStoge.email,
        null,
        usuarioLocalStoge.img
      );
    } else {
      return null;
    }

  }

  cargarUsuarios() {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.get(url);
  }

  cambiarImagen(imagenSubir: File, id: string) {
    const url = URL_SERVICIOS + '/upload/usuarios/' + id;
    return this.http.put(url, imagenSubir);
  }

}

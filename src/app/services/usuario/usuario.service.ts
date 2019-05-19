import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [ ];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
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
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  loginGoogle( token: string) {
    const url = URL_SERVICIOS + '/login/google';
    console.log('Entrando en: ' + url);
    return this.http.post(url, {token})
      .pipe(map((res: any) => {
        console.log('loginGoogle');
        console.log(res);
        this.guardarStorage(res.usuario.id, res.token, res.usuario, res.menu);
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
        console.log(res);
         this.guardarStorage(res.usuario.id, res.token, res.usuario, res.menu);
        console.log('paso bien');
        return true;
      }))
      .pipe(
        catchError(err =>
          of([
           swal('Error en el login', err.error.mensaje, 'error')
          ])
        )
      );
  }

  /**
   * Servicio para obtener los usuarios
   */
  getUsuario() {
    if (localStorage.getItem('usuario')) {
      const usuarioLocalStoge = JSON.parse(localStorage.getItem('usuario'));
      console.log('Usuario de usuarioLocalStoge');
      console.log(usuarioLocalStoge);

      return new Usuario(
        usuarioLocalStoge.nombre,
        usuarioLocalStoge.email,
        null,
        usuarioLocalStoge.img,
        usuarioLocalStoge.role,
        usuarioLocalStoge.google,
        usuarioLocalStoge._id
      );
    } else {
      return null;
    }

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
      }))
      .pipe(
        catchError(err =>
          of([
           swal('Error al crear usuario', err.error.mensaje, 'error')
          ])
        )
      );
  }

  /**
   * servicio para actualizar usuario
   */
  actualizarUsuario(usuario: Usuario) {
    console.log('Actualizar usuario');
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map(((res: any) => {
        if ( usuario._id === this.usuario._id ) {
          const usuarioDB: Usuario = res.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }
        swal('Usuario Actualizado', res.usuario.nombre, 'success');
        this.guardarStorage(res.usuario.id, this.token, res.usuario, this.menu);
        return true;
      }))
    );
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuario(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.usuarios;
      })
    );
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
        .pipe(map((resp: any) => {
          swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
          return true;
        }));
  }


  cambiarImagen(imagenSubir: File, id: string) {
    this._subirArchivoService.subirArchivo(imagenSubir, 'usuarios', id)
        .then((resp: any) => {
          this.usuario.img = resp.usuario.img;
          swal('Imagen Actualizado', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario, this.menu);
        })
        .catch(resp => {
          console.log(resp);
        });
  }



  buscarUsuarioById(id: string): Observable<any> {
    return null;
  }


}

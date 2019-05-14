import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';


declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(
    public _usuarioService: UsuarioService
    , public router: Router) { }

  ngOnInit() {
    init_plugins();
     this.googleInit();
    if ( localStorage.getItem('email') ) {
      this.email = localStorage.getItem('email');
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '577227938020-glg802agdd06afrh61flbr52g7gaseme.apps.googleusercontent.com',
        cookiepolicy: 'single_host',
        scope: 'profile email'
       });

       this.attachSignin( document.getElementById('btnGoogle') );

    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      /**let profile = googleUser.getBasicProfile();
      console.log('login profile');
      console.log(profile);*/
      const token = googleUser.getAuthResponse().id_token;
      console.log('token');
      console.log(token);

      this._usuarioService.loginGoogle(token)
      .subscribe( () => window.location.href = '#/dashboard' );

    });
  }

  iniciar( forma: NgForm) {


    console.log('forma');
    console.log(forma.value);

    if (forma.invalid) {
      swal('Importante', 'Ingrese su correo y contraseña', 'warning');
      return;
    }

    const usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe(res =>  {
      console.log('respuesta');
      console.log(res);
      this.router.navigate(['/dashboard']);
    });


  }

}

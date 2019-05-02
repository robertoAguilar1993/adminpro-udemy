import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SetingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, public _setingsService: SetingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(color: string, link: any) {
    this.aplicarCheck(link);
    const url = `assets/css/colors/${color}.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this._setingsService.ajustes.tema = color;
    this._setingsService.ajustes.temaUrl = url;
    this._setingsService.guardarAjustes();

  }

  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for (let ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._setingsService.ajustes.tema;
    console.log('tema: ' + tema);
    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}

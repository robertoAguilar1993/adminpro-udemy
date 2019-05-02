import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtprogress')  txtprogress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioValorP: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('leyenda' + this.leyenda);
    console.log('porcentaje' + this.porcentaje);
  }

  ngOnInit() {
    console.log('leyenda' + this.leyenda);
  }

  onChange( newValue: number ) {
    let numberAux: number = 0;
    const valueHtml: any = document.getElementsByName('porcentaje')[0];

    if (newValue == null) {
      numberAux = 0;
    } else if (newValue > 100) {
      numberAux = 100;
    }  else if ( newValue < 0 ) {
      numberAux = 0;
    } else {
      numberAux = newValue;
    }
    //valueHtml.value = numberAux;
    this.txtprogress.nativeElement.value = numberAux;
    this.cambioValorP.emit(numberAux);
    this.txtprogress.nativeElement.focus();

  }

  cambiarValor(incremen: number) {
    if (this.porcentaje >= 100 && incremen > 0) {
      this.porcentaje = 100;
      return;
    }

    if (this.porcentaje <= 0 && incremen < 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje = this.porcentaje + incremen;
    this.cambioValorP.emit( this.porcentaje);
    return;
  }

}

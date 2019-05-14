import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicosService } from '../../services/service.index';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public _medicosService: MedicosService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.obtenerMedicos().subscribe(medicos => {
      this.medicos = medicos;
    });
  }

  cargarImagen(img: String) {
    return URL_SERVICIOS + '/img/medicos/' + img;
  }

  buscarMedico() {

  }

  borrarMedico() {
  }

}

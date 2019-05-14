import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HospitalService } from '../../services/service.index';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];


  constructor(
    private _hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        console.log('Hospitales');
        console.log(hospitales);
         return this.hospitales = hospitales;
       }
      );
  }

  cargarImagen(img: String) {
    return URL_SERVICIOS + '/img/hospitales/' + img;
  }


  crearHospital() {

  }

  actualizarImagen(hospital: Hospital) {

  }

  guardarHospital(hospital: Hospital) {

  }

  borrarHospital(hospital: Hospital) {

  }

  buscarHospital( termino: string ) {
    console.log('criterio de busqueda de hospitales: ' + termino);
  }



}

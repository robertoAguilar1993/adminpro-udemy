import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';

declare var swal;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];


  constructor(
    private _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarHospitales();
    });
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

    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor )
              .subscribe( () => this.cargarHospitales() );

    });

  }

  actualizarImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal(hospital._id, 'hospitales');

  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {

    swal({
      title: '¿Esta seguro?',
      text: 'Esta apunto de borrar a' + hospital.nombre ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._hospitalService.eliminarHospital(hospital._id)
        .subscribe(resp => this.cargarHospitales());
      }
    });

  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    console.log('criterio de busqueda de hospitales: ' + termino);
    this._hospitalService.buscarHospital(termino)
          .subscribe(resp => {
            this.hospitales = resp;
          });
  }

}

import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicosService } from '../../services/service.index';
import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';

declare var swal;


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public _medicosService: MedicosService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.obtenerMedicos().subscribe(medicos => {
      this.medicos = medicos;
    });
  }

  actualizarImagen(medico: Medico) {
    this._modalUploadService.mostrarModal(medico._id, 'medicos');
  }

  buscarMedico(termino: string) {
    if ( termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicosService.buscarHospital(termino)
          .subscribe(resp => {
            this.medicos = resp;
          });
  }

  borrarMedico(medico: Medico) {

    swal({
      title: '¿Esta seguro?',
      text: 'Esta apunto de borrar a' + medico.nombre ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._medicosService.borrarMedico(medico._id).subscribe(resp => {
          this.cargarMedicos();
        });
      }
    });
  }



}

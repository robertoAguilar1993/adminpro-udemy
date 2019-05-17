import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { MedicosService, HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {


  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');


  constructor(
    public activatedRoute: ActivatedRoute,
    public _medicosService: MedicosService,
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService,
    public router: Router
    ) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if ( id !== 'nuevo' ) {
         this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe(resp => {
      return this.hospitales = resp;
    });
    this._modalUploadService.notificacion.subscribe(res => {
      console.log('emi');
      console.log(res);
      // return this.cargarMedico(this.medico._id);
      this.medico.img = res.medico.img;
    });
  }

  cargarMedico(id: string) {
    this._medicosService.obtenerMedicosById(id).subscribe( resp => {
      this.medico = resp;
      this.medico.hospital = resp.hospital._id;
      // return this.hospital = resp.hospital;
      this.cambioHospital( this.medico.hospital );
    });
  }

  cambioHospital( id: string ) {
    this._hospitalService.obtenerHospital(id).subscribe(
      (resp: any) => {
        return this.hospital = resp.hospital;
      }
    );
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal(this.medico._id , 'medicos');
  }

  guardarMedico( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }
    this._medicosService.guardarMedico( this.medico )
            .subscribe( medico => {

              console.log('medigo persist');
              console.log(medico);

               this.medico._id = medico._id;

              this.router.navigate(['/medico', medico._id ]);

            });
  }




}

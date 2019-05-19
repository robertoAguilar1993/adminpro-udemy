import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor(
    public _busquedaService: BusquedaService,
    public activateRouter: ActivatedRoute
  ) {
    this.activateRouter.params.subscribe(params => {
      const termino = params['termino'];
      console.log('termino');
      console.log(termino);
      this.buscar(termino);
    });
   }

  ngOnInit() {
  }

  buscar(termino: string) {
    this._busquedaService.busqueda(termino)
      .subscribe(resp => {
        console.log(resp);
        this.hospitales = resp.hospitales;
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
      });
  }

}

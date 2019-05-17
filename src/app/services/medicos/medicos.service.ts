import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  obtenerMedicos(): Observable<any> {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url).pipe(map((res: any) => {
      this.totalMedicos = res.total;
      return res.medicos;
    }));
  }

  obtenerMedicosById(id: string): Observable<any> {
    const url = URL_SERVICIOS + '/medico/' + id;
    return  this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.medico;
      })
    );

  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    console.log('Update medico');
    console.log(medico);

    if ( medico._id ) {
      // actualizando
      console.log('Actualizando actualizandp');
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      console.log(url);
      return this.http.put( url, medico ).pipe(
                map( (resp: any) => {
                  swal('Médico Actualizado', medico.nombre, 'success');
                  return resp.medico;

                }));

    } else {
      // creando
      console.log('Creando medico');

      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, medico ).pipe(
              map( (resp: any) => {
                swal('Médico Creado', medico.nombre, 'success');
                return resp.medico;
              }));
    }
  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medicos;
      })
    );
  }

  borrarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map( resp => {
        swal('Medico Borrado', 'Eliminado correctamente', 'success');
      return true;
      }));

  }
}

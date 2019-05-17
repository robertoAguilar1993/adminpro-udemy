import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales(): Observable<any> {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url).pipe(map((res: any) => {
      this.totalHospitales = res.total;
      return res.hospitales;
    }));
  }

  actualizarHospital(hospital: Hospital): Observable<any> {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
          .pipe(map((resp: any) => {
            swal('Hospital Actualizado', resp.hospital.nombre, 'success');
            return true;
          }));
  }

  crearHospital ( valor: any ): Observable<any> {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, {nombre: valor})
          .pipe(map((resp: any) => {
            swal('Hospital creado', resp.hospital.nombre, 'success');
            return true;
          }));
  }

  eliminarHospital(id: string): Observable<any> {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url).pipe(
      map( resp => {
        swal('Hospital Borrado', 'Eliminado correctamente', 'success');
      return true;
      }));
  }

  obtenerHospital(id: string): Observable<any> {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url);
  }

  buscarHospital(termino: string): Observable<any> {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.hospitales;
      })
    );
  }


}

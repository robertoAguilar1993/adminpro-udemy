import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(
    public http: HttpClient
  ) { }


  /**
   * busca todo lo que encuentre en usuario, medico y hospital
   */
  busqueda(termino: string): Observable<any> {
    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    return this.http.get( url );
  }
}

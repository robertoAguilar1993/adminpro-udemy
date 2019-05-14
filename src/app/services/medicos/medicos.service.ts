import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  obtenerMedicos(): Observable<any> {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url).pipe(map((res: any) => {
      this.totalMedicos = res.total;
      return res.medicos;
    }));
  }
}

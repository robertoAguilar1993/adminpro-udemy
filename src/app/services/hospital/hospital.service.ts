import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;


  constructor(
    public http: HttpClient
  ) { }

  cargarHospitales(): Observable<any> {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url).pipe(map((res: any) => {
      this.totalHospitales = res.total;
      return res.hospitales;
    }));
  }


}

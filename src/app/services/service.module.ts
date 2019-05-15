import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import {
  SetingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  HospitalService,
  MedicosService,
  LoginGuadGuard,
  SubirArchivoService
} from './service.index';

@NgModule({
  declarations: [],
  providers: [
    SetingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    HospitalService,
    MedicosService,
    LoginGuadGuard,
    SubirArchivoService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }

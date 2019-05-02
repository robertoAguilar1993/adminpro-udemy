import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SetingsService,
  SharedService,
  SidebarService
} from './service.index';

@NgModule({
  declarations: [],
  providers: [
    SetingsService,
    SharedService,
    SidebarService
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule { }

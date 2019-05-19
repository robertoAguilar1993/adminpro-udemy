import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTERS } from './pages.routes';
import { IncrementadorComponent } from '../componentes/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../componentes/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { TablesComponent } from './tables/tables.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { ProfileComponent } from './profile/profile.component';
import { MedicosComponent } from './medicos/medicos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../componentes/modal-upload/modal-upload.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        TablesComponent,
        HospitalesComponent,
        ProfileComponent,
        MedicosComponent,
        UsuariosComponent,
        ModalUploadComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTERS,
        FormsModule,
        ChartsModule,
        CommonModule,
        PipesModule
    ],
    exports: [
        CommonModule,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    providers: [],
})
export class PagesModule { }


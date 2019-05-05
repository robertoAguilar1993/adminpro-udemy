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
        TablesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTERS,
        FormsModule,
        ChartsModule,
        CommonModule,
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


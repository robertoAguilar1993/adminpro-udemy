import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { TablesComponent } from './tables/tables.component';

const pagesRouters: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
          {path: 'progress', component: ProgressComponent, data: {titulo: 'eer'}},
          {path: 'graficas1', component: Graficas1Component},
          {path: 'promesas', component: PromesasComponent},
          {path: 'rxjs', component: RxjsComponent},
          {path: 'tables', component: TablesComponent},
          {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild( pagesRouters )],
    exports: [pagesRouters]
})


export class PagesRouters { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

const pagesRouters: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          {path: 'dashboard', component: DashboardComponent},
          {path: 'progress', component: ProgressComponent},
          {path: 'graficas1', component: Graficas1Component},
          {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild( pagesRouters )],
    exports: [pagesRouters]
})


export class PagesRouters { }

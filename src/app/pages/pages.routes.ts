import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { TablesComponent } from './tables/tables.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { ProfileComponent } from './profile/profile.component';
import { MedicosComponent } from './medicos/medicos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginGuadGuard } from '../services/service.index';

const pagesRouters: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuadGuard],
        children: [
          {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
          {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
          {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'} },
          {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
          {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
          {path: 'tables', component: TablesComponent, data: {titulo: 'Tablas'} },
          {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'} },
          {path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos'} },
          {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'} },
          {path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil'} },
          {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes del tema'} },
          {path: '', redirectTo: '/dashboard', pathMatch: 'full', data: {titulo: 'Dashboard'} },
        ]
    }
];

export const PAGES_ROUTERS = RouterModule.forChild( pagesRouters );

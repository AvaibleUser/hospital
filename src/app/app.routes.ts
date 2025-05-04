import { Routes } from '@angular/router';
import { PharmacyLayoutComponent } from './modules/pharmacy/layouts/pharmacy-layout/pharmacy-layout.component';

export const routes: Routes = [
    {
        path: "pharmacy",
        component: PharmacyLayoutComponent,
        loadChildren: () => import('./modules/pharmacy/pharmacy.routes').then(m => m.routes)
    },
    {
        path: '',
        redirectTo: 'session',
        pathMatch: 'full'
    },

    {   path: "session",
        loadChildren: () => import('./modules/session/auth.routes').then(m => m.routes)
    },
    {
        path: 'employee-management',
        loadChildren: () => import('./modules/employees/employees.routes').then(m => m.EMPLOYEES_ROUTES),
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    },
    {
        path: 'patient-management',
        loadChildren: () => import('@patients/patients.routes').then((m) => m.routes),
    },
];

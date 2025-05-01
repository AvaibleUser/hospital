import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'employees',
        loadChildren: () => import('./modules/employees/employees.routes').then(m => m.EMPLOYEES_ROUTES),
    },
];

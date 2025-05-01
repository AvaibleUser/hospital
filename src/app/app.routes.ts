import { Routes } from '@angular/router';

export const routes: Routes = [

    {   path: "session",
        loadChildren: () => import('./modules/session/auth.routes').then(m => m.routes)
    },
    {
        path: 'employees',
        loadChildren: () => import('./modules/employees/employees.routes').then(m => m.EMPLOYEES_ROUTES),
    },
];

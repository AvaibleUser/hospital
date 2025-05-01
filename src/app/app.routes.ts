import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "session",
        loadChildren: () => import('./modules/session/auth.routes').then(m => m.routes)
    }
];

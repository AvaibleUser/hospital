import { Routes } from "@angular/router";

const editorRoutes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    },
]

export const EMPLOYEES_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix',
      },
      {
        path: '',
        loadComponent: () =>
          import('./layout/layout.component').then(
            (m) => m.LayoutComponent
          ),
        children: editorRoutes,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
]
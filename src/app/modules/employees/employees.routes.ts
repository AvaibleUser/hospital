import { Routes } from "@angular/router";

const editorRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'areas',
    loadComponent: () =>
      import('./pages/areas/areas.component').then((m) => m.AreasComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-employee/register-employee.component').then((m) => m.RegisterEmployeeComponent),
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
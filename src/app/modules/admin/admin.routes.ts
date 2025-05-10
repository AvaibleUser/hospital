import { Routes } from "@angular/router";

const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'management-users',
    loadComponent: () =>
      import('./pages/users/users.component').then((m) => m.UsersComponent),
  },
]

export const ADMIN_ROUTES: Routes = [
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
    children: adminRoutes,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
]
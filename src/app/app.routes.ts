import { Routes } from '@angular/router';
import { PharmacyLayoutComponent } from './modules/pharmacy/layouts/pharmacy-layout/pharmacy-layout.component';

export const routes: Routes = [
    {
        path: "pharmacy",
        component: PharmacyLayoutComponent,
        children: [
            {
                path: "dashboard",
                loadComponent: () => import('./modules/pharmacy/pages/dashboard/dashboard.component')
            },
            {
                path: "inventory",
                loadComponent: () => import('./modules/pharmacy/pages/inventory/inventory.component')
            },
            {
                path: "sales",
                loadComponent: () => import('./modules/pharmacy/pages/sales/sales.component')
            },
            {
                path: "inventory-check",
                loadComponent: () => import('./modules/pharmacy/pages/inventory-check/inventory-check.component')
            },
            {
                path: "reports",
                loadComponent: () => import('./modules/pharmacy/pages/reports/reports.component')
            },
            {
                path: "settings",
                loadComponent: () => import('./modules/pharmacy/pages/settings/settings.component')
            },
            {
                path: "",
                redirectTo: "dashboard",
                pathMatch: "full"
            }
        ]
    }
];

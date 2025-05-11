import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  Home,
  Package,
  ShoppingCart,
  CheckSquare,
  Settings,
  LogOut,
  ChartPie,
  PillBottle,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  readonly LogOut = LogOut;
  readonly PillBottle = PillBottle;

  menuItems: { label: string; icon: any; link: string }[] = [
    { label: 'Inventario', icon: Package, link: '/pharmacy/inventory' },
    { label: 'Ventas', icon: ShoppingCart, link: '/pharmacy/sales' },
    { label: 'Cierre de inventario', icon: CheckSquare, link: '/pharmacy/inventory-check' },
    { label: 'Reportes', icon: ChartPie, link: '/pharmacy/reports' },
  ];
}

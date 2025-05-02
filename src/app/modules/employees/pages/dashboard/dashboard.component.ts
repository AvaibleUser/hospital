import { Component, inject } from '@angular/core';
import { TarjetComponent } from '../../components/tarjet/tarjet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [TarjetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private readonly route = inject(Router)

  ngOnInit() {

  }

  goAreas(){
    this.route.navigate(['employee-management/areas'])
  }

}

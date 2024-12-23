import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    {
      title: 'Planets',
      description: 'Manage planetary data and information',
      route: '/planets',
      icon: 'bi bi-globe'
    },
    {
      title: 'Missions',
      description: 'Track exploration missions and their objectives',
      route: '/missions',
      icon: 'bi bi-rocket'
    },
    {
      title: 'Discoveries',
      description: 'Record and manage mission discoveries',
      route: '/discoveries',
      icon: 'bi bi-search'
    }
  ];
}

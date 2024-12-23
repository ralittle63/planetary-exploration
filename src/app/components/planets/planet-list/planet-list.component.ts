import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlanetService } from '../../../services/planet.service';
import { PlanetFormDto } from '../../../models/planet-form-dto';

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './planet-list.component.html',
  styleUrl: './planet-list.component.scss'
})
export class PlanetListComponent implements OnInit {
  planets: PlanetFormDto[] = [];
  loading = false;
  error = '';

  constructor(private planetService: PlanetService) {}

  ngOnInit(): void {
    this.loadPlanets();
  }

  loadPlanets(): void {
    this.loading = true;
    this.planetService.getAll().subscribe({
      next: (result) => {
        this.planets = result.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load planets';
        this.loading = false;
      }
    });
  }

  deletePlanet(id: number): void {
    if (confirm('Are you sure you want to delete this planet?')) {
      this.planetService.delete(id).subscribe({
        next: () => {
          this.loadPlanets();
        },
        error: (error) => {
          this.error = 'Failed to delete planet';
        }
      });
    }
  }

}

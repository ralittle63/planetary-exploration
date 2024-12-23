import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PlanetService } from '../../../services/planet.service';
import { PlanetFormDto } from '../../../models/planet-form-dto';

@Component({
  selector: 'app-planet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './planet-form.component.html',
  styleUrls: ['./planet-form.component.scss']
})
export class PlanetFormComponent implements OnInit {
  planetForm: FormGroup;
  isEditMode = false;
  planetId?: number;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private planetService: PlanetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.planetForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      climate: ['', Validators.required],
      terrain: ['', Validators.required],
      population: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.planetId = +id;
      this.loadPlanet(this.planetId);
    }
  }

  loadPlanet(id: number): void {
    this.loading = true;
    this.planetService.getById(id).subscribe({
          next: (result) => {
            this.planetForm.patchValue(result.data);
            this.loading = false;
          },
          error: (error) => {
            this.error = 'Failed to load mission';
            this.loading = false;
          }
        });
  }

  onSubmit(): void {
    if (this.planetForm.valid) {
      const planetData = this.planetForm.value as PlanetFormDto;
      
      if (this.isEditMode && this.planetId) {
        planetData.id = this.planetId;
        this.planetService.update(planetData).subscribe(() => {
          this.router.navigate(['/planets']);
        });
      } else {
        this.planetService.create(planetData).subscribe(() => {
          this.router.navigate(['/planets']);
        });
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MissionService } from '../../../services/mission.service';
import { MissionFormDto } from '../../../models/mission-form-dto';
import { PlanetDropdownDto } from '../../../models/planet-dropdown-dto';

@Component({
  selector: 'app-mission-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss']
})
export class MissionFormComponent implements OnInit {
  missionForm: FormGroup;
  planets: PlanetDropdownDto[] = [];
  isEditMode = false;
  missionId?: number;
  loading = false;
  error = '';
  missionDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private missionService: MissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.missionForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      planetId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPlanets();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.missionId = +id;
      this.loadMission(this.missionId);
    }
  }

  loadPlanets(): void {
    this.missionService.getPlanetDropdownList().subscribe({
      next: (result) => {
        this.planets = result.data;
      },
      error: (error) => {
        this.error = 'Failed to load planets';
      }
    });
  }

  loadMission(id: number): void {
    this.loading = true;
    this.missionService.getById(id).subscribe({
      next: (result) => {
        const currentDate = new Date(result.data.date);
        const timeOffsetMinutes = currentDate.getTimezoneOffset();
        console.log(timeOffsetMinutes);
        const timeOffsetMilliseconds = timeOffsetMinutes * 60 * 1000;
        console.log(timeOffsetMilliseconds);
        const adjustedDate = new Date(currentDate.getTime() + timeOffsetMilliseconds);

        this.missionForm.patchValue(result.data);
        this.missionDate = new Date(formatDate(adjustedDate, 'yyyy-MM-ddT00:00:00.000Z', 'en'));
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load mission';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.missionForm.valid) {
      const missionData = this.missionForm.value as MissionFormDto;
      
      if (this.isEditMode && this.missionId) {
        missionData.id = this.missionId;
        this.missionService.update(missionData).subscribe({
          next: () => {
            this.router.navigate(['/missions']);
          },
          error: (error) => {
            this.error = 'Failed to update mission';
          }
        });
      } else {
        this.missionService.create(missionData).subscribe({
          next: () => {
            this.router.navigate(['/missions']);
          },
          error: (error) => {
            this.error = 'Failed to create mission';
          }
        });
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DiscoveryService } from '../../../services/discovery.service';
import { MissionService } from '../../../services/mission.service';
import { DiscoveryFormDto } from '../../../models/discovery-form-dto';
import { MissionFormDto } from '../../../models/mission-form-dto';
import { DiscoveryTypeDropdownDto } from '../../../models/discovery-type-dropdown-dto';

@Component({
  selector: 'app-discovery-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './discovery-form.component.html',
  styleUrls: ['./discovery-form.component.scss']
})
export class DiscoveryFormComponent implements OnInit {
  discoveryForm: FormGroup;
  missions: MissionFormDto[] = [];
  discoveryTypes: DiscoveryTypeDropdownDto[] = [];
  isEditMode = false;
  discoveryId?: number;
  loading = false;
  error = '';
  missionId: number = -1;

  constructor(
    private fb: FormBuilder,
    private discoveryService: DiscoveryService,
    private missionService: MissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.discoveryForm = this.fb.group({
      name: ['', Validators.required],
      missionId: ['', Validators.required],
      discoveryTypeId: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMissions();
    this.loadDiscoveryTypes();
    
    const id = this.route.snapshot.paramMap.get('id');
    const missionid = this.route.snapshot.paramMap.get('missionid');

    if (id) {
      this.isEditMode = true;
      this.discoveryId = +id;
      this.loadDiscovery(this.discoveryId);
    }

    if (missionid) {
      this.missionId = +missionid;

      if (!this.isEditMode) {
        this.discoveryForm.controls['missionId'].setValue(this.missionId);
      }

    }
  }

  loadMissions(): void {
    this.missionService.getAll().subscribe({
      next: (result) => {
        this.missions = result.data;
      },
      error: (error) => {
        this.error = 'Failed to load missions';
      }
    });
  }

  loadDiscoveryTypes(): void {
    this.discoveryService.getDiscoveryTypeDropdownList().subscribe({
      next: (result) => {
        this.discoveryTypes = result.data;
      },
      error: (error) => {
        this.error = 'Failed to load discovery types';
      }
    });
  }

  loadDiscovery(id: number): void {
    this.loading = true;
    this.discoveryService.getById(id).subscribe({
      next: (result) => {
        this.discoveryForm.patchValue(result.data);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load discovery';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.discoveryForm.valid) {
      const discoveryData = this.discoveryForm.value as DiscoveryFormDto;
      
      if (this.isEditMode && this.discoveryId) {
        discoveryData.id = this.discoveryId;
        this.discoveryService.update(discoveryData).subscribe({
          next: () => {
            this.router.navigate(['/discoveries', this.missionId]);
          },
          error: (error) => {
            this.error = 'Failed to update discovery';
          }
        });
      } else {
        this.discoveryService.createDiscoveryForMission(this.missionId, discoveryData).subscribe({
          next: () => {
            this.router.navigate(['/discoveries', this.missionId]);
          },
          error: (error) => {
            this.error = 'Failed to create discovery';
          }
        });
      }
    }
  }
}

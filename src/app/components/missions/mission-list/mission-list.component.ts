import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MissionService } from '../../../services/mission.service';
import { MissionFormDto } from '../../../models/mission-form-dto';

@Component({
  selector: 'app-mission-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {
  missions: MissionFormDto[] = [];
  loading = false;
  error = '';

  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.loading = true;
    this.missionService.getAll().subscribe({
      next: (result) => {
        this.missions = result.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load missions';
        this.loading = false;
      }
    });
  }

  deleteMission(id: number): void {
    if (confirm('Are you sure you want to delete this mission?')) {
      this.missionService.delete(id).subscribe({
        next: () => {
          this.loadMissions();
        },
        error: (error) => {
          this.error = 'Failed to delete mission';
        }
      });
    }
  }
}

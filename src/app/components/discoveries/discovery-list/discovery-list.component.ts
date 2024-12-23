import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DiscoveryService } from '../../../services/discovery.service';
import { DiscoveryFormDto } from '../../../models/discovery-form-dto';

@Component({
  selector: 'app-discovery-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './discovery-list.component.html',
  styleUrls: ['./discovery-list.component.scss']
})
export class DiscoveryListComponent implements OnInit {
  discoveries: DiscoveryFormDto[] = [];
  loading = false;
  error = '';
  missionId?: number;

  constructor(
    private discoveryService: DiscoveryService,
    //private router: Router,
    private route: ActivatedRoute, //add line
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    const missionid = this.route.snapshot.paramMap.get('missionid');

    if (missionid) {
      this.missionId = +missionid;
      this.loadDiscoveries(this.missionId);
    }
    else {
      const element = this.el.nativeElement.querySelector('#btnAddDiscovery');
      this.renderer.setAttribute(element, 'disabled', 'true');
    }
  }

  loadDiscoveries(missionId: number): void {
    this.loading = true;
    this.discoveryService.getAll(missionId).subscribe({
      next: (result) => {
        this.discoveries = result.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load discoveries';
        this.loading = false;
      }
    });
  }

  deleteDiscovery(id: number, missionId: number): void {
    if (confirm('Are you sure you want to delete this discovery?')) {
      this.discoveryService.delete(id).subscribe({
        next: () => {
          this.loadDiscoveries(missionId);
        },
        error: (error) => {
          this.error = 'Failed to delete discovery';
        }
      });
    }
  }
}

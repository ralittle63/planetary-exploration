import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryListComponent } from './discovery-list.component';

describe('DiscoveryListComponent', () => {
  let component: DiscoveryListComponent;
  let fixture: ComponentFixture<DiscoveryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoveryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoveryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

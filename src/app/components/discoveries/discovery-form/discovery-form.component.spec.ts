import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryFormComponent } from './discovery-form.component';

describe('DiscoveryFormComponent', () => {
  let component: DiscoveryFormComponent;
  let fixture: ComponentFixture<DiscoveryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoveryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoveryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

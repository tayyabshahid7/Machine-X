import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingJobDetailsComponent } from './working-job-details.component';

describe('WorkingJobDetailsComponent', () => {
  let component: WorkingJobDetailsComponent;
  let fixture: ComponentFixture<WorkingJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingJobDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

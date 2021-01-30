import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingJobComponent } from './working-job.component';

describe('WorkingJobComponent', () => {
  let component: WorkingJobComponent;
  let fixture: ComponentFixture<WorkingJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

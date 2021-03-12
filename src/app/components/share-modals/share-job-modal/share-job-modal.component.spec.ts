import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareJobModalComponent } from './share-job-modal.component';

describe('ShareJobModalComponent', () => {
  let component: ShareJobModalComponent;
  let fixture: ComponentFixture<ShareJobModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareJobModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

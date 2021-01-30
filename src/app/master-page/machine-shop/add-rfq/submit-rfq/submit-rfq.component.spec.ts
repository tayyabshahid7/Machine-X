import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRfqComponent } from './submit-rfq.component';

describe('SubmitRfqComponent', () => {
  let component: SubmitRfqComponent;
  let fixture: ComponentFixture<SubmitRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitRfqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

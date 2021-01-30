import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRFQComponent } from './new-rfq.component';

describe('NewRFQComponent', () => {
  let component: NewRFQComponent;
  let fixture: ComponentFixture<NewRFQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRFQComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRFQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

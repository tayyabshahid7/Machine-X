import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFQsComponent } from './rfqs.component';

describe('RFQsComponent', () => {
  let component: RFQsComponent;
  let fixture: ComponentFixture<RFQsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RFQsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RFQsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

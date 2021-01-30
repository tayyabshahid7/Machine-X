import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpQuoteComponent } from './exp-quote.component';

describe('ExpQuoteComponent', () => {
  let component: ExpQuoteComponent;
  let fixture: ComponentFixture<ExpQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

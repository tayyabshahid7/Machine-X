import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedQuoteComponent } from './submitted-quote.component';

describe('SubmittedQuoteComponent', () => {
  let component: SubmittedQuoteComponent;
  let fixture: ComponentFixture<SubmittedQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

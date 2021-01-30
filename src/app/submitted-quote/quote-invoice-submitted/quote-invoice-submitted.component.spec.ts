import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteInvoiceSubmittedComponent } from './quote-invoice-submitted.component';

describe('QuoteInvoiceSubmittedComponent', () => {
  let component: QuoteInvoiceSubmittedComponent;
  let fixture: ComponentFixture<QuoteInvoiceSubmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteInvoiceSubmittedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteInvoiceSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

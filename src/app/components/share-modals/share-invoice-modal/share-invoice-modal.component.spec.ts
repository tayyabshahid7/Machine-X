import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareInvoiceModalComponent } from './share-invoice-modal.component';

describe('ShareInvoiceModalComponent', () => {
  let component: ShareInvoiceModalComponent;
  let fixture: ComponentFixture<ShareInvoiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareInvoiceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareInvoiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareReceiptModalComponent } from './share-receipt-modal.component';

describe('ShareReceiptModalComponent', () => {
  let component: ShareReceiptModalComponent;
  let fixture: ComponentFixture<ShareReceiptModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareReceiptModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareReceiptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

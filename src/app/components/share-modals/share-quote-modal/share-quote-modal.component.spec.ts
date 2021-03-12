import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareQuoteModalComponent } from './share-quote-modal.component';

describe('ShareQuoteModalComponent', () => {
  let component: ShareQuoteModalComponent;
  let fixture: ComponentFixture<ShareQuoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareQuoteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareQuoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

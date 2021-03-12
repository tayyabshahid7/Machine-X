import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteHistoryComponent } from './quote-history.component';

describe('QuoteHistoryComponent', () => {
  let component: QuoteHistoryComponent;
  let fixture: ComponentFixture<QuoteHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

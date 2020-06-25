import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBidsOfProductsComponent } from './all-bids-of-products.component';

describe('AllBidsOfProductsComponent', () => {
  let component: AllBidsOfProductsComponent;
  let fixture: ComponentFixture<AllBidsOfProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBidsOfProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBidsOfProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

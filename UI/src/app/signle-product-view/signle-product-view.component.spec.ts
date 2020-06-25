import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignleProductViewComponent } from './signle-product-view.component';

describe('SignleProductViewComponent', () => {
  let component: SignleProductViewComponent;
  let fixture: ComponentFixture<SignleProductViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignleProductViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignleProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

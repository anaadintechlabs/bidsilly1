import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductViewAdminComponent } from './single-product-view-admin.component';

describe('SingleProductViewAdminComponent', () => {
  let component: SingleProductViewAdminComponent;
  let fixture: ComponentFixture<SingleProductViewAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleProductViewAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProductViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

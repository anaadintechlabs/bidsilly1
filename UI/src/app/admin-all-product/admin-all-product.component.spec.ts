import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllProductComponent } from './admin-all-product.component';

describe('AdminAllProductComponent', () => {
  let component: AdminAllProductComponent;
  let fixture: ComponentFixture<AdminAllProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

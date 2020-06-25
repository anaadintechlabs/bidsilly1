import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllProduct2Component } from './admin-all-product2.component';

describe('AdminAllProduct2Component', () => {
  let component: AdminAllProduct2Component;
  let fixture: ComponentFixture<AdminAllProduct2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllProduct2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllProduct2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

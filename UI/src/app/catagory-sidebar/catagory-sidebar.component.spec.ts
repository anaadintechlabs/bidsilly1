import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagorySidebarComponent } from './catagory-sidebar.component';

describe('CatagorySidebarComponent', () => {
  let component: CatagorySidebarComponent;
  let fixture: ComponentFixture<CatagorySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatagorySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagorySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

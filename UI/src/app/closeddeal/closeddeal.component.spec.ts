import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseddealComponent } from './closeddeal.component';

describe('CloseddealComponent', () => {
  let component: CloseddealComponent;
  let fixture: ComponentFixture<CloseddealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseddealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseddealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

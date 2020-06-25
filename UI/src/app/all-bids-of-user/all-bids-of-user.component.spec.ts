import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBidsOfUserComponent } from './all-bids-of-user.component';

describe('AllBidsOfUserComponent', () => {
  let component: AllBidsOfUserComponent;
  let fixture: ComponentFixture<AllBidsOfUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBidsOfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBidsOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

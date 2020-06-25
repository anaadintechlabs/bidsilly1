import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserViewComponent } from './other-user-view.component';

describe('OtherUserViewComponent', () => {
  let component: OtherUserViewComponent;
  let fixture: ComponentFixture<OtherUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherUserViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

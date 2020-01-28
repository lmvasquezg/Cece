import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpGoogleComponent } from './sign-up-google.component';

describe('SignUpGoogleComponent', () => {
  let component: SignUpGoogleComponent;
  let fixture: ComponentFixture<SignUpGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

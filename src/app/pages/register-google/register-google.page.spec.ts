import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterGooglePage } from './register-google.page';

describe('RegisterGooglePage', () => {
  let component: RegisterGooglePage;
  let fixture: ComponentFixture<RegisterGooglePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterGooglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPaswordPage } from './forgot-pasword.page';

describe('ForgotPaswordPage', () => {
  let component: ForgotPaswordPage;
  let fixture: ComponentFixture<ForgotPaswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ForgotPaswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

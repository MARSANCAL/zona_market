import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisPage } from './regis.page';

describe('RegisPage', () => {
  let component: RegisPage;
  let fixture: ComponentFixture<RegisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegItemPage } from './reg-item.page';

describe('RegItemPage', () => {
  let component: RegItemPage;
  let fixture: ComponentFixture<RegItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

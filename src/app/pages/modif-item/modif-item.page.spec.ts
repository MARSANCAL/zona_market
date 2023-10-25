import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifItemPage } from './modif-item.page';

describe('ModifItemPage', () => {
  let component: ModifItemPage;
  let fixture: ComponentFixture<ModifItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModifItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

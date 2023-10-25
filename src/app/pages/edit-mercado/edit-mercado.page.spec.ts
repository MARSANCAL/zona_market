import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMercadoPage } from './edit-mercado.page';

describe('EditMercadoPage', () => {
  let component: EditMercadoPage;
  let fixture: ComponentFixture<EditMercadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditMercadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

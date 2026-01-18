import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionesComponent } from './clasificaciones.component';

describe('ClasificacionesComponent', () => {
  let component: ClasificacionesComponent;
  let fixture: ComponentFixture<ClasificacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasificacionesComponent]
    });
    fixture = TestBed.createComponent(ClasificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

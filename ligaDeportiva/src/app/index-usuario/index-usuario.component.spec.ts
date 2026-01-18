import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexUsuarioComponent } from './index-usuario.component';

describe('IndexUsuarioComponent', () => {
  let component: IndexUsuarioComponent;
  let fixture: ComponentFixture<IndexUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexUsuarioComponent]
    });
    fixture = TestBed.createComponent(IndexUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

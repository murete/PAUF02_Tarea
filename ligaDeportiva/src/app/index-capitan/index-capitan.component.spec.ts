import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCapitanComponent } from './index-capitan.component';

describe('IndexCapitanComponent', () => {
  let component: IndexCapitanComponent;
  let fixture: ComponentFixture<IndexCapitanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexCapitanComponent]
    });
    fixture = TestBed.createComponent(IndexCapitanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

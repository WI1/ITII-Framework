import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aufgabe4Component } from './aufgabe4.component';

describe('Aufgabe4Component', () => {
  let component: Aufgabe4Component;
  let fixture: ComponentFixture<Aufgabe4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aufgabe4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Aufgabe4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

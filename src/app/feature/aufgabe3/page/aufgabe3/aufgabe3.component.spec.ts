import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aufgabe3Component } from './aufgabe3.component';

describe('Aufgabe3Component', () => {
  let component: Aufgabe3Component;
  let fixture: ComponentFixture<Aufgabe3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aufgabe3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Aufgabe3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aufgabe5Component } from './aufgabe5.component';

describe('Aufgabe5Component', () => {
  let component: Aufgabe5Component;
  let fixture: ComponentFixture<Aufgabe5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aufgabe5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Aufgabe5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aufgabe2Component } from './aufgabe2.component';

describe('Aufgabe2Component', () => {
  let component: Aufgabe2Component;
  let fixture: ComponentFixture<Aufgabe2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aufgabe2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Aufgabe2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

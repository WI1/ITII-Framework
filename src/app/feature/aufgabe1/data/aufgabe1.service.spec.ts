import { TestBed } from '@angular/core/testing';

import { Aufgabe1Service } from './aufgabe1.service';

describe('Aufgabe1Service', () => {
  let service: Aufgabe1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aufgabe1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

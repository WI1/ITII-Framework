import { TestBed } from '@angular/core/testing';

import { Aufgabe4Service } from './aufgabe4.service';

describe('Aufgabe4Service', () => {
  let service: Aufgabe4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aufgabe4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

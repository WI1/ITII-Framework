import { TestBed } from '@angular/core/testing';

import { Aufgabe3Service } from './aufgabe3.service';

describe('Aufgabe3Service', () => {
  let service: Aufgabe3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aufgabe3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

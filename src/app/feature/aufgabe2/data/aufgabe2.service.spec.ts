import { TestBed } from '@angular/core/testing';

import { Aufgabe2Service } from './aufgabe2.service';

describe('Aufgabe2Service', () => {
  let service: Aufgabe2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aufgabe2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

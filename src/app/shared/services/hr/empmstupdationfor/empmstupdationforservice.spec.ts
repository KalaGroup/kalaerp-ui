import { TestBed } from '@angular/core/testing';

import { Empmstupdationforservice } from './empmstupdationforservice';

describe('Empmstupdationforservice', () => {
  let service: Empmstupdationforservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Empmstupdationforservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

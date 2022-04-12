import { TestBed } from '@angular/core/testing';

import { Homestay2Service } from './homestay2.service';

describe('Homestay2Service', () => {
  let service: Homestay2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Homestay2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

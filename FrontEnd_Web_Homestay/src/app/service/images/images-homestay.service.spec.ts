import { TestBed } from '@angular/core/testing';

import { ImagesHomestayService } from './images-homestay.service';

describe('ImagesHomestayService', () => {
  let service: ImagesHomestayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesHomestayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

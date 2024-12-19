import { TestBed } from '@angular/core/testing';

import { PublicGalleryService } from './public-gallery.service';

describe('PublicGalleryService', () => {
  let service: PublicGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

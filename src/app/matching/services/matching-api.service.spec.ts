import { TestBed } from '@angular/core/testing';

import { MatchingApiService } from './matching-api.service';

describe('MatchingApiService', () => {
  let service: MatchingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

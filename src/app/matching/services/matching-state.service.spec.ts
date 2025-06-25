import { TestBed } from '@angular/core/testing';

import { MatchingStateService } from './matching-state.service';

describe('MatchingStateService', () => {
  let service: MatchingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

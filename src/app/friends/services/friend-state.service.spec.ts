import { TestBed } from '@angular/core/testing';

import { FriendStateService } from './friend-state.service';

describe('FriendStateService', () => {
  let service: FriendStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

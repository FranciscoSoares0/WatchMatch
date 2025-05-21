import { TestBed } from '@angular/core/testing';

import { FriendService } from './friend-api.service';

describe('FriendService', () => {
  let service: FriendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

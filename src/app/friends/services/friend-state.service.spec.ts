import { TestBed } from '@angular/core/testing';

import { FriendStateService } from './friend-state.service';
import { Friend } from '../interfaces/friend';

describe('FriendStateService', () => {
  let service: FriendStateService;

  const mockFriend: Friend = {
      _id: 'testId',
      friendId: '123',
      friendEmail: 'test@email.com',
      friendName: 'Test Name',
      friendProfileImage: '',
      // add other properties depending on your Friend interface
    };
    
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get friends', () => {
    service.setFriends([mockFriend]);
    expect(service.friendsSig()).toEqual([mockFriend]);
  });

  it('should add a friend', () => {
    service.setFriends([]);
    service.addFriend(mockFriend);
    expect(service.friendsSig()).toEqual([mockFriend]);
  });

  it('should remove a friend', () => {
    service.setFriends([mockFriend]);
    service.removeFriend('123');
    expect(service.friendsSig()).toEqual([]);
  });

  it('should add a sent request', () => {
    service.setSentRequests([]);
    service.addSentRequest(mockFriend);
    expect(service.sentRequestsSig()).toEqual([mockFriend]);
  });

  it('should remove a friend request', () => {
    service.setFriendRequests([mockFriend]);
    service.removeFriendRequest('123');
    expect(service.friendRequestsSig()).toEqual([]);
  });
});

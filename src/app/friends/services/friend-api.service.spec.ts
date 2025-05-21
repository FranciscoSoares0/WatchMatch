import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FriendApiService } from './friend-api.service';
import { Friend } from '../interfaces/friend';
import {
  SendFriendRequest,
  SendFriendRequestResponse,
} from '../interfaces/send-friend-request';
import {
  RespondRequest,
  RespondRequestResponse,
} from '../interfaces/respond-request';
import { RemoveFriendResponse } from '../interfaces/remove-friend';

describe('FriendApiService', () => {
  let service: FriendApiService;
  let httpMock: HttpTestingController;

  const mockFriends: Friend[] = [
    {
      _id: 'testId',
      friendId: '123',
      friendEmail: 'test@email.com',
      friendName: 'Test Name',
      friendProfileImage: '',
    },
    {
      _id: 'testId2',
      friendId: '456',
      friendEmail: 'test2@email.com',
      friendName: 'Another Name',
      friendProfileImage: '',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FriendApiService],
    });

    service = TestBed.inject(FriendApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user friends', () => {
    service.getUserFriends().subscribe((friends) => {
      expect(friends.length).toBe(2);
      expect(friends).toEqual(mockFriends);
    });

    const req = httpMock.expectOne('/friends');
    expect(req.request.method).toBe('GET');
    //expect(req.request.withCredentials).toBeTrue();
    req.flush(mockFriends);
  });

  it('should send friend request', () => {
    const requestData: SendFriendRequest = {
      // populate with whatever your interface requires, example:
      friendEmail: 'test@email.com',
    };

    const mockResponse: SendFriendRequestResponse = {
      message:'Friend request sent successfully',
      friendship: {
        _id: 'reqId',
        friendId: '123',
        friendEmail: 'test@email.com',
        friendName: 'Test Name',
        friendProfileImage: '',
      },
    };

    service.sendFriendRequest(requestData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/friends/requests');
    expect(req.request.method).toBe('POST');
    //expect(req.request.withCredentials).toBeTrue();
    expect(req.request.body).toEqual(requestData);
    req.flush(mockResponse);
  });

  it('should get friend requests', () => {
    service.getFriendRequests().subscribe((requests) => {
      expect(requests).toEqual(mockFriends);
    });

    const req = httpMock.expectOne('/friends/requests');
    expect(req.request.method).toBe('GET');
    //expect(req.request.withCredentials).toBeTrue();
    req.flush(mockFriends);
  });

  it('should get sent requests', () => {
    service.getSentRequests().subscribe((requests) => {
      expect(requests).toEqual(mockFriends);
    });

    const req = httpMock.expectOne('/friends/sent-requests');
    expect(req.request.method).toBe('GET');
    //expect(req.request.withCredentials).toBeTrue();
    req.flush(mockFriends);
  });

  it('should accept friend request', () => {
    const friendId = '123';
    const requestData: RespondRequest = {
      accept: true,
    };

    const mockResponse: RespondRequestResponse = {
      message: 'Friend request accepted',
      friendship: {
        _id: 'respId',
        friendId: '123',
        friendEmail: 'test@email.com',
        friendName: 'Test Name',
        friendProfileImage: '',
      },
    };

    service.respondToFriendRequest(friendId, requestData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`/friends/requests/${friendId}`);
    expect(req.request.method).toBe('PATCH');
    //expect(req.request.withCredentials).toBeTrue();
    expect(req.request.body).toEqual(requestData);
    req.flush(mockResponse);
  });

  it('should remove a friend', () => {
    const friendId = '681ce88b0c20116e1b754b49';

    const mockResponse: RemoveFriendResponse = {
      message: 'Friend removed successfully',
    };

    service.removeFriend(friendId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`/friends/${friendId}`);
    expect(req.request.method).toBe('DELETE');
    //expect(req.request.withCredentials).toBeTrue();
    req.flush(mockResponse);
  });
});

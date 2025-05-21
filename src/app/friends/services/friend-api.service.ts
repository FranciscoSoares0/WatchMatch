import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class FriendApiService {
  private readonly http = inject(HttpClient);

  getUserFriends(): Observable<Friend[]> {
    return this.http.get<Friend[]>('/friends', { withCredentials: true });
  }

  sendFriendRequest(
    data: SendFriendRequest
  ): Observable<SendFriendRequestResponse> {
    return this.http.post<SendFriendRequestResponse>(
      '/friends/requests',
      data,
      { withCredentials: true }
    );
  }

  getFriendRequests(): Observable<Friend[]> {
    return this.http.get<Friend[]>('/friends/requests', {
      withCredentials: true,
    });
  }

  getSentRequests(): Observable<Friend[]> {
    return this.http.get<Friend[]>('/friends/sent-requests', {
      withCredentials: true,
    });
  }

  respondToFriendRequest(
    id: string,
    data: RespondRequest
  ): Observable<RespondRequestResponse> {
    return this.http.patch<RespondRequestResponse>(
      `/friends/requests/${id}`,
      data,
      { withCredentials: true }
    );
  }

  removeFriend(friendId: string): Observable<RemoveFriendResponse> {
    return this.http.delete<RemoveFriendResponse>(`/friends/${friendId}`, {
      withCredentials: true,
    });
  }
}

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
import {
  RemoveFriendResponse,
} from '../interfaces/remove-friend';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private readonly http = inject(HttpClient);

  friendsSig = signal<Friend[]>([]);
  friendRequestsSig = signal<Friend[]>([]);
  sentRequestsSig = signal<Friend[]>([]);

  getUserFriends(): Observable<Friend[]> {
    return this.http
      .get<Friend[]>(`/friends`, {
        withCredentials: true,
      })
      .pipe(
        tap((friends) => {
          this.friendsSig.set(friends);
        })
      );
  }

  sendFriendRequest(
    sendFriendRequestData: SendFriendRequest
  ): Observable<SendFriendRequestResponse> {
    return this.http.post<SendFriendRequestResponse>(
      `/friends/requests`,
      sendFriendRequestData,
      {
        withCredentials: true,
      }
    ).pipe(
      tap((response)=>{
        const currentSentRequests = this.sentRequestsSig();
        this.sentRequestsSig.set([...currentSentRequests, response.friendship]);
      })
    );
  }

  getFriendRequests(): Observable<Friend[]> {
    return this.http
      .get<Friend[]>(`/friends/requests`, {
        withCredentials: true,
      })
      .pipe(
        tap((requests) => {
          this.friendRequestsSig.set(requests);
        })
      );
  }

  getSentRequests(): Observable<Friend[]> {
    return this.http
      .get<Friend[]>(`/friends/sent-requests`, {
        withCredentials: true,
      })
      .pipe(
        tap((requests) => {
          this.sentRequestsSig.set(requests);
        })
      );
  }

  respondToFriendRequest(
    requestorId: string,
    respondRequestData: RespondRequest
  ): Observable<RespondRequestResponse> {
    return this.http
      .patch<RespondRequestResponse>(`/friends/requests/${requestorId}`, respondRequestData, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (respondRequestData.accept && response.friendship) {
            const currentFriends = this.friendsSig();
            this.friendsSig.set([...currentFriends, response.friendship]);
          }

          const updatedRequests = this.friendRequestsSig().filter(
              (req) => req.friendId !== requestorId
            );
            this.friendRequestsSig.set(updatedRequests);
        })
      );
  }

  removeFriend(
    friendId: string
  ): Observable<RemoveFriendResponse> {
    return this.http
      .delete<RespondRequestResponse>(`/friends/${friendId}`, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          const currentFriends = this.friendsSig();
          const updatedFriends = currentFriends.filter(
            (friend) => friend.friendId !== friendId
          );
          this.friendsSig.set(updatedFriends);
        })
      );
  }
}

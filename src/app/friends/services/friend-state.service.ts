import { Injectable, signal } from '@angular/core';
import { Friend } from '../interfaces/friend';
import { RespondRequest, RespondRequestResponse } from '../interfaces/respond-request';

@Injectable({
  providedIn: 'root',
})
export class FriendStateService {

  readonly friendsSig = signal<Friend[]>([]);
  readonly friendRequestsSig = signal<Friend[]>([]);
  readonly sentRequestsSig = signal<Friend[]>([]);

   setFriends(friends: Friend[]) {
    this.friendsSig.set(friends);
  }

  setFriendRequests(requests: Friend[]) {
    this.friendRequestsSig.set(requests);
  }

  setSentRequests(requests: Friend[]) {
    this.sentRequestsSig.set(requests);
  }

  addSentRequest(friend: Friend) {
    this.sentRequestsSig.set([...this.sentRequestsSig(), friend]);
  }

  respondRequest(friendId:string, data:RespondRequest,response: RespondRequestResponse){
    if (data.accept && response.friendship) {
        this.friendsSig.set([...this.friendsSig(), response.friendship]);
      }
      this.removeFriendRequest(friendId);
  }

  addFriend(friend: Friend) {
    this.friendsSig.set([...this.friendsSig(), friend]);
  }

  removeFriend(friendId: string) {
    this.friendsSig.set(this.friendsSig().filter(f => f.friendId !== friendId));
  }

  removeFriendRequest(friendId: string) {
    this.friendRequestsSig.set(this.friendRequestsSig().filter(f => f.friendId !== friendId));
  }

}

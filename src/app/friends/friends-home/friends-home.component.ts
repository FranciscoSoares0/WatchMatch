import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FriendsTableComponent } from '../friends-table/friends-table.component';
import { AddFriendFormComponent } from '../add-friend-form/add-friend-form.component';
import { SentFriendRequestsTableComponent } from '../sent-friend-requests-table/sent-friend-requests-table.component';
import { FriendRequestsTableComponent } from '../friend-requests-table/friend-requests-table.component';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-friends-home',
  imports: [TabsModule, AddFriendFormComponent, SentFriendRequestsTableComponent, FriendRequestsTableComponent, FriendsTableComponent],
  templateUrl: './friends-home.component.html',
  styleUrl: './friends-home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsHomeComponent {

}

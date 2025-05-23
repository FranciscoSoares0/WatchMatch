import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FriendsHomeComponent } from '../friends/friends-home/friends-home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'friends',
        component: FriendsHomeComponent,
      },
    ],
  },
];
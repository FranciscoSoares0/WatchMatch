import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FriendsHomeComponent } from '../friends/friends-home/friends-home.component';
import { MatchingFormComponent } from '../matching/matching-form/matching-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'friends',
        component: FriendsHomeComponent,
      },
      {
        path: 'matching',
        component: MatchingFormComponent,
      },
    ],
  },
];
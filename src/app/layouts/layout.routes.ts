import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FriendsHomeComponent } from '../friends/friends-home/friends-home.component';
import { MatchingFormComponent } from '../matching/matching-form/matching-form.component';
import { MatchingSelectionComponent } from '../matching/matching-selection/matching-selection.component';
import { HomePageDisplayComponent } from './components/homepagedisplay/homepagedisplay.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomePageDisplayComponent,
      },
      {
        path: 'friends',
        component: FriendsHomeComponent,
      },
      {
        path: 'matching',
        component: MatchingFormComponent,
      },
      {
        path: 'matching/:matchingId',
        component: MatchingSelectionComponent,
      },
    ],
  },
];
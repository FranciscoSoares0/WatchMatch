import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMatching, AddMatchingResponse } from '../interfaces/add-matching';
import { Matching } from '../interfaces/matching';
import { UpdateMatching } from '../interfaces/update-matching';

@Injectable({
  providedIn: 'root',
})
export class MatchingApiService {
  private readonly http = inject(HttpClient);

  addMatching(addMatchingData: AddMatching): Observable<AddMatchingResponse> {
    return this.http.post<AddMatchingResponse>('/matching', addMatchingData, {
      withCredentials: true,
    });
  }

  getPendingMatchings(): Observable<Matching[]> {
    return this.http.get<Matching[]>(`/matching/pending`, {
      withCredentials: true,
    });
  }

  getCompletedMatchings(): Observable<Matching[]> {
    return this.http.get<Matching[]>(`/matching/completed`, {
      withCredentials: true,
    });
  }

  getMatchingById(matchingId: string): Observable<Matching> {
    return this.http.get<Matching>(`/matching/${matchingId}`, {
      withCredentials: true,
    });
  }

  updateUserMatchingShows(updateUserShowsData: UpdateMatching, matchingId: string): Observable<Matching> {
    return this.http.patch<Matching>(
      `/matching/${matchingId}`,
      updateUserShowsData,
      { withCredentials: true }
    );
  }
}

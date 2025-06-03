import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMatching, AddMatchingResponse } from '../interfaces/add-matching';

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
}

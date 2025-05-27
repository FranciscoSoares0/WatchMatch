import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { map, Observable } from 'rxjs';
import { GenresResponse } from '../../matching/interfaces/genres-response';
import { MoviesResponse } from '../../matching/interfaces/movies-response';
import { Filters } from '../../matching/interfaces/filters';
import { TvshowsResponse } from '../../matching/interfaces/tvshows-response';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private readonly httpRaw: HttpClient;
  private readonly tmdbUrl = environment.TMDB_API_URL;
  private readonly tmdbAPIKey = environment.TMDB_API_KEY;

  private readonly headers = new HttpHeaders({
    Accept: 'application/json',
    Authorization: `Bearer ${this.tmdbAPIKey}`,
  });

  constructor(private handler: HttpBackend) {
    this.httpRaw = new HttpClient(handler);
  }

  getGenres(type: string): Observable<GenresResponse> {
    const url = `${this.tmdbUrl}/genre/${type}/list`;
    return this.httpRaw.get<GenresResponse>(url, { headers: this.headers });
  }

  searchForMovies(filters: Filters): Observable<MoviesResponse> {
    let url = `${this.tmdbUrl}/discover/movie?page=1`;

    let params: any = {};

    if (filters)
      if (filters.genres.length) params['with_genres'] = filters.genres.join(',');
    if (filters.startDate)
      params['release_date.gte'] = this.formatDate(filters.startDate);
    if (filters.endDate)
      params['release_date.lte'] = this.formatDate(filters.endDate);

    params['sort_by'] = "popularity.desc";

    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
      url += `&${queryString}`;
    }
    return this.httpRaw.get<MoviesResponse>(url, { headers: this.headers }).pipe(
      map(response => ({
        ...response,
        results: response.results.slice(0, 10)
      })
      )
    );
  }

  searchForTVShows(filters: Filters): Observable<TvshowsResponse> {
    let url = `${this.tmdbUrl}/discover/tv?page=1`;

    let params: any = {};

    if (filters)
      if (filters.genres.length) params['with_genres'] = filters.genres.join(',');
    if (filters.startDate)
      params['first_air_date.gte'] = this.formatDate(filters.startDate);
    if (filters.endDate)
      params['first_air_date.lte'] = this.formatDate(filters.endDate);

    params['sort_by'] = "popularity.desc";

    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
      url += `&${queryString}`;
    }
    return this.httpRaw.get<TvshowsResponse>(url, { headers: this.headers }).pipe(
      map(response => ({
        ...response,
        results: response.results.slice(0, 10)
      })
      )
    );
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}

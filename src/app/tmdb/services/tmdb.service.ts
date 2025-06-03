import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { map, Observable } from 'rxjs';
import { GenresResponse } from '../../matching/interfaces/genres-response';
import { ShowsResponse } from '../../matching/interfaces/shows-response';
import { Filters } from '../../matching/interfaces/filters';

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

  searchForMovies(filters: Filters): Observable<ShowsResponse> {
    let url = `${this.tmdbUrl}/discover/movie?page=1`;

    let params: any = {};

    if (filters)
      if (filters.genres.length)
        params['with_genres'] = filters.genres.join(',');
    if (filters.startDate)
      params['release_date.gte'] = this.formatDate(filters.startDate);
    if (filters.endDate)
      params['release_date.lte'] = this.formatDate(filters.endDate);

    params['sort_by'] = 'popularity.desc';

    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
      url += `&${queryString}`;
    }
    return this.httpRaw
      .get<ShowsResponse>(url, { headers: this.headers })
      .pipe(
        map((response) => ({
          ...response,
          results: response.results.slice(0, 10).map((movie) => ({
            backdrop_path: movie.backdrop_path,
            genre_ids: movie.genre_ids,
            id: movie.id,
            overview: movie.overview,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            title: movie.title,
            vote_average: movie.vote_average,
          })),
        }))
      );
  }

  searchForTVShows(filters: Filters): Observable<ShowsResponse> {
    let url = `${this.tmdbUrl}/discover/tv?page=1`;

    let params: any = {};

    if (filters)
      if (filters.genres.length)
        params['with_genres'] = filters.genres.join(',');
    if (filters.startDate)
      params['first_air_date.gte'] = this.formatDate(filters.startDate);
    if (filters.endDate)
      params['first_air_date.lte'] = this.formatDate(filters.endDate);

    params['sort_by'] = 'popularity.desc';

    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
      url += `&${queryString}`;
    }
    return this.httpRaw
      .get<ShowsResponse>(url, { headers: this.headers })
      .pipe(
        map((response) => ({
          ...response,
          results: response.results.slice(0, 10).map((tvShow) => ({
            backdrop_path: tvShow.backdrop_path,
            genre_ids: tvShow.genre_ids,
            id: tvShow.id,
            overview: tvShow.overview,
            poster_path: tvShow.poster_path,
            release_date: tvShow.first_air_date,
            title: tvShow.name,
            vote_average: tvShow.vote_average,
          })),
        }))
      );
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}

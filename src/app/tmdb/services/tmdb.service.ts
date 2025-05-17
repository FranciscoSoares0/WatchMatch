import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private readonly httpRaw: HttpClient;
  private readonly tmdbUrl = environment.tmdbAPIURL;
  private readonly tmdbAPIKey = environment.tmdbAPIKey;

  private readonly headers = new HttpHeaders({
    Accept: 'application/json',
    Authorization: `Bearer ${this.tmdbAPIKey}`,
  });

  constructor(private handler: HttpBackend) {
    this.httpRaw = new HttpClient(handler);
  }
}

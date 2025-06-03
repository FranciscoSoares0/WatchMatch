export interface ShowsResponse {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
}

export interface Show {
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  vote_average: number;
}
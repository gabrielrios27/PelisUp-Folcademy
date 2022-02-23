export interface MoviesSeries {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  category: string;
}

export interface MoviesSeriesActors {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  original_language: OriginalLanguage;
  original_title?: string;
  poster_path: string;
  title?: string;
  overview: string;
  release_date?: Date;
  id: number;
  vote_count: number;
  adult?: boolean;
  backdrop_path: string;
  vote_average: number;
  genre_ids: number[];
  video?: boolean;
  popularity: number;
  media_type: MediaType;
  name?: string;
  original_name?: string;
  origin_country?: string[];
  first_air_date?: Date;
}

export enum MediaType {
  Movie = 'movie',
  Tv = 'tv',
  Person = 'person',
}

export enum OriginalLanguage {
  En = 'en',
  Ja = 'ja',
}

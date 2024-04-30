export type FilmDetail = {
  uid: number;
  properties: FilmProperties;
};

type FilmProperties = {
  characters: url[];
  created: Date;
  director: string;
  edited: Date;
  episode_id: number;
  opening_crawl: string;
  planets: url[];
  producer: string;
  release_date: Date;
  species: url[];
  starships: url[];
  title: string;
  url: url;
  vehicles: url[];
};

type url = string;

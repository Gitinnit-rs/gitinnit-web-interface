export interface Music {
  id: string;
  name: string;
  release_date: string;
  tags: string[];
  genre: string[];
  like_count: number;
  music_url: string;
  cover_url: string;
  artist_id: string;

  artists: Artist[];
}

export interface Artist {
  name: string;
  id: string;
}

export interface Music {
  id: string;
  name: string;
  release_date: string;
  like_count: number;
  file: string;
  owner_id: string;
  artists: Artist[];
}

export interface Artist {
  name: string;
  id: string;
}

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

export interface Album {
    id: string;
    name: string;
    desc: string;
    release_date: string;
    cover_url: string;
    artist_id: string;
}

export interface Artist {
    id: string;
    name: string;
    username: string;
}

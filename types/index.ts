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

    music?: Music[];
}

export interface Artist {
    id: string;
    name: string;
    username: string;
}

export interface Post {
    id: string;
    likes_count: number;
    comment_count: number;
    type: string;
    tags: string[];
    caption: string;
    artist_id: number;
    image_url: any;
    release_date: any;
    media?: Media;
}

export interface Media {
    id: string;
    name: string;
    release_date: string;
    music_url: string;
    artist_id: number;
    tags: any;
    genre: any;
    cover_url: any;
    artists: any[];
}

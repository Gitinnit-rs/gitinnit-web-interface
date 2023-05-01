export type MusicMetaData = {
  name: string;
  artist_id: string;
};

export type Music = {
  musicFile: File;
  meta: MusicMetaData;
  artists: string[];
};

export type MusicMapping = {
  artist_id: string;
  music_id: string;
};

export type AlbumMetaData = {
  name: string;
  desc: string | null;
  cover?: string;
  owner_artist: string;
};

export type Album = {
  coverImage: File;
  album: AlbumMetaData;
};

export type AlbumMapping = {
  music_id: string;
  album_id: string;
};

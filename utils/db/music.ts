import axios from "axios";
import dotenv from "dotenv";
import { Music, Album } from "./types";
dotenv.config();

const BASE_URL = process.env.BASE_URL + "/music" ?? "";

export const uploadMusic = async (music: Music) => {
  const obj = await axios.post(`${BASE_URL}/`, music);
  return obj;
};

// searchQuery: id=4asd45sad
export const getMusic = async (searchQuery: string) => {
  const obj = await axios.get(`${BASE_URL}?${searchQuery}`);
  return obj;
};

export const getMusicByName = async (name: string) => {
  const obj = await axios.get(`${BASE_URL}/name/${name}`);
  return obj;
};

export const createAlbum = async (album: Album) => {
  const obj = await axios.post(`${BASE_URL}/album/`, album);
  return obj;
};

export const getAlbum = async (searchQuery: string) => {
  const obj = await axios.get(`${BASE_URL}/album?${searchQuery}`);
  return obj;
};

export const getAlbumByName = async (name: string) => {
  const obj = await axios.get(`${BASE_URL}/album/name/${name}`);
  return obj;
};

export const addMusicToAlbum = async (
  userId: string,
  albumId: string,
  musics: string[],
) => {
  const obj = await axios.post(`${BASE_URL}/mapping/`, {
    userId,
    albumId,
    musics,
  });
  return obj;
};

export const removeMusicFromAlbum = async (
  userId: string,
  albumId: string,
  musics: string[],
) => {
  const obj = await axios.post(`${BASE_URL}/delete_mapping/`, {
    userId,
    albumId,
    musics,
  });
  return obj;
};

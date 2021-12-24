import SpotifyWebApi from "spotify-web-api-node";
import { URLSearchParams } from "url";
const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-private",
  "user-read-email",
  "user-follow-modify",
  "user-follow-read",
  "user-library-modify",
  "user-library-read",
  "streaming",
  "app-remote-control",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-read-private",
  "playlist-modify-public",
].join(",");

const params = {
  scope: scopes,
};
const querParams = new URLSearchParams(params).toString();

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${querParams}`;
const spotifyWebApi = new SpotifyWebApi({
  clientId: `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`,
  clientSecret: `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`,
});

export default spotifyWebApi;

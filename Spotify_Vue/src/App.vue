<template>
  <div id="app">
    <h1>Buscar artista en Spotify</h1>
    <form @submit.prevent="submit">
      <label for="name">Nombre del artista:</label>
      <input id="name" type="text" v-model="name" required />
      <button type="submit">Buscar</button>
    </form>
    <article v-if="artist.name">
      <p><strong>Nombre:</strong> {{artist.name}}</p>
      <p><strong>Álbum:</strong> {{album.name}}</p>
      <img :src="albumUrl" alt="Album image" />
      <div v-for="song in songs" :key="song.id">
        <p>{{song.name}}</p>
        <audio controls>
          <source :src="song.preview_url" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </article>
  </div>
</template>

<script>
const urls = {
  artists: "https://api.spotify.com/v1/search?type=artist",
  token: "https://accounts.spotify.com/api/token",
  albums: (artistId) => `https://api.spotify.com/v1/artists/${artistId}/albums`,
  album: (albumId) => `https://api.spotify.com/v1/albums/${albumId}`,
};

const clientId = "f9dcaf7741d7456fadb358d5622d4b10";
const clientSecret = "bf9108b14a1145c391cd178112016210";
const encodedData = btoa(`${clientId}:${clientSecret}`);

async function fetchWithToken(url, token, method = "GET") {
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const request = await fetch(url, options);
  return request.json();
}

async function getAccessToken() {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedData}`,
      },
      body: "grant_type=client_credentials",
    };
    const request = await fetch(urls.token, options);
    const response = await request.json();
    return response.access_token;
  } catch (e) {
    console.error("Error", e.message);
  }
}

async function getArtist(name, token) {
  const url = `${urls.artists}&q=${name}`;
  return fetchWithToken(url, token);
}

async function getAlbums(artistId, token) {
  const url = urls.albums(artistId);
  return fetchWithToken(url, token);
}

async function getAlbum(albumId, token) {
  const url = urls.album(albumId);
  return fetchWithToken(url, token);
}

export default {
  data() {
    return {
      name: "",
      artist: {},
      album: {},
      albumUrl: "",
      songs: [],
    };
  },
  methods: {
    async submit() {
      try {
        this.reset();

        const accessToken = await getAccessToken();

        let response = await getArtist(this.name, accessToken);
        const artistId = response.artists.items[0].id;
        this.artist = response.artists.items[0];

        response = await getAlbums(artistId, accessToken);
        const albumId = response.items[0].id;

        response = await getAlbum(albumId, accessToken);
        this.album = response;

        this.albumUrl = response.images[0].url;
        this.songs = response.tracks.items;

        this.resetName();
      } catch (e) {
        console.error("Error", e.message);
      }
    },
    reset() {
      this.artist = {};
      this.album = {};
      this.albumUrl = "";
      this.songs = [];
    },
    resetName() {
      this.name = "";
    },
  },
};
</script>

<style>
  h1 {
    text-align: center;
    margin: 0;
    font-size: 2rem;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

label {
    font-weight: bold;
    margin-bottom: 10px;
}

input[type="text"] {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    max-width: 300px;
}

button[type="submit"] {
    background-color: #1DB954;
    border: none;
    color: #000;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 25px;
    padding: 12px 24px;
    margin-top: 10px;
}

button[type="submit"]:hover {
    background-color: #1DB954;
    color: rgba(50, 47, 47, 0.7);
}

article {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

img {
    max-width: 300px;
    margin-top: 20px;
}

div {
    margin-top: 10px;
}

audio::-webkit-media-controls-play-button,
audio::-webkit-media-controls-pause-button {
    color: #1DB954;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 5px;
    cursor: pointer;
}

audio::-webkit-media-controls-panel {
    background-color: #1DB954;
    border-radius: 5px;
    padding: 5px;
}
</style>
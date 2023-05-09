 // Url's.
      const artistsUrl = "https://api.spotify.com/v1/search?type=artist";
      const tokenUrl = "https://accounts.spotify.com/api/token";
      const albumsUrl = "https://api.spotify.com/v1/artists/artistId/albums";
      const UniqueAlbumUrl = "https://api.spotify.com/v1/albums/albumId";

      // Keys.
      const clientId = "f9dcaf7741d7456fadb358d5622d4b10";
      const clientSecret = "bf9108b14a1145c391cd178112016210";
      const encodedData = btoa(`${clientId}:${clientSecret}`);

      // App.
      const app = new Vue({
        el: "#app",
        data: {
          name: "",
          artist: {},
          album: {},
          albumUrl: "",
          songs: [],
        },
        methods: {
          submit: async function () {
            try {
              //Reset
              this.artist = {};
              this.album = {};
              this.albumUrl = "";
              this.songs = [];

              // Get access token.
              const accessToken = await this.getAccessToken();

              // Set URL.
              const tempArtistsUrl = `${artistsUrl}&q=${this.name}`;

              // Options.
              const options = {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              };

              // Get list of artists, save autor ID and info.
              let request = await fetch(tempArtistsUrl, options);
              let response = await request.json();
              const artistId = response.artists.items[0].id;
              this.artist = response.artists.items[0];

              // Get artist albums and save ID.
              const tempAlbumsUrl = albumsUrl.replace("artistId", artistId);
              request = await fetch(tempAlbumsUrl, options);
              response = await request.json();
              const albumId = response.items[0].id;

              // Get first album and save its info.
              const tempUniqueAlbumUrl = UniqueAlbumUrl.replace(
                "albumId",
                albumId
              );
              request = await fetch(tempUniqueAlbumUrl, options);
              response = await request.json();
              this.album = response;
              console.log(response);

              // Save album URL.
              this.albumUrl = response.images[0].url;

              // Save songs.
              this.songs = response.tracks.items;

              // Reset.
              this.name = "";
            } catch (e) {
              console.error("Error", e.message);
            }
          },
          getAccessToken: async function () {
            try {
              // Options.
              const options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: `Basic ${encodedData}`,
                },
                body: "grant_type=client_credentials",
              };

              // Request.
              const request = await fetch(tokenUrl, options);
              const response = await request.json();

              // Token.
              const accessToken = response.access_token;

              return accessToken;
            } catch (e) {
              console.error("Error", e.message);
            }
          },
        },
      });
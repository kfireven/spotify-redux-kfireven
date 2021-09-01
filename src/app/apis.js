export function searchByNameAPI (name, type) {
    return fetch('https://api.spotify.com/v1/search?q=' + name + '&type=' + type, {
      method: 'get',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer BQBv2EqurdDTVN3YWY62tsbWx1v9Ay9DcYhg3bxii_PAK5XBW4ocrV1YEEhPEF53uELd7t2jquewC_V9ycZQZwlkpP632Z2WNQLqbB2fee-ieetFrrnjGlDve6gIwIymZkrJQSZ4KRQWcQnTzXQVD3K4Aw"
      }
    })
      .then((response) => {
          return response.json().then((data) => {
              console.log(data);
              // return data[Object.keys(data)[0]].items;
          }).catch((err) => {
              console.log(err);
          }) 
      });
  };

  export function requestSpotifyAuthorizationAPI () {
    fetch('https://accounts.spotify.com/authorize?client_id=4c900a6717634513b184f1982b6a7565&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsearch');
  };
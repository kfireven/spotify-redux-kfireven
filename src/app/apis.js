const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

var token = hash.access_token;

if (!token) {
  // window.location = 'https://accounts.spotify.com/authorize?client_id=4c900a6717634513b184f1982b6a7565&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsearch';

  window.location = 'https://accounts.spotify.com/authorize?client_id=4c900a6717634513b184f1982b6a7565&response_type=token&redirect_uri=https%3A%2F%2Fkfireven.github.io%2Fsearch';
}

export function searchByNameAPI (name, resultsOffset) {
  console.log();
    return fetch('https://api.spotify.com/v1/search?q=' + name + '&type=track&limit=15&offset=' + resultsOffset, {
      method: 'get',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    })
      .then((response) => {
          return response.json().then((data) => {
              console.log(data);
              return data[Object.keys(data)[0]].items;
          }).catch((err) => {
              console.log(err);
          }) 
      });
  };
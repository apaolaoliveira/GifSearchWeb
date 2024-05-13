import { API_KEY } from './api-key.js';

export class GiphyService {
  constructor(root) {
    this.root = document.querySelector(root);
  }

  searchGif(query) {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12`;
    
    return fetch(endpoint)
     .then(response => response.json())
     .then(({ data }) => ({
      gifTitle: data[0].title,
      gifImageUrl: data[0].images[0].original,
      altText: data[0].images[0].alt_text,
      gifUrl: data[0].url,
      userAvatarUrl: data[0].user[0].avatar_url,
      username: data[0].user[0].username,
      userProfileUrl: data[0].user[0].profile_url
    }));
  }

  trendingGifs(){
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12`;
    
    return fetch(endpoint)
     .then(response => response.json())
     .then(data => console.log(data));
  }
}
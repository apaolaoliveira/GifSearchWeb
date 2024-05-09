import { API_KEY } from './api-key.js';

export class GiphyService {
  constructor(root) {
    this.root = document.querySelector(root);
  }

  searchGif(query) {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12`;
    
    return fetch(endpoint)
     .then(response => response.json())
     .then(data => console.log(data));
  }

  trendingGifs(){
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12`;
    
    return fetch(endpoint)
     .then(response => response.json())
     .then(data => console.log(data));
  }
}
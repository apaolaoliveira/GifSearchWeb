import { API_KEY } from '../../../config.js';

export class Giphy {
  API_URL = 'https://api.giphy.com/v1';
  params = `api_key=${API_KEY}&offset=0&rating=g&limit=12`;

  searchGiphys(gifsOrStickers, query) {
    const endpoint = `${this.API_URL}/${gifsOrStickers}/search?${this.params}&q=${query}`;    
    return this.fetch(endpoint);
  }

  trendingGiphys(gifsOrStickers){
    const endpoint = `${this.API_URL}/${gifsOrStickers}/trending?${this.params}`;    
    return this.fetch(endpoint);
  }

  fetch(endpoint) {
    return fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      return data.data.map(element => ({
        id: element.id,
        title: element.title,
        img: element.images.original.url,
        url: element.url,
        userProfileUrl: element.user?.profile_url || null,
        userAvatarImg: element.user?.avatar_url || null,
        username: element.user?.username || null,
        isFavorite: false,
      }));
    });
  }
}
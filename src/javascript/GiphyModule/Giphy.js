import { API_KEY } from './api-key.js';

export class Giphy {
   searchGifs(query){
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12`;    
    return this.fetch(endpoint);
  }

   searchStickers(query) {
    const endpoint = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${query}&limit=12`;    
    return this.fetch(endpoint);
  }

   gifsTrending(){
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12`;    
    return this.fetch(endpoint);
  }

   stickersTrending(){
    const endpoint = `https://api.giphy.com/v1/stickers/trending?api_key=${API_KEY}&limit=12`;    
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
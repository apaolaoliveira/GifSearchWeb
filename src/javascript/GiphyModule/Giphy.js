import { API_KEY } from './api-key.js';

export class Giphy {
   searchGifs(query){
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12`;    
    return this.fetchGif(endpoint);
  }

   searchStickers(query) {
    const endpoint = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${query}&limit=12`;    
    return this.fetchStickers(endpoint);
  }

   gifsTrending(){
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12`;    
    return this.fetchGif(endpoint);
  }

   stickersTrending(){
    const endpoint = `https://api.giphy.com/v1/stickers/trending?api_key=${API_KEY}&limit=12`;    
    return this.fetchStickers(endpoint);
  }

   fetchGif(endpoint) {
    return fetch(endpoint)
     .then(response => response.json())
     .then(data => {
       return data.data.map(gif => ({
          elementTitle: gif.title,
          elementImg: gif.images.original.url,
          elementImgAlt: gif.alt_text,
          elementUrl: gif.url,
          userProfileUrl: gif.user?.profile_url || null,
          userAvatarImg: gif.user?.avatar_url || null,
          username: gif.user?.username || null,
        }));
      });
  }

   fetchStickers(endpoint) {
    return fetch(endpoint)
     .then(response => response.json())
     .then(data => {
       return data.data.map(sticker => ({
          elementTitle: sticker.title,
          elementImg: sticker.images.original.url,
          elementUrl: sticker.url,
          userProfileUrl: sticker.user?.profile_url || null,
          userAvatarImg: sticker.user?.avatar_url || null,
          username: sticker.user?.username || null,
        }));
      });
  }
}
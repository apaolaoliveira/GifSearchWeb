import { API_KEY } from './api-key.js';

export class Giphy {
  static searchGifs(query){
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12`;    
    return this.fetchGif(endpoint);
  }

  static searchStickers(query) {
    const endpoint = `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${query}&limit=12`;    
    return this.fetchStickers(endpoint);
  }

  static gifsTrending(){
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12`;    
    return this.fetchGif(endpoint);
  }

  static stickersTrending(){
    const endpoint = `https://api.giphy.com/v1/stickers/trending?api_key=${API_KEY}&limit=12`;    
    return this.fetchStickers(endpoint);
  }

  static fetchGif(endpoint) {
    return fetch(endpoint)
     .then(response => response.json())
     .then(data => {
       return data.data.map(gif => ({
          gifTitle: gif.title,
          gifImg: gif.images.original.url,
          gifImgAlt: gif.alt_text,
          gifUrl: gif.url,
          userProfileUrl: gif.user?.profile_url || null,
          userAvatarImg: gif.user?.avatar_url || null,
          username: gif.user?.username || null,
        }));
      });
  }

  static fetchStickers(endpoint) {
    return fetch(endpoint)
     .then(response => response.json())
     .then(data => {
       return data.data.map(sticker => ({
          stickerTitle: sticker.title,
          stickerImg: sticker.images.original.url,
          stickerUrl: sticker.url,
          userProfileUrl: sticker.user?.profile_url || null,
          userAvatarImg: sticker.user?.avatar_url || null,
          username: sticker.user?.username || null,
        }));
      });
  }
}
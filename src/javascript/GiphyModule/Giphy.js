import { API_KEY } from './api-key.js';

export class Giphy {
  static search(query){
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12`;
    
    return fetch(endpoint)
     .then(response => response.json())
     .then(data => {
       return data.data.map(gif => ({
          gifTitle: gif.title,
          gifImg: gif.images.original.url,
          gifImgAlt: gif.images.original.url,
          gifUrl: gif.url,
          userProfileUrl: gif.user?.profile_url || null,
          userAvatarImg: gif.user?.avatar_url || null,
          username: gif.user?.username || null,
        }));
      });  
  }

  static getTrending(){
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12`;
    
    return fetch(endpoint)
     .then(response => response.json())
     .then(data => console.log(data));
  }
}
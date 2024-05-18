import { Giphy } from './Giphy.js';

export class GiphyService {
  constructor(root) {
    this.root = document.querySelector(root);
  }

  async displayGifs(query){
    try {
      const gifs = await Giphy.searchGifs(query);
      this.updateDisplay(gifs);
    } catch (err) {
      console.log(err.message);
    }
  }
}
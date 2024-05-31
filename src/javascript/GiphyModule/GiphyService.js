import { Giphy } from './Giphy.js';

export class GiphyService {
  constructor(root) {
    this.root = document.querySelector(root);
    this.giphy = new Giphy();
    this.loadFromLocalStorage();
  }

  async displayData(dataType, gifsOrStickers, query = ''){
    try {
      let data;
      if(dataType == 'search') data = await this.giphy.searchGiphys(gifsOrStickers, query);
      else data = await this.giphy.trendingGiphys(gifsOrStickers);

      this.updateDisplay(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  loadFromLocalStorage(){
    this.favorites = JSON.parse(localStorage.getItem('@giphys-favorites:')) || [];
  }

  saveOnLocalStorage(){
    localStorage.setItem('@giphys-favorites:', JSON.stringify(this.favorites));
  }

  addToFavorites(element){
    this.favorites = [element, ...this.favorites];
    this.saveOnLocalStorage();
  }

  removeFromFavorites(element){
    this.favorites = this.favorites.filter(favorite => favorite.id !== element.id);
    this.saveOnLocalStorage();
  }

  findFavoritesFromLocalStorage(card){
    const favoriteCard = this.favorites.filter(favorite => favorite.id === card.id);
    if(favoriteCard.length > 0) return true;
    return false;
  }
}
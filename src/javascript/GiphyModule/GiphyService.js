import { Giphy } from './Giphy.js';

export class GiphyService {
  constructor(root) {
    this.root = document.querySelector(root);
    this.giphy = new Giphy();
    this.loadFromLocalStorage();
  }

  async displayData(dataType, query = ''){
    try {
      const data = await this.giphy[dataType](query);
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
}
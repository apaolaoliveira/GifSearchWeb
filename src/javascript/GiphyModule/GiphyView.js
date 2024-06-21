import { GiphyCard } from './GiphyCard.js';
import { GiphyService } from './GiphyService.js'; 

export class GiphyView extends GiphyService {
  constructor(root){
    super(root); 
    this.giphyWrapper = this.root.querySelector('.giphy-wrapper');
    this.searchWrapper = this.root.querySelector('.search-wrapper');
    this.searchInput = this.root.querySelector('#search-input');
    this.searchBtn = this.root.querySelector('#search-btn');

    this.trendingBtn = this.root.querySelector('#trending-btn');
    this.gifsBtn = this.root.querySelector('#gifs-btn');
    this.stickersBtn = this.root.querySelector('#stickers-btn');
    this.favoritesBtn = this.root.querySelector('#favorites-btn');
    this.noFavoritesYetMessage = this.root.querySelector('#no-favorites-yet');

    this.selectedType = 'gifs';
    this.selectedActionBtn = 'trending';
    this.animationDelay = 0;
    this.onClick();  
    this.giphyCard = new GiphyCard();
  }

  onClick(){
    this.searchBtn.onclick = () => this.handleSearchBtnClick();
    this.trendingBtn.onclick = () => this.handleTrendingBtnClick();
    this.gifsBtn.onclick = () => this.handleGifsBtnClick();    
    this.stickersBtn.onclick = () => this.handleStickersBtnClick();
    this.favoritesBtn.onclick = () => this.handleFavoritesBtnClick();
  }

  handleTrendingBtnClick(){
    this.selectedActionBtn = 'trending';
    this.handleActivatedBtn();
    this.displayData(this.selectedActionBtn, this.selectedType); 
    this.updateMessageDisplay();
  }

  handleSearchBtnClick(){
    this.selectedActionBtn = 'search';
    this.handleActivatedBtn();
    this.displayData(this.selectedActionBtn, this.selectedType, this.searchInput.value);
    this.updateMessageDisplay();
  }

  handleFavoritesBtnClick() {
    this.selectedActionBtn = 'favorites';
    this.handleActivatedBtn();
    this.updateDisplay(this.favorites);
    this.updateMessageDisplay();
  }

  handleGifsBtnClick(){
    this.selectedType = 'gifs';
    this.handleActivatedBtn();
    this.selectedActionBtn == 'trending'? 
      this.handleTrendingBtnClick() : this.handleSearchBtnClick(); 
  }

  handleStickersBtnClick() {
    this.selectedType = 'stickers';
    this.handleActivatedBtn();
    this.selectedActionBtn == 'trending'? 
      this.handleTrendingBtnClick() : this.handleSearchBtnClick(); 
  }

  handleActivatedBtn() {
    const btnsList = {
      gifs: this.gifsBtn,
      stickers: this.stickersBtn,
      trending: this.trendingBtn,
      search: this.searchWrapper,
      favorites: this.favoritesBtn
    };
  
    Object.values(btnsList).forEach(btn => btn.classList.remove('activated'));
  
    btnsList[this.selectedActionBtn].classList.add('activated');
    btnsList[this.selectedType].classList.add('activated');
  }

  updateDisplay(list){
    this.resetCards();
    list.forEach(currentItem => {
      const card = this.giphyCard.generateCard();
      this.giphyCard.updateCardElements(card, currentItem);
      this.giphyWrapper.appendChild(card);
    });
  }

  updateMessageDisplay(){
    if(this.noFavorites() && this.favoritesBtn.classList.contains("activated")){
      this.noFavoritesYetMessage.style.display = 'block';
      return;
    }
    this.noFavoritesYetMessage.style.display = 'none';
  }

  resetCards(){
    this.giphyWrapper.innerHTML = '';
    this.animationDelay = 0;
  }
}
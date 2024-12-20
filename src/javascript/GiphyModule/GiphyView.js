import { GiphyCard } from './GiphyCard.js';
import { GiphyService } from './GiphyService.js'; 

export class GiphyView extends GiphyService {
  constructor(root){
    super(root); 
    this.toggleWrapper = this.root.querySelector('.toggle-wrapper');
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
    this.searchBtn.onclick = () => this.handleTrendingAndSearchBtnClick('search');
    this.trendingBtn.onclick = () => this.handleTrendingAndSearchBtnClick('trending');
    this.gifsBtn.onclick = () => this.handleGifsBtnClick();    
    this.stickersBtn.onclick = () => this.handleStickersBtnClick();
    this.favoritesBtn.onclick = () => this.handleFavoritesBtnClick();
  }

  handleTrendingAndSearchBtnClick(searchOrTrending){
    this.selectedActionBtn = searchOrTrending;
    this.displayData(
      this.selectedActionBtn, 
      this.selectedType, 
      this.searchInput.value
    );
    this.handleActivatedBtn();
    this.updateMessageDisplay();
    this.isBtnsDisabled(false);
    if(this.selectedActionBtn != 'search') this.searchInput.value = '';
  }

  handleFavoritesBtnClick() {
    this.selectedActionBtn = 'favorites';
    this.handleActivatedBtn();
    this.updateDisplay(this.favorites);
    this.updateMessageDisplay();
    this.isBtnsDisabled(true);
    if(this.selectedActionBtn != 'search') this.searchInput.value = '';
  }

  handleGifsBtnClick(){
    this.selectedType = 'gifs';
    this.handleActivatedBtn();
    this.handleTrendingAndSearchBtnClick(this.selectedActionBtn);
  }

  handleStickersBtnClick() {
    this.selectedType = 'stickers';
    this.handleActivatedBtn();
    this.handleTrendingAndSearchBtnClick(this.selectedActionBtn);
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

  isBtnsDisabled(isDisabled){
    isDisabled? this.toggleWrapper.classList.add('disabled')
    : this.toggleWrapper.classList.remove('disabled');
    this.gifsBtn.disabled = isDisabled;
    this.stickersBtn.disabled = isDisabled;
  }
}
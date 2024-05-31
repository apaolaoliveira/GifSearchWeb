import { GiphyService } from './GiphyService.js'; 

export class GiphyView extends GiphyService {
  constructor(root){
    super(root); 
    this.wrapper = this.root.querySelector('.gif-wrapper');
    this.searchBtn = this.root.querySelector('#search-btn');
    this.trendingBtn = this.root.querySelector('#trending-btn');
    this.gifsBtn = this.root.querySelector('#gifs-btn');
    this.stickersBtn = this.root.querySelector('#stickers-btn');
    this.favoritesBtn = this.root.querySelector('#favorites-btn');

    this.isGifOrSticker = 'gifs';
    this.isSearchOrTrending = 'trending';
    this.animationDelay = 0;
    this.onClick();  
  }

  onClick(){
    this.searchBtn.onclick = () => this.handleSearchBtnClick();
    this.trendingBtn.onclick = () => this.handleTrendingBtnClick();
    this.gifsBtn.onclick = () => this.handleGifsBtnClick();    
    this.stickersBtn.onclick = () => this.handleStickersBtnClick();
    this.favoritesBtn.onclick = () => this.handleFavoritesBtnClick();
  }

  handleTrendingBtnClick(){
    this.isSearchOrTrending = 'trending';
    this.displayData(this.isSearchOrTrending, this.isGifOrSticker); 
    this.toggleActivation(this.trendingBtn, this.favoritesBtn);
  }

  handleSearchBtnClick(){
    this.isSearchOrTrending = 'search';
    const { value } = this.root.querySelector('#search-input');
    this.displayData(this.isSearchOrTrending, this.isGifOrSticker, value);
    this.trendingBtn.classList.remove('activated');
    this.favoritesBtn.classList.remove('activated');
  }

  handleGifsBtnClick(){
    this.isGifOrSticker = 'gifs';
    this.toggleActivation(this.gifsBtn, this.stickersBtn);
    this.isSearchOrTrending == 'trending'? 
      this.handleTrendingBtnClick() : this.handleSearchBtnClick(); 
  }

  handleStickersBtnClick() {
    this.isGifOrSticker = 'stickers';
    this.toggleActivation(this.stickersBtn, this.gifsBtn);
    this.isSearchOrTrending == 'trending'? 
      this.handleTrendingBtnClick() : this.handleSearchBtnClick(); 
  }

  handleFavoritesBtnClick() {
    this.updateDisplay(this.favorites);
    this.toggleActivation(this.favoritesBtn, this.trendingBtn);
  }

  toggleActivation(activeElement, inactiveElement){
    activeElement.classList.add('activated');
    inactiveElement.classList.remove('activated');
  }

  updateDisplay(list){
    this.resetCards();
    list.forEach(currentItem => {
      const card = this.generateCard();
      this.updateCardElements(card, currentItem);
      this.wrapper.appendChild(card);
    });
  }

  updateCardElements(card, currentItem) {
    const favoriteBtnFromCard = card.querySelector('#favorite-card-btn i');

    if(this.findFavoritesFromLocalStorage(currentItem)) {
      favoriteBtnFromCard.classList.add('fa-solid');
      favoriteBtnFromCard.classList.remove('fa-regular');
    }

    const selectorsMap = {
      title: '#title',
      img: '#elementImg',
      url: '#elementUrl',
      userProfileUrl: '#userLink',
      userAvatarImg: '#avatar',
      username: '#username',
    }

    this.updateCardContent(card, selectorsMap, currentItem);
    
    favoriteBtnFromCard.onclick = (event) => 
      this.toggleFavorite(event.currentTarget, currentItem);
  
    card.classList.add('animation');
    card.style.animationDelay = `${this.animationDelay}s`;
    this.animationDelay += .4;
  }

  updateCardContent(card, selectorsMap, currentItem){
    Object.entries(selectorsMap).forEach(([key, selector]) => {
      const element = card.querySelector(selector);

      switch (key) {
        case 'img':
          element.src = currentItem[key];
          break;       
        case 'url':
        case 'userProfileUrl':
          element.href = currentItem[key] || '#';
          break;
        case 'userAvatarImg':
          element.src = currentItem[key] || this.randomMockUserImg();
          break;
        case 'username':	
          element.textContent = currentItem[key] || 'unknown';
          break;
        default:
          element.textContent = currentItem[key];
          break;
      }
    });
  } 

  toggleFavorite(element, card){
    const classes = element.classList;
    classes.toggle('fa-solid');
    classes.toggle('fa-regular');

    card.isFavorite = !card.isFavorite;
    if(card.isFavorite) this.addToFavorites(card);
    else this.removeFromFavorites(card);
  }

  generateCard(){
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('gif-card');
    cardDiv.innerHTML =
    `<div class="gif-info">
       <div class="actions-wrapper">
          <button type="button" id="favorite-card-btn" class="isFavorite">
            <i class="fa-regular fa-star"></i>
          </button>
          <a title="Gif link" id="elementUrl" href="" target="_blank">
           <i class="fa-solid fa-link"></i>
          </a>
       </div>
       <div class="img-wrapper">
         <img id="elementImg" src="" alt="">
         <p id="title"></p>
       </div>
     </div>
     
     <div class="user-info">
       <a title="User link" id="userLink" href="" target="_blank">
         <img id="avatar" src="" alt="">
         <span id="username"></span>
       </a>
     </div>`;

    return cardDiv;
  }

  resetCards(){
    this.wrapper.innerHTML = '';
    this.animationDelay = 0;
  }

  randomMockUserImg(){
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    return `src/assets/userNotFound/mockUser${randomNumber}.jpg`;
  }
}
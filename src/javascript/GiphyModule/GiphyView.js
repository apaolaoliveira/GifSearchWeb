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

  updateMessageDisplay(){
    if(this.noFavorites() && this.favoritesBtn.classList.contains("activated")){
      this.noFavoritesYetMessage.style.display = 'block';
      return;
    }
    this.noFavoritesYetMessage.style.display = 'none';
  }

  updateDisplay(list){
    this.resetCards();
    list.forEach(currentItem => {
      const card = this.generateCard();
      this.updateCardElements(card, currentItem);
      this.giphyWrapper.appendChild(card);
    });
  }

  updateCardElements(card, currentItem) {
    const favoriteBtnFromCard = card.querySelector('#favorite-card-btn i');

    if(this.isFavoriteFromLocalStorage(currentItem)) 
      this.updateFavoriteIcon(favoriteBtnFromCard);

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
    this.updateFavoriteIcon(element);
    card.isFavorite = !card.isFavorite;

    if(card.isFavorite) this.addToFavorites(card);
    else this.removeFromFavorites(card);
  }

  updateFavoriteIcon(element){
    const classes = element.classList;
    classes.toggle('fa-solid');
    classes.toggle('fa-regular');
  }

  generateCard(){
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('giphy-card');
    cardDiv.innerHTML =
    `<div class="giphy-info">
       <div class="actions-wrapper">
          <button type="button" id="favorite-card-btn" class="isFavorite">
            <i class="fa-regular fa-star"></i>
          </button>
          <a title="Giphy link" id="elementUrl" href="" target="_blank">
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
    this.giphyWrapper.innerHTML = '';
    this.animationDelay = 0;
  }

  randomMockUserImg(){
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    return `src/assets/userNotFound/mockUser${randomNumber}.jpg`;
  }
}
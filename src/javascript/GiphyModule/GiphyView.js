import { GiphyService } from './GiphyService.js'; 

export class GiphyView extends GiphyService {
  constructor(root){
    super(root); 
    this.wrapper = this.root.querySelector('.gif-wrapper');
    this.searchBtn = this.root.querySelector('#search-btn');
    this.gifsBtn = this.root.querySelector('#gifs-btn');
    this.stickersBtn = this.root.querySelector('#stickers-btn');
    this.trendingBtn = this.root.querySelector('#trending-btn');

    this.activeBtn = 'gifs';
    this.isSearchOrTrending = 'trending';
    this.animationDelay = 0;
    this.onClick();  
  }

  onClick(){
    this.trendingBtn.onclick = () => {
      this.isSearchOrTrending = 'trending';
      if(this.activeBtn == 'gifs') this.displayData('gifsTrending'); 
      if(this.activeBtn =='stickers') this.displayData('stickersTrending');
      this.trendingBtn.classList.add('activated');
    }

    this.searchBtn.onclick = () => {
      const { value } = this.root.querySelector('#search-input');
      if(this.activeBtn == 'gifs') this.displayData('searchGifs', value);
      if(this.activeBtn == 'stickers') this.displayData('searchStickers', value);
      this.isSearchOrTrending = 'search';
      this.trendingBtn.classList.remove('activated');
    }

    this.gifsBtn.onclick = () => {
      this.toggleActive();
      this.activeBtn = 'gifs';
      if(this.isSearchOrTrending == 'trending') this.displayData('gifsTrending'); 
    }
    
    this.stickersBtn.onclick = () => {
      this.toggleActive();
      this.activeBtn ='stickers';
      if(this.isSearchOrTrending == 'trending') this.displayData('stickersTrending'); 
    }
  }

  toggleActive(){
    this.gifsBtn.classList.toggle('activated');
    this.stickersBtn.classList.toggle('activated');
  }

  updateDisplay(list){
    this.removeAllCards();

    list.forEach(currentElement => {
      const card = this.generateCard();

      const selectorsMap = {
        elementTitle: '#title',
        elementImg: '#elementImg',
        elementImgAlt: '#elementImg',
        elementUrl: '#elementUrl',
        userProfileUrl: '#userLink',
        userAvatarImg: '#avatar',
        username: '#username',
      }

      Object.entries(selectorsMap).forEach(([key, selector]) => {
        const element = card.querySelector(selector);

        switch (key) {
          case 'elementImg':
            element.src = currentElement[key];
            break;          
          case 'elementImgAlt':
            element.alt = currentElement[key];
            break;
          case 'elementUrl':
          case 'userProfileUrl':
            element.href = currentElement[key] || '#';
            break;
          case 'userAvatarImg':
            element.src = currentElement[key] || this.randomMockUserImg();
            break;
          case 'username':	
            element.textContent = currentElement[key] || 'unknown';
            break;
          default:
            element.textContent = currentElement[key];
            break;
        }
      });

      card.classList.add('animation');
      card.style.animationDelay = `${this.animationDelay}s`;
      this.animationDelay += .4;

      this.wrapper.appendChild(card);
    });
  }

  generateCard(){
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('gif-card');
    cardDiv.innerHTML =
    `<div class="gif-info">
       <div class="actions-wrapper">
          <button type="button" id="favorite-btn" class="isFavorite">
            <i class="fa-regular fa-heart"></i>
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

  removeAllCards(){
    this.wrapper.innerHTML = '';
  }

  randomMockUserImg(){
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    return `src/assets/userNotFound/mockUser${randomNumber}.jpg`;
  }
}
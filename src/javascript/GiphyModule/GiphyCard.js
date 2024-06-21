import { GiphyService } from "./GiphyService.js";

export class GiphyCard extends GiphyService {
  constructor(root){
    super(root)
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

  randomMockUserImg(){
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    return `src/assets/userNotFound/mockUser${randomNumber}.jpg`;
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
}
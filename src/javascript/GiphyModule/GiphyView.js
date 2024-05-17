import { GiphyService } from './GiphyService.js'; 

export class GiphyView extends GiphyService {
  constructor(root){
    super(root);  
    this.wrapper = this.root.querySelector('.gif-wrapper');
    this.onSearchClick();  
    // this.trendingGifs(); 
  }

  onSearchClick(){
    this.root.querySelector('#search-btn').onclick = () => {
      const { value } = this.root.querySelector('#search-input');
      this.displayGifs(value);
    }
  }

  updateDisplay(gifs){
    this.removeAllCards();

    gifs.forEach(gif => {
      const card = this.generateCard();

      const selectorsMap = {
        gifTitle: '#title',
        gifImg: '#gifImg',
        gifImgAlt: '#gifImg',
        gifUrl: '#gifLink',
        userProfileUrl: '#userLink',
        userAvatarImg: '#avatar',
        username: '#username',
      }

      Object.entries(selectorsMap).forEach(([key, selector]) => {
        const element = card.querySelector(selector);

        if (element) {
          switch (key) {
            case 'gifImg':
            case 'userAvatarImg':
              element.src = gif[key];
              break;
            case 'gifImgAlt':
              element.alt = gif[key];
              break;
            case 'gifUrl':
            case 'userProfileUrl':
              element.href = gif[key];
              break;
            default:
              element.textContent = gif[key];
              break;
          }
        }
      });

      this.wrapper.appendChild(card);
    });
  }

  generateCard(){
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('gif-card');
    cardDiv.innerHTML =
    `<div class="gif-info">
       <a title="Gif link" id="gifLink" href="" target="_blank">
         <i class="fa-solid fa-link"></i>
       </a>
       <div class="img-wrapper">
         <img id="gifImg" src="" alt="">
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
}
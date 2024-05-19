import { GiphyService } from './GiphyService.js'; 

export class GiphyView extends GiphyService {
  constructor(root){
    super(root); 
    this.wrapper = this.root.querySelector('.gif-wrapper');
    this.onSearchClick();  
  }

  onSearchClick(){
    this.root.querySelector('#search-btn').onclick = () => {
      const { value } = this.root.querySelector('#search-input');
      this.displayData('searchGifs', value);
    }
  }

  updateDisplay(list){
    this.removeAllCards();

    list.forEach(index => {
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

        if (element) {
          switch (key) {
            case 'elementImg':
            case 'userAvatarImg':
              element.src = index[key];
              break;
            case 'elementImgAlt':
              element.alt = index[key];
              break;
            case 'elementUrl':
            case 'userProfileUrl':
              element.href = index[key];
              break;
            default:
              element.textContent = index[key];
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
       <a title="Gif link" id="elementUrl" href="" target="_blank">
         <i class="fa-solid fa-link"></i>
       </a>
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
}
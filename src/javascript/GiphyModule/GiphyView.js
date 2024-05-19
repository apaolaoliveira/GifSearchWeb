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

  randomMockUserImg(){
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    return `src/assets/userNotFound/mockUser${randomNumber}.jpg`;
  }
}
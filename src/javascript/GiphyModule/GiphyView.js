import { GiphyService } from './GiphyService.js'; 

export class GiphyView extends GiphyService {
  constructor(root){
    super(root);  
    this.onSearchClick();  
    // this.trendingGifs(); 
  }

  onSearchClick(){
    this.root.querySelector('#search-btn').onclick = () => {
      const { value } = this.root.querySelector('#search-input');
      this.searchGif(value);
    }
  }

  updateCards(){
    this.removeAllCards();
  }

  generateCard(){
    const wrapper = this.root.querySelector('.gif-wrapper');
    const cardDiv = document.createElement('div').classList.add('gif-card');

    const card = 
    `<div class="gif-info">
       <a title="Gif link" id="gifLink" href="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXZxcGNsamtwcG90eGhyaWR3Zm5waGlxb2UyYWZscnJnb2Vwd3h1aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MeIucAjPKoA120R7sN/giphy.gif" target="_blank">
         <i class="fa-solid fa-link"></i>
       </a>
       <div class="img-wrapper">
         <img id="gifImg" src="https://media1.giphy.com/media/MeIucAjPKoA120R7sN/giphy.gif" alt="">
         <p id="title">Happy Cheering GIF</p>
       </div>
     </div>
     
     <div class="user-info">
       <a title="User link" id="userLink" href="https://giphy.com/bluesbear/" target="_blank">
         <img id="avatar" src="https://media4.giphy.com/avatars/bluesbear/h2D5VMcO6KLj.png" alt="">
         <span id="username">bluesbear</spa>
       </a>
     </div>`

    cardDiv.innerHTML = card;
    wrapper.appendChild(cardDiv);
  }

  removeAllCards(){
    this.root.querySelector('.gif-wrapper').innerHTML = '';
  }
}
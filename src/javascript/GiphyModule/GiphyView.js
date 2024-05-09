import { GiphyService } from './GiphyService.js'; 

export class GiphyView extends GiphyService {
  constructor(root){
    super(root);  
    this.onSearchClick();  
    this.trendingGifs(); 
  }

  onSearchClick(){
    this.root.querySelector('#search-btn').onclick = () => {
      const { value } = this.root.querySelector('#search-input');
      this.search(value);
    }
  }
}
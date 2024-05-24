import { Giphy } from './Giphy.js';

export class GiphyService {
  constructor(root) {
    this.root = document.querySelector(root);
    this.giphy = new Giphy();
  }

  async displayData(dataType, query = ''){
    try {
      const data = await this.giphy[dataType](query);
      this.updateDisplay(data);
    } catch (err) {
      console.log(err.message);
    }
  }
}
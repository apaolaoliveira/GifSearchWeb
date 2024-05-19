import { Giphy } from './Giphy.js';

export class GiphyService {
  constructor(root) {
    this.root = document.querySelector(root);
  }

  async displayData(dataType, query = ''){
    try {
      const data = await Giphy[dataType](query);
      this.updateDisplay(data);
    } catch (err) {
      console.log(err.message);
    }
  }
}
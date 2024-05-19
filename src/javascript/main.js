import { GiphyView } from "./GiphyModule/GiphyView.js";

window.addEventListener('DOMContentLoaded', () => {
  const view = new GiphyView('.app');
  view.displayData('gifsTrending');
});
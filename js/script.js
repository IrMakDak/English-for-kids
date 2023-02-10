import mainPageLayout from './pages/pagesLayout/mainPageLayout';
import showPage from './pages/showPage';
import createHeader from './pages/pagesLayout/headerCreater';
import { firstCheckTheme } from './pages/toggleTheme';
import { flipCardByClick } from './pages/cardsCreators/categoryCardCreate';
import { clickPlayBtn } from './pages/categoryPage/startPlay';
import createLocalStorage from './pages/statisticsPage/createLocalStorage';

function start() {
  createHeader();
  mainPageLayout();
  showPage('sections');

  clickPlayBtn();

  firstCheckTheme();
  flipCardByClick();
}
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('statistic')) {
    createLocalStorage()
      .then(() => {
        start();
      });
  } else {
    start();
  }
});

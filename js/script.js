import mainPageLayout from './pages/pagesLayout/mainPageLayout';
import showPage from './pages/showPages/showPage';
import createHeader from './pages/showPages/headerCreater';
import checkTheme from './pages/showPages/toggleTheme';
import { flipCardByClick } from './pages/cardsCreators/categoryCardCreate';
import { clickPlayBtn } from './pages/showPages/playMode';
import createLocalStorage from './pages/statistics/createLocalStorage';

function showMainPage() {
  createHeader();
  mainPageLayout();
  showPage('sections');

  clickPlayBtn();

  checkTheme();
  flipCardByClick();
}
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('statistic')) {
    createLocalStorage();
    showMainPage();
  } else {
    showMainPage();
  }
});

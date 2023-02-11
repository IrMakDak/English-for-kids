import Card from './cardsCreators/sectionsCardsCreater';
import cleanForNewGame, {
  showBlockOnPlay, hideBlockOnPlay, changeTextOnBtn, cleanPage, hidePlayBtn,
} from './DOMFunctions';
import createStatisticsPageLayout from './statisticsPage/statisticCreater';
import { closeMenu } from './pagesLayout/headerLayout';
import { loadCategoryCards } from './cardsCreators/categoryCardCreate';

function shortName(name) {
  return name.toLowerCase().replaceAll(' ', '');
}

function showPage(category) {
  closeMenu();
  cleanPage();
  cleanForNewGame();
  changeTextOnBtn('PLAY');

  const myCategory = shortName(category);
  localStorage.setItem('page', myCategory);

  const resourse = JSON.parse(localStorage.getItem('statistic'));
  if (myCategory === 'sections') {
    hideBlockOnPlay();
    resourse.sections.forEach(({ src, title }) => {
      const cardsNum = resourse[shortName(title)].length;
      new Card(src, title, shortName(title), cardsNum).render();
    });
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        showPage(card.getAttribute('id'));
      });
    });
  } else if (myCategory === 'statistic') {
    hideBlockOnPlay();
    createStatisticsPageLayout();
    hidePlayBtn();
  } else {
    showBlockOnPlay();
    loadCategoryCards(resourse[myCategory]);
  }
}

export default showPage;
export { hidePlayBtn, shortName, cleanPage };

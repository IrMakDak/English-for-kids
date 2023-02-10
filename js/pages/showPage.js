import Card from './cardsCreators/sectionsCardsCreater';
import CategoryCard from './cardsCreators/categoryCardCreate';
import cleanForNewGame, { showBlockOnPlay, hideBlockOnPlay, changeTextOnBtn } from './categoryPage/DOMFunctions';
import createStatisticsPageLayout from './statisticsPage/statisticCreater';
import { returnEightErrorsOrLess } from './statisticsPage/statisticFilter';
import { closeMenu } from './pagesLayout/headerLayout';
import { reloadPageAfterReset } from './statisticsPage/createLocalStorage';

function shortName(name) {
  return name.toLowerCase().replaceAll(' ', '');
}

function hidePlayBtn() {
  document.querySelector('.btn').classList.add('hide');
}
function cleanPage() {
  const album = document.querySelector('.album');
  const cardParent = album.querySelector('.row');
  const table = document.querySelector('table');
  const btnPlay = document.querySelector('.btn');

  if (btnPlay.classList.contains('hide')) {
    btnPlay.classList.remove('hide');
  }
  if (table) {
    table.remove();
  }
  while (cardParent.firstChild) {
    cardParent.removeChild(cardParent.firstChild);
  }
}
function loadCategoryCards(arr) {
  arr.forEach(({
    src, title, translate, audio, key,
  }) => {
    new CategoryCard(src, title, translate, audio, key).render();
  });
}
function zeroErrorsPage() {
  hidePlayBtn();
  const error = document.createElement('div');
  error.classList.add('zero-error');

  error.textContent = "You don't have any error cards yet";

  document.querySelector('.album').querySelector('.row').append(error);
}
function difficultPageCreate() {
  const errors = returnEightErrorsOrLess();
  if (errors.length !== 0) {
    loadCategoryCards(errors);
  } else {
    zeroErrorsPage();
  }
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
  } else if (myCategory === 'difficult') {
    showBlockOnPlay();
    difficultPageCreate();
  } else if (myCategory === 'statistic') {
    hideBlockOnPlay();
    createStatisticsPageLayout();
    hidePlayBtn();
    const resetBtn = document.querySelector('.reset-btn');
    const diffBtn = document.querySelector('.diff-btn');
    if (resetBtn && diffBtn) {
      resetBtn.addEventListener('click', () => {
        reloadPageAfterReset();
      });
      diffBtn.addEventListener('click', () => {
        showPage('Difficult');
      });
    }
  } else {
    showBlockOnPlay();
    loadCategoryCards(resourse[myCategory]);
  }
}

export default showPage;
export { hidePlayBtn, shortName, cleanPage };

import statisticFilter, { returnEightErrorsOrLess } from './statisticFilter';
import thLayout, { createLiForLegend } from '../pagesLayout/statisticLayout';
import { resetStatistic } from './createLocalStorage';
import cleanForNewGame, {
  showBlockOnPlay, zeroErrorsPage, cleanPage, changeTextOnBtn,
} from '../DOMFunctions';
import { loadCategoryCards } from '../cardsCreators/categoryCardCreate';

function clickTh(heading, inner) {
  const ascending = heading.querySelector('.ascending');
  const descending = heading.querySelector('.descending');

  ascending.addEventListener('click', () => {
    statisticFilter(inner, true);
  });
  descending.addEventListener('click', () => {
    statisticFilter(inner, false);
  });
}
function createThLayout(parent, inner) {
  const heading = thLayout(parent, inner);
  clickTh(heading, inner);
}
function createTh() {
  const container = document.querySelector('.album').querySelector('.container');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(table);

  const myRow = document.createElement('tr');
  const ths = ['Sr.No.', 'Category', 'Word', 'Translation', 'trainClick', 'playClick', 'errors', 'percent'];
  ths.forEach((th) => {
    createThLayout(myRow, th);
  });
  thead.appendChild(myRow);
}

function createLegend(container) {
  const legend = document.createElement('div');
  const legendTitle = document.createElement('h4');
  const containerLegend = document.createElement('div');
  const div = document.createElement('div');

  legend.classList.add('statistic-group');
  legendTitle.classList.add('legend-title');
  containerLegend.classList.add('container-legend');

  legendTitle.textContent = 'LEGEND';

  container.append(legend);
  legend.append(div);
  div.append(legendTitle);
  div.append(containerLegend);

  const statistic = JSON.parse(localStorage.getItem('statistic'));
  const keys = Object.keys(statistic);
  keys.forEach((key) => {
    if (key !== 'sections') {
      createLiForLegend(key, containerLegend);
    }
  });
}
function difficultPageCreate() {
  localStorage.setItem('page', 'difficult');
  const errors = returnEightErrorsOrLess();
  cleanPage();
  cleanForNewGame();
  changeTextOnBtn('PLAY');
  if (errors.length !== 0) {
    showBlockOnPlay();
    loadCategoryCards(errors);
  } else {
    zeroErrorsPage();
  }
}
function createStatisticBtn() {
  const container = document.querySelector('.statistic-group');
  const btnGroup = document.createElement('div');
  const resetBtn = document.createElement('button');
  const diffBtn = document.createElement('button');

  resetBtn.textContent = 'RESET statistic';
  diffBtn.textContent = 'TRAIN difficult';

  resetBtn.classList.add('reset-btn');
  diffBtn.classList.add('diff-btn');
  btnGroup.classList.add('btn-group');

  container.append(btnGroup);
  btnGroup.append(resetBtn);
  btnGroup.append(diffBtn);

  if (resetBtn && diffBtn) {
    resetBtn.addEventListener('click', () => {
      resetStatistic();
      statisticFilter('Sr.No.', true);
    });
    diffBtn.addEventListener('click', () => {
      difficultPageCreate();
    });
  }
}

function closeDropdownContent(e) {
  if (!e.target.classList.contains('dropbtn')) {
    const myDropdowns = document.querySelectorAll('.dropdown-content');
    myDropdowns.forEach((i) => {
      if (!i.classList.contains('hide')) {
        i.classList.add('hide');
      }
    });
  }
  if (e.target.classList.contains('dropbtn')) {
    const allContents = document.querySelectorAll('.dropdown-content');
    const content = e.target.parentElement.querySelector('.dropdown-content');

    allContents.forEach((i) => {
      if (!i.classList.contains('hide') && content !== i) {
        i.classList.add('hide');
      } else if (content === i) {
        content.classList.toggle('hide');
      }
    });
  }
}

function createStatisticsPageLayout() {
  const container = document.querySelector('.album').querySelector('.container');

  if (!container.querySelector('.statistic-group')) {
    createLegend(container);
    createStatisticBtn();
  }

  if (!document.querySelector('table')) {
    createTh();
    statisticFilter('Sr.No.', true);

    window.addEventListener('click', closeDropdownContent);
  } else {
    document.querySelector('table').remove();
    createStatisticsPageLayout();
    window.removeEventListener('click', closeDropdownContent);
  }
}

export default createStatisticsPageLayout;
export { difficultPageCreate };

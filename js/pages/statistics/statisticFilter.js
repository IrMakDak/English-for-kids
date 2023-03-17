import { createRow } from '../pagesLayout/statisticLayout';
import { sections } from './cards';

function cleanTBody() {
  const tbody = document.querySelector('tbody');
  while (tbody.firstChild) {
    tbody.firstChild.remove();
  }
}

function updateStatisticContent(num, category, word, translation, trainClick, playClick, errors) {
  const tbody = document.querySelector('tbody');
  let percent = Math.floor((errors / playClick) * 100);
  if (!percent) {
    percent = 0;
  }
  const row = document.createElement('tr');
  createRow(row, num);
  createRow(row, (category.charAt(0).toUpperCase() + category.slice(1)));
  createRow(row, word);
  createRow(row, translation);
  createRow(row, trainClick, 'train-column');
  createRow(row, playClick, 'play-column');
  createRow(row, errors, 'errors-column');
  createRow(row, percent, 'percent-column');
  tbody.appendChild(row);
}

function returnAllWords() {
  const cards = JSON.parse(localStorage.getItem('statistic'));

  const arr = [];
  sections.forEach((section) => {
    cards[section].forEach((currentItem) => {
      arr.push(currentItem);
    });
  });
  return (arr);
}

function tableSort(arr, filter) {
  arr.sort((item, nextItem) => {
    let itemNew;
    let nextItemNew;
    if (filter === 'percent') {
      itemNew = Math.floor((item.errors / item.playClick) * 100);
      nextItemNew = Math.floor((nextItem.errors / nextItem.playClick) * 100);
      if (!itemNew) {
        itemNew = 0;
      }
      if (!nextItemNew) {
        nextItemNew = 0;
      }
    } else {
      itemNew = item[filter];
      nextItemNew = nextItem[filter];
    }
    if (itemNew > nextItemNew) {
      return 1;
    }
    return -1;
  });
  return arr;
}
function createStatisticsBySection(orderOfSections) {
  let num = 1;

  const newData = JSON.parse(localStorage.getItem('statistic'));
  orderOfSections.forEach((section) => {
    newData[section].forEach(({
      title, translate, trainClick, playClick, errors, key,
    }) => {
      updateStatisticContent(num, key, title, translate, trainClick, playClick, errors);
      num += 1;
    });
  });
}

function createStatisticsByWord(arr) {
  let num = 1;

  arr.forEach(({
    title, translate, trainClick, playClick, errors, key,
  }) => {
    updateStatisticContent(num, key, title, translate, trainClick, playClick, errors);
    num += 1;
  });
}
function sortAllWords(title, reverse) {
  if (reverse) {
    createStatisticsByWord(tableSort(returnAllWords(), title));
  } else {
    createStatisticsByWord(tableSort(returnAllWords(), title).reverse());
  }
}
function statisticFilter(filter, reverse) {
  cleanTBody();

  switch (filter) {
    case 'Category':
      if (reverse) {
        createStatisticsBySection(sections.sort());
      } else {
        createStatisticsBySection(sections.sort().reverse());
      }
      break;
    case 'Sr.No.':
      if (reverse) {
        createStatisticsBySection(sections);
      } else {
        createStatisticsBySection(sections.reverse());
      }
      break;
    case 'Word':
      sortAllWords('title', reverse);
      break;
    case 'Translation':
      sortAllWords('translate', reverse);
      break;
    case 'trainClick':
      sortAllWords('trainClick', reverse);
      break;
    case 'playClick':
      sortAllWords('playClick', reverse);
      break;
    case 'errors':
      sortAllWords('errors', reverse);
      break;
    case 'percent':
      sortAllWords('percent', reverse);
      break;
    default:
      break;
  }
}

function returnEightErrorsOrLess() {
  let arrOfErrors = tableSort(returnAllWords(), 'errors');

  arrOfErrors = arrOfErrors.filter((item) => item.errors !== 0).reverse();
  if (arrOfErrors.length >= 8) {
    arrOfErrors = arrOfErrors.slice(0, 8);
  } else {
    arrOfErrors = arrOfErrors.slice(0, arrOfErrors.length);
  }

  return arrOfErrors;
}

export default statisticFilter;
export { returnEightErrorsOrLess, returnAllWords, updateStatisticContent };

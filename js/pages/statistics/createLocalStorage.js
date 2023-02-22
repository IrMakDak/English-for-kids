import cardsDB, { sections } from './cards';

function searchInLocalStorage(func) {
  const newData = JSON.parse(localStorage.getItem('statistic'));
  sections.forEach((section) => {
    newData[section].forEach((currentSection) => func(currentSection));
  });
  localStorage.setItem('statistic', JSON.stringify(newData));
}
function addKey() {
  const newData = JSON.parse(localStorage.getItem('statistic'));
  sections.forEach((section) => {
    newData[section].forEach((currentSection) => {
      // eslint-disable-next-line no-param-reassign
      currentSection.key = section;
    });
  });
  localStorage.setItem('statistic', JSON.stringify(newData));
}
function editStatistics(title, typeOfClick, val) {
  searchInLocalStorage((currentItem) => {
    if (currentItem.title === title) {
      // eslint-disable-next-line no-param-reassign
      currentItem[typeOfClick] += val;
    }
  });
}
function resetStatistic() {
  searchInLocalStorage((currentItem) => {
    if (currentItem) {
      // eslint-disable-next-line no-param-reassign
      currentItem.trainClick = 0;
      // eslint-disable-next-line no-param-reassign
      currentItem.playClick = 0;
      // eslint-disable-next-line no-param-reassign
      currentItem.errors = 0;
    }
  });
}
const createLocalStorage = () => {
  localStorage.setItem('statistic', JSON.stringify(cardsDB));
  resetStatistic();
  addKey();
};

export default createLocalStorage;
export { editStatistics, resetStatistic };

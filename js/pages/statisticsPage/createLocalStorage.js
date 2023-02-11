import getResource from '../../services/getResource';
// import createStatisticsPageLayout from './statisticCreater';

function searchInLocalStorage(func) {
  const newData = JSON.parse(localStorage.getItem('statistic'));
  const sections = Object.keys(newData);
  sections.forEach((section) => {
    if (section !== 'sections') {
      newData[section].forEach((i) => func(i));
    }
  });
  localStorage.setItem('statistic', JSON.stringify(newData));
}
function addKey() {
  const newData = JSON.parse(localStorage.getItem('statistic'));
  const sections = Object.keys(newData);
  sections.forEach((section) => {
    if (section !== 'sections') {
      newData[section].forEach((i) => {
        // eslint-disable-next-line no-param-reassign
        i.key = section;
      });
    }
  });
  localStorage.setItem('statistic', JSON.stringify(newData));
}
function editStatistics(title, typeOfClick, val) {
  searchInLocalStorage((i) => {
    if (i.title === title) {
      // eslint-disable-next-line no-param-reassign
      i[typeOfClick] += val;
    }
  });
}
function resetStatistic() {
  searchInLocalStorage((i) => {
    if (i) {
      // eslint-disable-next-line no-param-reassign
      i.trainClick = 0;
      // eslint-disable-next-line no-param-reassign
      i.playClick = 0;
      // eslint-disable-next-line no-param-reassign
      i.errors = 0;
    }
  });
}
const createLocalStorage = async () => {
  await getResource()
    .then((data) => {
      localStorage.setItem('statistic', JSON.stringify(data));
      resetStatistic();
      addKey();
    });
};

export default createLocalStorage;
export { editStatistics, resetStatistic };

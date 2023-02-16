import showPage from './showPage';
import createHeaderLayout from '../pagesLayout/headerLayout';

class LiCreate {
  constructor(title, container) {
    this.title = title;
    this.container = container;
  }

  render() {
    const li = document.createElement('li');
    li.classList.add('li-header');
    li.innerHTML = `
            <span class="change-section-header">${this.title}</span>
        `;
    this.container.append(li);
    const span = li.querySelector('span');
    span.addEventListener('click', () => {
      showPage(this.title);
    });
  }
}

function createHeader() {
  createHeaderLayout();

  const btnMain = document.querySelector('.main-page');
  const btnStatistic = document.querySelector('.statistic-page');
  const container = document.querySelector('.header-container');

  btnMain.addEventListener('click', () => {
    showPage('sections');
  });
  btnStatistic.addEventListener('click', () => {
    showPage('statistic');
  });

  const resourse = JSON.parse(localStorage.getItem('statistic'));
  resourse.sections.forEach((i) => {
    new LiCreate(i.title, container).render();
  });
}

export default createHeader;

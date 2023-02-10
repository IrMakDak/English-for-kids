import showPage from '../showPage';
import createHeaderLayout from './headerLayout';

class LiCreate {
  constructor(title) {
    this.title = title;
  }

  render() {
    const container = document.querySelector('.header-container');
    const li = document.createElement('li');
    li.classList.add('li-header');
    li.innerHTML = `
            <span class="change-section-header">${this.title}</span>
        `;
    container.append(li);
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

  btnMain.addEventListener('click', () => {
    showPage('sections');
  });
  btnStatistic.addEventListener('click', () => {
    showPage('statistic');
  });

  const resourse = JSON.parse(localStorage.getItem('statistic'));
  resourse.sections.forEach((i) => {
    new LiCreate(i.title).render();
  });
}

export default createHeader;

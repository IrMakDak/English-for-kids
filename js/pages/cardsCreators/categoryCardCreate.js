import { editStatistics } from '../statisticsPage/createLocalStorage';

function turnOverCard(parentOfCard) {
  const cleanCards = document.querySelectorAll('.rotate180');
  const cleanInv = document.querySelectorAll('.rotate360');

  if (cleanCards) {
    cleanCards.forEach((i) => {
      i.classList.remove('rotate180');
    });
  }
  if (cleanInv) {
    cleanInv.forEach((i) => {
      i.classList.remove('rotate360');
    });
  }

  const card = parentOfCard.querySelector('.card');
  const cardInverted = parentOfCard.querySelector('.card-inverted');

  card.classList.add('rotate180');
  cardInverted.classList.add('rotate360');

  cardInverted.addEventListener('mouseout', () => {
    card.classList.remove('rotate180');
    cardInverted.classList.remove('rotate360');
  });
}

class CategoryCard {
  constructor(src, title, translate, audio, key) {
    this.src = src;
    this.alt = `${title.replaceAll(' ', '')}-img`;
    this.title = title;
    this.translate = translate;
    this.audio = audio;
    this.parent = document.querySelector('.album').querySelector('.row');
    this.id = title.toLowerCase().replaceAll(' ', '');
    this.key = key;
  }

  render() {
    const col = document.createElement('div');
    col.classList.add('col');

    if (localStorage.getItem('theme') === 'train') {
      col.innerHTML = `
                <div class="card card__front">
                    <img src=${this.src} alt=${this.alt} class="album-img">
                    <div class="cards-numbers">
                        <p class="card-text">${this.title}</p>
                        <img src="./assets/icons/turnOverCard.png" alt="turn over" class="translate-icon">
                    </div>
                </div>
                <div class="card-inverted card__back">
                    <div class="translate">${this.translate}</div>
                </div>
            `;
      col.querySelector('.card').addEventListener('click', (e) => {
        editStatistics(this.title, 'trainClick', 1);
        if (e.target !== col.querySelector('.translate-icon')) {
          new Audio(`${this.audio}`).play();
        } else {
          turnOverCard(col);
        }
      });
    }
    if (localStorage.getItem('theme') === 'play') {
      col.innerHTML = `
                <div class="card" id=${this.id}>
                    <img src=${this.src} alt=${this.alt} class="album-img">
                </div>
            `;
    }
    this.parent.append(col);
  }
}

function flipCardByClick() {
  document.querySelector('main').addEventListener('click', (e) => {
    const cardsInverted = document.querySelectorAll('.card-inverted');

    cardsInverted.forEach((i) => {
      if (i.classList.contains('rotate360') && !e.target.classList.contains('translate-icon')) {
        const card = i.parentElement.firstElementChild;
        card.classList.remove('rotate180');
        i.classList.remove('rotate360');
      }
    });
  });
}
function loadCategoryCards(arr) {
  arr.forEach(({
    src, title, translate, audio, key,
  }) => {
    new CategoryCard(src, title, translate, audio, key).render();
  });
}
export default CategoryCard;
export { flipCardByClick, loadCategoryCards };

import cleanForNewGame, {
  showTextUnderPlayBtn, showBlockOnPlay, changeTextOnBtn, hideBlockOnPlay,
} from './DOMFunctions';

import createArray, {
  getCurrentCard, setCurrentCard, getCardsOrder, setCardsOrder, repeatAudio,
} from './cardsOrder';

import showPage, {
  shortName, hidePlayBtn, cleanPage,
} from '../showPage';

import { editStatistics } from '../statisticsPage/createLocalStorage';
import { returnAllWords } from '../statisticsPage/statisticFilter';

function showResult() {
  const blockedLayer = document.querySelector('.play-block');
  const result = document.createElement('img');
  result.setAttribute('alt', 'result');
  result.classList.add('result-img');
  cleanPage();
  hidePlayBtn();

  if (blockedLayer.querySelector('.result-img')) {
    blockedLayer.querySelector('.result-img').remove();
  }

  if (document.querySelector('.heart-bad')) {
    result.setAttribute('src', './assets/icons/result-sad.jpg');
    showTextUnderPlayBtn(`You lose. Number of mistakes = ${document.querySelectorAll('.heart-bad').length}`);
    new Audio('./assets/audio/loseGame.mp3').play();
  } else {
    result.setAttribute('src', './assets/icons/win.jpg');
    showTextUnderPlayBtn("You won! You didn't make a single mistake");
    new Audio('./assets/audio/winGame.mp3').play();
  }

  blockedLayer.prepend(result);
}
function finishGame() {
  showBlockOnPlay();
  showResult();
  document.querySelector('.navbar').style = 'pointer-events: none;';
  setTimeout(() => {
    showPage('sections');
    document.querySelector('.navbar').style = '';
  }, 3000);
}

function addHeart(type) {
  const parent = document.querySelector('.hearts-container');
  if (parent) {
    const heart = document.createElement('img');

    heart.setAttribute('alt', 'heart');

    if (type === 'GOOD') {
      heart.setAttribute('src', './assets/icons/heart.png');
      heart.classList.add('heart-img', 'heart-good');
    }
    if (type === 'BAD') {
      heart.setAttribute('src', './assets/icons/heart-bad.png');
      heart.classList.add('heart-img', 'heart-bad');
    }
    parent.append(heart);

    if (parent.querySelectorAll('.heart-img').length > 7) {
      let f = 0;
      const arr = parent.querySelectorAll('.heart-img');
      arr.forEach((singleHeart) => {
        if (!singleHeart.classList.contains('hide') && f === 0) {
          singleHeart.classList.add('hide');
          f += 1;
        }
      });
    }
  } else {
    const header = document.querySelector('.header-main');

    const divParent = document.createElement('div');
    divParent.classList.add('hearts-container');

    header.append(divParent);
    addHeart(type);
  }
}

function setNextCardAsActive() {
  const resourse = JSON.parse(localStorage.getItem('statistic'));
  const currentPage = localStorage.getItem('page');

  const cards = document.querySelectorAll('.card');
  const numOfActiveCard = getCardsOrder()[0];

  const activeCard = cards[numOfActiveCard];
  let currentCardObj;
  let arrForSearch;

  if (currentPage !== 'difficult') {
    arrForSearch = resourse[currentPage];
  } else {
    arrForSearch = returnAllWords();
  }
  arrForSearch.forEach((i) => {
    if (i.title.toLocaleLowerCase().replace(' ', '') === activeCard.id) {
      currentCardObj = i;
    }
  });
  setCurrentCard(currentCardObj);

  new Audio(currentCardObj.audio).play();
}

function blockCardClick(blockCard) {
  document.querySelector(`#${blockCard}`).classList.add('block-card');
}
function checkCorrectCard(e) {
  const blockCard = shortName(getCurrentCard().title);

  if (e.target.getAttribute('id') === blockCard) {
    new Audio('./assets/audio/win.mp3').play();
    editStatistics(getCurrentCard().title, 'playClick', 1);

    getCardsOrder().shift();
    setCardsOrder(getCardsOrder());
    blockCardClick(blockCard);

    if (getCardsOrder().length >= 1) {
      addHeart('GOOD');
      setNextCardAsActive();
    } else {
      addHeart('GOOD');
      finishGame();
    }
  } else {
    addHeart('BAD');
    new Audio('./assets/audio/fail.mp3').play();
    editStatistics(getCurrentCard().title, 'errors', 1);
    editStatistics(getCurrentCard().title, 'playClick', 1);
  }
}
function createListenersForPlay() {
  const allCards = document.querySelectorAll('.card');

  allCards.forEach((card) => {
    card.addEventListener('click', checkCorrectCard);
  });
}

function startPlay() {
  const cards = document.querySelectorAll('.block-card');
  cards.forEach((card) => {
    card.classList.remove('block-card');
  });
  createArray(document.querySelectorAll('.card').length);
  setNextCardAsActive();
  createListenersForPlay();
}

function clickPlayBtn() {
  const btnPlay = document.querySelector('.btn');
  const block = document.querySelector('.play-block');

  btnPlay.addEventListener('click', () => {
    if (!block.classList.contains('hide') && localStorage.getItem('page') !== 'sections' && btnPlay.textContent === 'PLAY') {
      hideBlockOnPlay();
      cleanForNewGame();
      changeTextOnBtn('REPEAT');

      startPlay();
    } else if (block.classList.contains('hide') && localStorage.getItem('page') !== 'sections' && btnPlay.textContent === 'REPEAT') {
      repeatAudio();
    } else if (!document.querySelector('.text-btn') && localStorage.getItem('page') === 'sections') {
      showTextUnderPlayBtn('Choose a topic');
    }
  });
  block.addEventListener('click', () => {
    if (!document.querySelector('.text-btn') && localStorage.getItem('page') !== 'sections') {
      showTextUnderPlayBtn('Click "PLAY" to start');
    }
  });
}

export {
  startPlay, repeatAudio, getCardsOrder, getCurrentCard, setCurrentCard, clickPlayBtn,
};

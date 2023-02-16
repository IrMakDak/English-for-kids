import cleanForNewGame, {
  showTextUnderPlayBtn, showBlockOnPlay, changeTextOnBtn, hideBlockOnPlay,
} from '../DOMFunctions';

import createArray, {
  getCurrentCard, setCurrentCard, getCardsOrder, setCardsOrder, repeatAudio, playAudio,
} from '../cardsCreators/cardsOrder';

import showPage, {
  shortName, hidePlayBtn, cleanPage,
} from './showPage';

import { editStatistics } from '../statistics/createLocalStorage';
import { returnAllWords } from '../statistics/statisticFilter';

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
    playAudio('./assets/audio/loseGame.mp3');
  } else {
    result.setAttribute('src', './assets/icons/win.jpg');
    showTextUnderPlayBtn("You won! You didn't make a single mistake");
    playAudio('./assets/audio/winGame.mp3');
  }

  blockedLayer.prepend(result);
}
function finishGame() {
  showBlockOnPlay();
  showResult();
  const nav = document.querySelector('.navbar');
  nav.classList.add('navbar-disabled');
  setTimeout(() => {
    showPage('sections');
    nav.classList.remove('navbar-disabled');
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
  arrForSearch.forEach((arrayItem) => {
    if (shortName(arrayItem.title) === activeCard.id) {
      currentCardObj = arrayItem;
    }
  });
  setCurrentCard(currentCardObj);
  playAudio(currentCardObj.audio);
}

function blockCardClick(blockCard) {
  document.querySelector(`#${blockCard}`).classList.add('block-card');
}
function checkCorrectCard(e) {
  const blockCard = shortName(getCurrentCard().title);

  if (e.target.getAttribute('id') === blockCard) {
    playAudio('./assets/audio/win.mp3');
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
    playAudio('./assets/audio/fail.mp3');
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
    if (localStorage.getItem('page') !== 'sections') {
      if (!block.classList.contains('hide') && btnPlay.textContent === 'PLAY') {
        hideBlockOnPlay();
        cleanForNewGame();
        changeTextOnBtn('REPEAT');
        startPlay();
      }
      if (btnPlay.textContent === 'REPEAT') {
        repeatAudio();
      }
    }
    if (localStorage.getItem('page') === 'sections') {
      if (!document.querySelector('.text-btn')) {
        showTextUnderPlayBtn('Choose a topic');
      }
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

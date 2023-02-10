/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/cardsCreators/categoryCardCreate.js":
/*!******************************************************!*\
  !*** ./js/pages/cardsCreators/categoryCardCreate.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "flipCardByClick": () => (/* binding */ flipCardByClick)
/* harmony export */ });
/* harmony import */ var _statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../statisticsPage/createLocalStorage */ "./js/pages/statisticsPage/createLocalStorage.js");


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
        (0,_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_0__.editStatistics)(this.title, 'trainClick', 1);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CategoryCard);



/***/ }),

/***/ "./js/pages/cardsCreators/sectionsCardsCreater.js":
/*!********************************************************!*\
  !*** ./js/pages/cardsCreators/sectionsCardsCreater.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Card {
  constructor(src, title, key, cardsNum = 0) {
    this.src = src;
    this.alt = `${key}-img`;
    this.title = title;
    this.key = key;
    this.parent = document.querySelector('.album').querySelector('.row');
    this.cardsNum = cardsNum;
  }

  render() {
    const col = document.createElement('div');
    col.classList.add('col');
    col.innerHTML = `
            <div class="card" id=${this.key}>
                <img src=${this.src} alt=${this.alt} class="album-img">
                    <div class="cards-numbers">
                        <p class="card-text">${this.title}</p>
                        <small class="text-muted">${this.cardsNum} cards</small>
                    </div>
                </div>
            </div>
        `;
    this.parent.append(col);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);


/***/ }),

/***/ "./js/pages/categoryPage/DOMFunctions.js":
/*!***********************************************!*\
  !*** ./js/pages/categoryPage/DOMFunctions.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeTextOnBtn": () => (/* binding */ changeTextOnBtn),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hideBlockOnPlay": () => (/* binding */ hideBlockOnPlay),
/* harmony export */   "showBlockOnPlay": () => (/* binding */ showBlockOnPlay),
/* harmony export */   "showTextUnderPlayBtn": () => (/* binding */ showTextUnderPlayBtn)
/* harmony export */ });
function cleanTextUnderPlayBtn() {
  const text = document.querySelector('.text-btn');
  if (text) {
    text.remove();
  }
}
function changeTextOnBtn(text) {
  const btn = document.querySelector('.btn');
  if (text === 'REPEAT') {
    btn.textContent = 'REPEAT';
  }
  if (text === 'PLAY') {
    btn.textContent = 'PLAY';
  }
}
function cleanForNewGame() {
  if (document.querySelector('.hearts-container')) {
    document.querySelector('.hearts-container').remove();
  }
  if (document.querySelector('.result-img')) {
    document.querySelector('.result-img').remove();
  }
  if (document.querySelector('.statistic-group')) {
    document.querySelector('.statistic-group').remove();
  }
  cleanTextUnderPlayBtn();
}
function hideBlockOnPlay() {
  const block = document.querySelector('.play-block');

  if (!block.classList.contains('hide')) {
    block.classList.add('hide');
  }
}
function showTextUnderPlayBtn(showText) {
  const parent = document.querySelector('.header-main');
  const text = document.createElement('span');

  text.classList.add('text-btn');
  text.textContent = showText;

  parent.append(text);
}
function showBlockOnPlay() {
  if (localStorage.getItem('theme') === 'play') {
    const block = document.querySelector('.play-block');

    if (block.classList.contains('hide')) {
      block.classList.remove('hide');
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cleanForNewGame);



/***/ }),

/***/ "./js/pages/categoryPage/cardsOrder.js":
/*!*********************************************!*\
  !*** ./js/pages/categoryPage/cardsOrder.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getCardsOrder": () => (/* binding */ getCardsOrder),
/* harmony export */   "getCurrentCard": () => (/* binding */ getCurrentCard),
/* harmony export */   "repeatAudio": () => (/* binding */ repeatAudio),
/* harmony export */   "setCardsOrder": () => (/* binding */ setCardsOrder),
/* harmony export */   "setCurrentCard": () => (/* binding */ setCurrentCard)
/* harmony export */ });
let currentCard;
let cardsOrder;

function getCurrentCard() {
  return currentCard;
}
function setCurrentCard(val) {
  currentCard = val;
}
function getCardsOrder() {
  return cardsOrder;
}
function setCardsOrder(val) {
  cardsOrder = val;
}
function createArray(dataLength) {
  const mySet = new Set([]);
  while (mySet.size < dataLength) {
    mySet.add(Math.floor(Math.random() * (dataLength - 0)));
  }
  setCardsOrder(Array.from(mySet));
}
function repeatAudio() {
  if (getCurrentCard()) {
    new Audio(getCurrentCard().audio).play();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createArray);



/***/ }),

/***/ "./js/pages/categoryPage/startPlay.js":
/*!********************************************!*\
  !*** ./js/pages/categoryPage/startPlay.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clickPlayBtn": () => (/* binding */ clickPlayBtn),
/* harmony export */   "getCardsOrder": () => (/* reexport safe */ _cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCardsOrder),
/* harmony export */   "getCurrentCard": () => (/* reexport safe */ _cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCurrentCard),
/* harmony export */   "repeatAudio": () => (/* reexport safe */ _cardsOrder__WEBPACK_IMPORTED_MODULE_1__.repeatAudio),
/* harmony export */   "setCurrentCard": () => (/* reexport safe */ _cardsOrder__WEBPACK_IMPORTED_MODULE_1__.setCurrentCard),
/* harmony export */   "startPlay": () => (/* binding */ startPlay)
/* harmony export */ });
/* harmony import */ var _DOMFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMFunctions */ "./js/pages/categoryPage/DOMFunctions.js");
/* harmony import */ var _cardsOrder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cardsOrder */ "./js/pages/categoryPage/cardsOrder.js");
/* harmony import */ var _showPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../showPage */ "./js/pages/showPage.js");
/* harmony import */ var _statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../statisticsPage/createLocalStorage */ "./js/pages/statisticsPage/createLocalStorage.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../statisticsPage/trainDifficultWords'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());









function showResult() {
  const blockedLayer = document.querySelector('.play-block');
  const result = document.createElement('img');
  result.setAttribute('alt', 'result');
  result.classList.add('result-img');
  (0,_showPage__WEBPACK_IMPORTED_MODULE_2__.cleanPage)();
  (0,_showPage__WEBPACK_IMPORTED_MODULE_2__.hidePlayBtn)();

  if (blockedLayer.querySelector('.result-img')) {
    blockedLayer.querySelector('.result-img').remove();
  }

  if (document.querySelector('.heart-bad')) {
    result.setAttribute('src', './assets/icons/result-sad.jpg');
    (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.showTextUnderPlayBtn)(`You lose. Number of mistakes = ${document.querySelectorAll('.heart-bad').length}`);
    new Audio('./assets/audio/loseGame.mp3').play();
  } else {
    result.setAttribute('src', './assets/icons/win.jpg');
    (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.showTextUnderPlayBtn)("You won! You didn't make a single mistake");
    new Audio('./assets/audio/winGame.mp3').play();
  }

  blockedLayer.prepend(result);
}
function finishGame() {
  (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.showBlockOnPlay)();
  showResult();
  document.querySelector('.navbar').style = 'pointer-events: none;';
  setTimeout(() => {
    (0,_showPage__WEBPACK_IMPORTED_MODULE_2__["default"])('sections');
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
  const numOfActiveCard = (0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCardsOrder)()[0];

  const activeCard = cards[numOfActiveCard];
  let currentCardObj;
  let arrForSearch;

  if (currentPage !== 'difficult') {
    arrForSearch = resourse[currentPage];
  } else {
    arrForSearch = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../statisticsPage/trainDifficultWords'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
  }
  arrForSearch.forEach((i) => {
    if (i.title.toLocaleLowerCase().replace(' ', '') === activeCard.id) {
      currentCardObj = i;
    }
  });
  (0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.setCurrentCard)(currentCardObj);

  new Audio(currentCardObj.audio).play();
}

function blockCardClick(blockCard) {
  document.querySelector(`#${blockCard}`).classList.add('block-card');
}
function checkCorrectCard(e) {
  const blockCard = (0,_showPage__WEBPACK_IMPORTED_MODULE_2__.shortName)((0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCurrentCard)().title);

  if (e.target.getAttribute('id') === blockCard) {
    new Audio('./assets/audio/win.mp3').play();
    (0,_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_3__.editStatistics)((0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCurrentCard)().title, 'playClick', 1);

    (0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCardsOrder)().shift();
    (0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.setCardsOrder)((0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCardsOrder)());
    blockCardClick(blockCard);

    if ((0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCardsOrder)().length >= 1) {
      addHeart('GOOD');
      setNextCardAsActive();
    } else {
      addHeart('GOOD');
      finishGame();
    }
  } else {
    addHeart('BAD');
    new Audio('./assets/audio/fail.mp3').play();
    (0,_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_3__.editStatistics)((0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCurrentCard)().title, 'errors', 1);
    (0,_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_3__.editStatistics)((0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCurrentCard)().title, 'playClick', 1);
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
  (0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__["default"])(document.querySelectorAll('.card').length);
  setNextCardAsActive();
  createListenersForPlay();
}

function clickPlayBtn() {
  const btnPlay = document.querySelector('.btn');
  const block = document.querySelector('.play-block');

  btnPlay.addEventListener('click', () => {
    if (!block.classList.contains('hide') && localStorage.getItem('page') !== 'sections' && btnPlay.textContent === 'PLAY') {
      (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.hideBlockOnPlay)();
      (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__["default"])();
      (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.changeTextOnBtn)('REPEAT');

      startPlay();
    } else if (block.classList.contains('hide') && localStorage.getItem('page') !== 'sections' && btnPlay.textContent === 'REPEAT') {
      (0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.repeatAudio)();
    } else if (!document.querySelector('.text-btn') && localStorage.getItem('page') === 'sections') {
      (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.showTextUnderPlayBtn)('Choose a topic');
    }
  });
  block.addEventListener('click', () => {
    if (!document.querySelector('.text-btn') && localStorage.getItem('page') !== 'sections') {
      (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.showTextUnderPlayBtn)('Click "PLAY" to start');
    }
  });
}




/***/ }),

/***/ "./js/pages/pagesLayout/headerCreater.js":
/*!***********************************************!*\
  !*** ./js/pages/pagesLayout/headerCreater.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _showPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../showPage */ "./js/pages/showPage.js");
/* harmony import */ var _headerLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./headerLayout */ "./js/pages/pagesLayout/headerLayout.js");



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
      (0,_showPage__WEBPACK_IMPORTED_MODULE_0__["default"])(this.title);
    });
  }
}

function createHeader() {
  (0,_headerLayout__WEBPACK_IMPORTED_MODULE_1__["default"])();

  const btnMain = document.querySelector('.main-page');
  const btnStatistic = document.querySelector('.statistic-page');

  btnMain.addEventListener('click', () => {
    (0,_showPage__WEBPACK_IMPORTED_MODULE_0__["default"])('sections');
  });
  btnStatistic.addEventListener('click', () => {
    (0,_showPage__WEBPACK_IMPORTED_MODULE_0__["default"])('statistic');
  });

  const resourse = JSON.parse(localStorage.getItem('statistic'));
  resourse.sections.forEach((i) => {
    new LiCreate(i.title).render();
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createHeader);


/***/ }),

/***/ "./js/pages/pagesLayout/headerLayout.js":
/*!**********************************************!*\
  !*** ./js/pages/pagesLayout/headerLayout.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeMenu": () => (/* binding */ closeMenu),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function openMenu() {
  const menuBtn = document.querySelector('.toggler');
  const menu = document.querySelector('.header-container');
  const backg = document.querySelector('.background-all');

  menuBtn.classList.add('hide');
  backg.classList.remove('hide');

  setTimeout(() => {
    backg.classList.remove('hide-bg');
  }, 200);
  setTimeout(() => {
    menu.classList.remove('hide-menu-left');
  }, 200);

  document.body.style = 'overflow:  hidden;';
}
function closeMenu() {
  const menu = document.querySelector('.header-container');
  if (!menu.classList.contains('hide-menu-left')) {
    menu.classList.add('hide-menu-left');
  }
  const menuBtn = document.querySelector('.toggler');
  if (menuBtn.classList.contains('hide')) {
    menuBtn.classList.remove('hide');
  }
  const backg = document.querySelector('.background-all');
  if (!backg.classList.contains('hide-bg')) {
    backg.classList.add('hide-bg');
    setTimeout(() => {
      backg.classList.add('hide');
    }, 300);
  }
  document.body.style = '';
}

function createHeaderLayout() {
  const header = document.createElement('header');

  header.innerHTML = `
        <div class="header-cont">
            <div class="container header-container hide-menu-left">
                <div class="close">&#10008;</div>
                <div class="header-main-statistic">
                    <h4 class="main-page">Main Page</h4>
                    <h4 class="statistic-page">Statistic</h4>
                </div>
            </div>
        </div>
        <div class="navbar navbar-dark header-color shadow-sm">
            <div class="container">
                <div>
                    <button class="toggler">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            <div class="group-switch">
                <input id="toggle" class="toggle" type="checkbox" role="switch" name="toggle" value="on">
                <label for="toggle" class="slot">
                    <span class="slot__label">TRAIN</span>
                    <span class="slot__label">PLAY</span>
                </label>
            </div>
        </div>
    `;
  document.body.append(header);

  const menuBtn = header.querySelector('.toggler');
  const close = header.querySelector('.close');

  const backg = document.createElement('div');
  backg.classList.add('background-all', 'hide-bg', 'hide');
  document.body.append(backg);

  menuBtn.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  backg.addEventListener('click', closeMenu);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createHeaderLayout);



/***/ }),

/***/ "./js/pages/pagesLayout/mainPageLayout.js":
/*!************************************************!*\
  !*** ./js/pages/pagesLayout/mainPageLayout.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function mainPageLayout() {
  const parentOfMainLayout = document.createElement('div');

  parentOfMainLayout.innerHTML = `
    <main>
        <section class="py-5 text-center container">
            <div class="row py-lg-5 header-main">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">Train & Play</h1>
                </div>
                <div class="btn">PLAY</div>
            </div>
        </section>
        
        <div class="album py-5 bg-album">
        <div class='play-block hide'></div>
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"></div>
            </div>
        </div>
    </main>
    `;

  document.body.append(parentOfMainLayout);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mainPageLayout);


/***/ }),

/***/ "./js/pages/pagesLayout/statisticLayout.js":
/*!*************************************************!*\
  !*** ./js/pages/pagesLayout/statisticLayout.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createLiForLegend": () => (/* binding */ createLiForLegend),
/* harmony export */   "createRow": () => (/* binding */ createRow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function thLayout(parent, inner) {
  const heading = document.createElement('th');
  heading.classList.add('dropdown');

  switch (inner) {
    case 'trainClick':
      heading.classList.add('train-column');
      break;
    case 'playClick':
      heading.classList.add('play-column');
      break;
    case 'errors':
      heading.classList.add('errors-column');
      break;
    case 'percent':
      heading.classList.add('percent-column');
      break;
    default:
      break;
  }
  const text = `
    <button class="dropbtn">${inner}
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content hide">
      <div class="ascending">In ascending order</div>
      <div class="descending">In descending order</div>
    </div>`;
  heading.innerHTML = text;

  parent.appendChild(heading);
  return heading;
}
function addColorClass(block, inner) {
  switch (inner) {
    case 'Food1':
      block.classList.add('category-icon-red');
      break;
    case 'Food2':
      block.classList.add('category-icon-blue');
      break;
    case 'Nature':
      block.classList.add('category-icon-green');
      break;
    case 'Animals1':
      block.classList.add('category-icon-pink');
      break;
    case 'Animals2':
      block.classList.add('category-icon-orange');
      break;
    case 'Birds':
      block.classList.add('category-icon-violet');
      break;
    case 'Products1':
      block.classList.add('category-icon-sky');
      break;
    case 'Products2':
      block.classList.add('category-icon-grey');
      break;
    default:
      break;
  }
}
function createLiForLegend(key, container) {
  const legendItem = document.createElement('li');
  legendItem.classList.add('legend-li');
  legendItem.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  addColorClass(legendItem, legendItem.textContent);

  container.append(legendItem);
}
function createRow(parent, inner, addClass = null) {
  const rowData = document.createElement('td');
  rowData.textContent = inner;
  if (addClass) {
    rowData.classList.add(addClass);
  }
  if (inner === 'Food1' || inner === 'Food2' || inner === 'Nature' || inner === 'Animals1' || inner === 'Animals2' || inner === 'Birds' || inner === 'Products1' || inner === 'Products2') {
    rowData.classList.add('category-icon');
    addColorClass(rowData, inner);
  }
  parent.appendChild(rowData);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (thLayout);



/***/ }),

/***/ "./js/pages/showPage.js":
/*!******************************!*\
  !*** ./js/pages/showPage.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cleanPage": () => (/* binding */ cleanPage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hidePlayBtn": () => (/* binding */ hidePlayBtn),
/* harmony export */   "shortName": () => (/* binding */ shortName)
/* harmony export */ });
/* harmony import */ var _cardsCreators_sectionsCardsCreater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cardsCreators/sectionsCardsCreater */ "./js/pages/cardsCreators/sectionsCardsCreater.js");
/* harmony import */ var _cardsCreators_categoryCardCreate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cardsCreators/categoryCardCreate */ "./js/pages/cardsCreators/categoryCardCreate.js");
/* harmony import */ var _categoryPage_DOMFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./categoryPage/DOMFunctions */ "./js/pages/categoryPage/DOMFunctions.js");
/* harmony import */ var _statisticsPage_statisticCreater__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./statisticsPage/statisticCreater */ "./js/pages/statisticsPage/statisticCreater.js");
/* harmony import */ var _statisticsPage_statisticFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./statisticsPage/statisticFilter */ "./js/pages/statisticsPage/statisticFilter.js");
/* harmony import */ var _pagesLayout_headerLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pagesLayout/headerLayout */ "./js/pages/pagesLayout/headerLayout.js");
/* harmony import */ var _statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./statisticsPage/createLocalStorage */ "./js/pages/statisticsPage/createLocalStorage.js");








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
    new _cardsCreators_categoryCardCreate__WEBPACK_IMPORTED_MODULE_1__["default"](src, title, translate, audio, key).render();
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
  const errors = (0,_statisticsPage_statisticFilter__WEBPACK_IMPORTED_MODULE_4__.returnEightErrorsOrLess)();
  if (errors.length !== 0) {
    loadCategoryCards(errors);
  } else {
    zeroErrorsPage();
  }
}

function showPage(category) {
  (0,_pagesLayout_headerLayout__WEBPACK_IMPORTED_MODULE_5__.closeMenu)();
  cleanPage();
  (0,_categoryPage_DOMFunctions__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_categoryPage_DOMFunctions__WEBPACK_IMPORTED_MODULE_2__.changeTextOnBtn)('PLAY');

  const myCategory = shortName(category);
  localStorage.setItem('page', myCategory);

  const resourse = JSON.parse(localStorage.getItem('statistic'));
  if (myCategory === 'sections') {
    (0,_categoryPage_DOMFunctions__WEBPACK_IMPORTED_MODULE_2__.hideBlockOnPlay)();
    resourse.sections.forEach(({ src, title }) => {
      const cardsNum = resourse[shortName(title)].length;
      new _cardsCreators_sectionsCardsCreater__WEBPACK_IMPORTED_MODULE_0__["default"](src, title, shortName(title), cardsNum).render();
    });
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        showPage(card.getAttribute('id'));
      });
    });
  } else if (myCategory === 'difficult') {
    (0,_categoryPage_DOMFunctions__WEBPACK_IMPORTED_MODULE_2__.showBlockOnPlay)();
    difficultPageCreate();
  } else if (myCategory === 'statistic') {
    (0,_categoryPage_DOMFunctions__WEBPACK_IMPORTED_MODULE_2__.hideBlockOnPlay)();
    (0,_statisticsPage_statisticCreater__WEBPACK_IMPORTED_MODULE_3__["default"])();
    hidePlayBtn();
    const resetBtn = document.querySelector('.reset-btn');
    const diffBtn = document.querySelector('.diff-btn');
    if (resetBtn && diffBtn) {
      resetBtn.addEventListener('click', () => {
        (0,_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_6__.reloadPageAfterReset)();
      });
      diffBtn.addEventListener('click', () => {
        showPage('Difficult');
      });
    }
  } else {
    (0,_categoryPage_DOMFunctions__WEBPACK_IMPORTED_MODULE_2__.showBlockOnPlay)();
    loadCategoryCards(resourse[myCategory]);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showPage);



/***/ }),

/***/ "./js/pages/statisticsPage/createLocalStorage.js":
/*!*******************************************************!*\
  !*** ./js/pages/statisticsPage/createLocalStorage.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "editStatistics": () => (/* binding */ editStatistics),
/* harmony export */   "reloadPageAfterReset": () => (/* binding */ reloadPageAfterReset)
/* harmony export */ });
/* harmony import */ var _services_getResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/getResource */ "./js/services/getResource.js");
/* harmony import */ var _statisticCreater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statisticCreater */ "./js/pages/statisticsPage/statisticCreater.js");



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
  await (0,_services_getResource__WEBPACK_IMPORTED_MODULE_0__["default"])()
    .then((data) => {
      localStorage.setItem('statistic', JSON.stringify(data));
      resetStatistic();
      addKey();
    });
};

function reloadPageAfterReset() {
  resetStatistic();
  document.querySelector('table').remove();
  (0,_statisticCreater__WEBPACK_IMPORTED_MODULE_1__["default"])();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createLocalStorage);



/***/ }),

/***/ "./js/pages/statisticsPage/statisticCreater.js":
/*!*****************************************************!*\
  !*** ./js/pages/statisticsPage/statisticCreater.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _statisticFilter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statisticFilter */ "./js/pages/statisticsPage/statisticFilter.js");
/* harmony import */ var _pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pagesLayout/statisticLayout */ "./js/pages/pagesLayout/statisticLayout.js");



function clickTh(heading, inner) {
  const ascending = heading.querySelector('.ascending');
  const descending = heading.querySelector('.descending');

  ascending.addEventListener('click', () => {
    (0,_statisticFilter__WEBPACK_IMPORTED_MODULE_0__["default"])(inner, true);
  });
  descending.addEventListener('click', () => {
    (0,_statisticFilter__WEBPACK_IMPORTED_MODULE_0__["default"])(inner, false);
  });
}
function createThLayout(parent, inner) {
  const heading = (0,_pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_1__["default"])(parent, inner);
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
      (0,_pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_1__.createLiForLegend)(key, containerLegend);
    }
  });
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
    (0,_statisticFilter__WEBPACK_IMPORTED_MODULE_0__["default"])('Sr.No.', true);

    window.addEventListener('click', closeDropdownContent);
  } else {
    document.querySelector('table').remove();
    createStatisticsPageLayout();
    window.removeEventListener('click', closeDropdownContent);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStatisticsPageLayout);


/***/ }),

/***/ "./js/pages/statisticsPage/statisticFilter.js":
/*!****************************************************!*\
  !*** ./js/pages/statisticsPage/statisticFilter.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "returnAllWords": () => (/* binding */ returnAllWords),
/* harmony export */   "returnEightErrorsOrLess": () => (/* binding */ returnEightErrorsOrLess),
/* harmony export */   "updateStatisticContent": () => (/* binding */ updateStatisticContent)
/* harmony export */ });
/* harmony import */ var _pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pagesLayout/statisticLayout */ "./js/pages/pagesLayout/statisticLayout.js");


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
  (0,_pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_0__.createRow)(row, num);
  (0,_pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_0__.createRow)(row, (category.charAt(0).toUpperCase() + category.slice(1)));
  (0,_pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_0__.createRow)(row, word);
  (0,_pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_0__.createRow)(row, translation);
  (0,_pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_0__.createRow)(row, trainClick, 'train-column');
  (0,_pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_0__.createRow)(row, playClick, 'play-column');
  (0,_pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_0__.createRow)(row, errors, 'errors-column');
  (0,_pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_0__.createRow)(row, percent, 'percent-column');
  tbody.appendChild(row);
}

function returnAllWords() {
  const statistic = JSON.parse(localStorage.getItem('statistic'));
  const keys = Object.keys(statistic);

  const arr = [];
  keys.forEach((key) => {
    if (key !== 'sections') {
      statistic[key].forEach((i) => {
        arr.push(i);
      });
    }
  });
  return (arr);
}

function tableSort(arr, filter) {
  arr.sort((a, b) => {
    let aNew;
    let bNew;
    if (filter === 'percent') {
      aNew = Math.floor((a.errors / a.playClick) * 100);
      bNew = Math.floor((b.errors / b.playClick) * 100);
      if (!aNew) {
        aNew = 0;
      }
      if (!bNew) {
        bNew = 0;
      }
    } else {
      aNew = a[filter];
      bNew = b[filter];
    }
    if (aNew > bNew) {
      return 1;
    }
    return -1;
  });
  return arr;
}
function createStatisticsBySection(sections) {
  let num = 1;

  const newData = JSON.parse(localStorage.getItem('statistic'));
  sections.forEach((section) => {
    if (section !== 'sections') {
      newData[section].forEach(({
        title, translate, trainClick, playClick, errors, key,
      }) => {
        updateStatisticContent(num, key, title, translate, trainClick, playClick, errors);
        num += 1;
      });
    }
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

  const statistic = JSON.parse(localStorage.getItem('statistic'));
  const keys = Object.keys(statistic);

  switch (filter) {
    case 'Category':
      if (reverse) {
        createStatisticsBySection(keys.sort());
      } else {
        createStatisticsBySection(keys.sort().reverse());
      }
      break;
    case 'Sr.No.':
      if (reverse) {
        createStatisticsBySection(keys);
      } else {
        createStatisticsBySection(keys.reverse());
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
      sortAllWords('persent', reverse);
      break;
    default:
      break;
  }
}

function returnEightErrorsOrLess() {
  let errorClick = tableSort(returnAllWords(), 'errors');

  errorClick = errorClick.filter((i) => i.errors !== 0).reverse();
  if (errorClick.length >= 8) {
    errorClick = errorClick.slice(0, 8);
  } else {
    errorClick = errorClick.slice(0, errorClick.length);
  }

  return errorClick;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (statisticFilter);



/***/ }),

/***/ "./js/pages/toggleTheme.js":
/*!*********************************!*\
  !*** ./js/pages/toggleTheme.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyTheme": () => (/* binding */ applyTheme),
/* harmony export */   "firstCheckTheme": () => (/* binding */ firstCheckTheme)
/* harmony export */ });
/* harmony import */ var _categoryPage_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categoryPage/DOMFunctions */ "./js/pages/categoryPage/DOMFunctions.js");
/* harmony import */ var _showPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./showPage */ "./js/pages/showPage.js");



function applyTheme(themeName) {
  const themeUrl = `css/${themeName}-theme.css`;
  document.querySelector('[title="theme"]').setAttribute('href', themeUrl);
  localStorage.setItem('theme', themeName);

  if (themeName === 'train') {
    (0,_categoryPage_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_categoryPage_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.hideBlockOnPlay)();
  }
}
function changeMode() {
  const toggle = document.querySelector('#toggle');
  toggle.setAttribute('aria-checked', toggle.checked);
  const currentPage = localStorage.getItem('page');

  if (toggle.checked === true) {
    applyTheme('play');
  } else {
    applyTheme('train');
  }
  if (currentPage !== 'sections') {
    (0,_showPage__WEBPACK_IMPORTED_MODULE_1__["default"])(currentPage);
  }
}

function firstCheckTheme() {
  const activeTheme = localStorage.getItem('theme');
  if (activeTheme) {
    applyTheme(activeTheme);
  } else {
    applyTheme('train');
  }

  const toggle = document.querySelector('#toggle');

  if (activeTheme === 'play') {
    toggle.setAttribute('aria-checked', true);
    toggle.setAttribute('checked', true);
  }

  toggle.addEventListener('change', () => {
    changeMode();
  });
}




/***/ }),

/***/ "./js/services/getResource.js":
/*!************************************!*\
  !*** ./js/services/getResource.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const dbUrl = 'https://irmakdak.github.io/English-for-kids/cards.json';
function getUrl() {
  return dbUrl;
}

const getResource = async () => {
  const url = getUrl();
  const res = await fetch(url, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status ${res.status}`);
  } else {
    const result = await res.json();
    return result;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getResource);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_pagesLayout_mainPageLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/pagesLayout/mainPageLayout */ "./js/pages/pagesLayout/mainPageLayout.js");
/* harmony import */ var _pages_showPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/showPage */ "./js/pages/showPage.js");
/* harmony import */ var _pages_pagesLayout_headerCreater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/pagesLayout/headerCreater */ "./js/pages/pagesLayout/headerCreater.js");
/* harmony import */ var _pages_toggleTheme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/toggleTheme */ "./js/pages/toggleTheme.js");
/* harmony import */ var _pages_cardsCreators_categoryCardCreate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/cardsCreators/categoryCardCreate */ "./js/pages/cardsCreators/categoryCardCreate.js");
/* harmony import */ var _pages_categoryPage_startPlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/categoryPage/startPlay */ "./js/pages/categoryPage/startPlay.js");
/* harmony import */ var _pages_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/statisticsPage/createLocalStorage */ "./js/pages/statisticsPage/createLocalStorage.js");








function start() {
  (0,_pages_pagesLayout_headerCreater__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_pages_pagesLayout_mainPageLayout__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_pages_showPage__WEBPACK_IMPORTED_MODULE_1__["default"])('sections');

  (0,_pages_categoryPage_startPlay__WEBPACK_IMPORTED_MODULE_5__.clickPlayBtn)();

  (0,_pages_toggleTheme__WEBPACK_IMPORTED_MODULE_3__.firstCheckTheme)();
  (0,_pages_cardsCreators_categoryCardCreate__WEBPACK_IMPORTED_MODULE_4__.flipCardByClick)();
}
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('statistic')) {
    (0,_pages_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_6__["default"])()
      .then(() => {
        start();
      });
  } else {
    start();
  }
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
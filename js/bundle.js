/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/DOMFunctions.js":
/*!**********************************!*\
  !*** ./js/pages/DOMFunctions.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeTextOnBtn": () => (/* binding */ changeTextOnBtn),
/* harmony export */   "cleanPage": () => (/* binding */ cleanPage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hideBlockOnPlay": () => (/* binding */ hideBlockOnPlay),
/* harmony export */   "hidePlayBtn": () => (/* binding */ hidePlayBtn),
/* harmony export */   "showBlockOnPlay": () => (/* binding */ showBlockOnPlay),
/* harmony export */   "showTextUnderPlayBtn": () => (/* binding */ showTextUnderPlayBtn),
/* harmony export */   "zeroErrorsPage": () => (/* binding */ zeroErrorsPage)
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
function hidePlayBtn() {
  document.querySelector('.btn').classList.add('hide');
}
function zeroErrorsPage() {
  hidePlayBtn();
  const error = document.createElement('div');
  error.classList.add('zero-error');

  error.textContent = "You don't have any error cards yet";

  document.querySelector('.album').querySelector('.row').append(error);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cleanForNewGame);



/***/ }),

/***/ "./js/pages/cardsCreators/cardsOrder.js":
/*!**********************************************!*\
  !*** ./js/pages/cardsCreators/cardsOrder.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getCardsOrder": () => (/* binding */ getCardsOrder),
/* harmony export */   "getCurrentCard": () => (/* binding */ getCurrentCard),
/* harmony export */   "playAudio": () => (/* binding */ playAudio),
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
function playAudio(wayToAudio) {
  new Audio(wayToAudio).play();
}
function repeatAudio() {
  if (getCurrentCard()) {
    playAudio(getCurrentCard().audio);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createArray);



/***/ }),

/***/ "./js/pages/cardsCreators/categoryCardCreate.js":
/*!******************************************************!*\
  !*** ./js/pages/cardsCreators/categoryCardCreate.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "flipCardByClick": () => (/* binding */ flipCardByClick),
/* harmony export */   "loadCategoryCards": () => (/* binding */ loadCategoryCards)
/* harmony export */ });
/* harmony import */ var _statistics_createLocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../statistics/createLocalStorage */ "./js/pages/statistics/createLocalStorage.js");
/* harmony import */ var _cardsOrder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cardsOrder */ "./js/pages/cardsCreators/cardsOrder.js");



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
        (0,_statistics_createLocalStorage__WEBPACK_IMPORTED_MODULE_0__.editStatistics)(this.title, 'trainClick', 1);
        if (e.target !== col.querySelector('.translate-icon')) {
          (0,_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.playAudio)(`${this.audio}`);
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
  const delayMenu = 200;

  menuBtn.classList.add('hide');
  backg.classList.remove('hide');

  setTimeout(() => {
    backg.classList.remove('hide-bg');
  }, delayMenu);
  setTimeout(() => {
    menu.classList.remove('hide-menu-left');
  }, delayMenu);

  document.body.classList.add('overflow-hidden');
}
function closeMenu() {
  const menu = document.querySelector('.header-container');
  const delayMenu = 300;

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
    }, delayMenu);
  }
  document.body.classList.remove('overflow-hidden');
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
/* harmony import */ var _statistics_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../statistics/cards */ "./js/pages/statistics/cards.js");


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
function checkColorAdditin(inner) {
  return (typeof (inner) === 'string' && _statistics_cards__WEBPACK_IMPORTED_MODULE_0__.sections.find((section) => section === inner.toLowerCase()));
}
function createRow(parent, inner, addClass = null) {
  const rowData = document.createElement('td');
  rowData.textContent = inner;
  if (addClass) {
    rowData.classList.add(addClass);
  }
  if (checkColorAdditin(inner)) {
    rowData.classList.add('category-icon');
    addColorClass(rowData, inner);
  }
  parent.appendChild(rowData);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (thLayout);



/***/ }),

/***/ "./js/pages/showPages/headerCreater.js":
/*!*********************************************!*\
  !*** ./js/pages/showPages/headerCreater.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _showPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./showPage */ "./js/pages/showPages/showPage.js");
/* harmony import */ var _pagesLayout_headerLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pagesLayout/headerLayout */ "./js/pages/pagesLayout/headerLayout.js");



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
      (0,_showPage__WEBPACK_IMPORTED_MODULE_0__["default"])(this.title);
    });
  }
}

function createHeader() {
  (0,_pagesLayout_headerLayout__WEBPACK_IMPORTED_MODULE_1__["default"])();

  const btnMain = document.querySelector('.main-page');
  const btnStatistic = document.querySelector('.statistic-page');
  const container = document.querySelector('.header-container');

  btnMain.addEventListener('click', () => {
    (0,_showPage__WEBPACK_IMPORTED_MODULE_0__["default"])('sections');
  });
  btnStatistic.addEventListener('click', () => {
    (0,_showPage__WEBPACK_IMPORTED_MODULE_0__["default"])('statistic');
  });

  const resourse = JSON.parse(localStorage.getItem('statistic'));
  resourse.sections.forEach((i) => {
    new LiCreate(i.title, container).render();
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createHeader);


/***/ }),

/***/ "./js/pages/showPages/playMode.js":
/*!****************************************!*\
  !*** ./js/pages/showPages/playMode.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clickPlayBtn": () => (/* binding */ clickPlayBtn),
/* harmony export */   "getCardsOrder": () => (/* reexport safe */ _cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCardsOrder),
/* harmony export */   "getCurrentCard": () => (/* reexport safe */ _cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCurrentCard),
/* harmony export */   "repeatAudio": () => (/* reexport safe */ _cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.repeatAudio),
/* harmony export */   "setCurrentCard": () => (/* reexport safe */ _cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.setCurrentCard),
/* harmony export */   "startPlay": () => (/* binding */ startPlay)
/* harmony export */ });
/* harmony import */ var _DOMFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOMFunctions */ "./js/pages/DOMFunctions.js");
/* harmony import */ var _cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cardsCreators/cardsOrder */ "./js/pages/cardsCreators/cardsOrder.js");
/* harmony import */ var _showPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./showPage */ "./js/pages/showPages/showPage.js");
/* harmony import */ var _statistics_createLocalStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../statistics/createLocalStorage */ "./js/pages/statistics/createLocalStorage.js");
/* harmony import */ var _statistics_statisticFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../statistics/statisticFilter */ "./js/pages/statistics/statisticFilter.js");









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
    (0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.playAudio)('./assets/audio/loseGame.mp3');
  } else {
    result.setAttribute('src', './assets/icons/win.jpg');
    (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.showTextUnderPlayBtn)("You won! You didn't make a single mistake");
    (0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.playAudio)('./assets/audio/winGame.mp3');
  }

  blockedLayer.prepend(result);
}
function finishGame() {
  (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.showBlockOnPlay)();
  showResult();
  const nav = document.querySelector('.navbar');
  nav.classList.add('navbar-disabled');
  setTimeout(() => {
    (0,_showPage__WEBPACK_IMPORTED_MODULE_2__["default"])('sections');
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
  const numOfActiveCard = (0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCardsOrder)()[0];

  const activeCard = cards[numOfActiveCard];
  let currentCardObj;
  let arrForSearch;

  if (currentPage !== 'difficult') {
    arrForSearch = resourse[currentPage];
  } else {
    arrForSearch = (0,_statistics_statisticFilter__WEBPACK_IMPORTED_MODULE_4__.returnAllWords)();
  }
  arrForSearch.forEach((arrayItem) => {
    if ((0,_showPage__WEBPACK_IMPORTED_MODULE_2__.shortName)(arrayItem.title) === activeCard.id) {
      currentCardObj = arrayItem;
    }
  });
  (0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.setCurrentCard)(currentCardObj);
  (0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.playAudio)(currentCardObj.audio);
}

function blockCardClick(blockCard) {
  document.querySelector(`#${blockCard}`).classList.add('block-card');
}
function checkCorrectCard(e) {
  const blockCard = (0,_showPage__WEBPACK_IMPORTED_MODULE_2__.shortName)((0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCurrentCard)().title);

  if (e.target.getAttribute('id') === blockCard) {
    (0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.playAudio)('./assets/audio/win.mp3');
    (0,_statistics_createLocalStorage__WEBPACK_IMPORTED_MODULE_3__.editStatistics)((0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCurrentCard)().title, 'playClick', 1);

    (0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCardsOrder)().shift();
    (0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.setCardsOrder)((0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCardsOrder)());
    blockCardClick(blockCard);

    if ((0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCardsOrder)().length >= 1) {
      addHeart('GOOD');
      setNextCardAsActive();
    } else {
      addHeart('GOOD');
      finishGame();
    }
  } else {
    addHeart('BAD');
    (0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.playAudio)('./assets/audio/fail.mp3');
    (0,_statistics_createLocalStorage__WEBPACK_IMPORTED_MODULE_3__.editStatistics)((0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCurrentCard)().title, 'errors', 1);
    (0,_statistics_createLocalStorage__WEBPACK_IMPORTED_MODULE_3__.editStatistics)((0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.getCurrentCard)().title, 'playClick', 1);
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
  (0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__["default"])(document.querySelectorAll('.card').length);
  setNextCardAsActive();
  createListenersForPlay();
}

function clickPlayBtn() {
  const btnPlay = document.querySelector('.btn');
  const block = document.querySelector('.play-block');

  btnPlay.addEventListener('click', () => {
    if (localStorage.getItem('page') !== 'sections') {
      if (!block.classList.contains('hide') && btnPlay.textContent === 'PLAY') {
        (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.hideBlockOnPlay)();
        (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__["default"])();
        (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.changeTextOnBtn)('REPEAT');
        startPlay();
      }
      if (btnPlay.textContent === 'REPEAT') {
        (0,_cardsCreators_cardsOrder__WEBPACK_IMPORTED_MODULE_1__.repeatAudio)();
      }
    }
    if (localStorage.getItem('page') === 'sections') {
      if (!document.querySelector('.text-btn')) {
        (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.showTextUnderPlayBtn)('Choose a topic');
      }
    }
  });
  block.addEventListener('click', () => {
    if (!document.querySelector('.text-btn') && localStorage.getItem('page') !== 'sections') {
      (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.showTextUnderPlayBtn)('Click "PLAY" to start');
    }
  });
}




/***/ }),

/***/ "./js/pages/showPages/showPage.js":
/*!****************************************!*\
  !*** ./js/pages/showPages/showPage.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cleanPage": () => (/* reexport safe */ _DOMFunctions__WEBPACK_IMPORTED_MODULE_1__.cleanPage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hidePlayBtn": () => (/* reexport safe */ _DOMFunctions__WEBPACK_IMPORTED_MODULE_1__.hidePlayBtn),
/* harmony export */   "shortName": () => (/* binding */ shortName)
/* harmony export */ });
/* harmony import */ var _cardsCreators_sectionsCardsCreater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cardsCreators/sectionsCardsCreater */ "./js/pages/cardsCreators/sectionsCardsCreater.js");
/* harmony import */ var _DOMFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOMFunctions */ "./js/pages/DOMFunctions.js");
/* harmony import */ var _statisticCreater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statisticCreater */ "./js/pages/showPages/statisticCreater.js");
/* harmony import */ var _pagesLayout_headerLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pagesLayout/headerLayout */ "./js/pages/pagesLayout/headerLayout.js");
/* harmony import */ var _cardsCreators_categoryCardCreate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cardsCreators/categoryCardCreate */ "./js/pages/cardsCreators/categoryCardCreate.js");






function shortName(name) {
  return name.toLowerCase().replaceAll(' ', '');
}

function showPage(category) {
  (0,_pagesLayout_headerLayout__WEBPACK_IMPORTED_MODULE_3__.closeMenu)();
  (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_1__.cleanPage)();
  (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_1__.changeTextOnBtn)('PLAY');

  const myCategory = shortName(category);
  localStorage.setItem('page', myCategory);

  const resourse = JSON.parse(localStorage.getItem('statistic'));
  if (myCategory === 'sections') {
    (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_1__.hideBlockOnPlay)();
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
  } else if (myCategory === 'statistic') {
    (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_1__.hideBlockOnPlay)();
    (0,_statisticCreater__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_1__.hidePlayBtn)();
  } else {
    (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_1__.showBlockOnPlay)();
    (0,_cardsCreators_categoryCardCreate__WEBPACK_IMPORTED_MODULE_4__.loadCategoryCards)(resourse[myCategory]);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showPage);



/***/ }),

/***/ "./js/pages/showPages/statisticCreater.js":
/*!************************************************!*\
  !*** ./js/pages/showPages/statisticCreater.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "difficultPageCreate": () => (/* binding */ difficultPageCreate)
/* harmony export */ });
/* harmony import */ var _statistics_statisticFilter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../statistics/statisticFilter */ "./js/pages/statistics/statisticFilter.js");
/* harmony import */ var _pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pagesLayout/statisticLayout */ "./js/pages/pagesLayout/statisticLayout.js");
/* harmony import */ var _statistics_createLocalStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../statistics/createLocalStorage */ "./js/pages/statistics/createLocalStorage.js");
/* harmony import */ var _DOMFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DOMFunctions */ "./js/pages/DOMFunctions.js");
/* harmony import */ var _cardsCreators_categoryCardCreate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cardsCreators/categoryCardCreate */ "./js/pages/cardsCreators/categoryCardCreate.js");
/* harmony import */ var _statistics_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../statistics/cards */ "./js/pages/statistics/cards.js");







function clickTh(heading, inner) {
  const ascending = heading.querySelector('.ascending');
  const descending = heading.querySelector('.descending');

  ascending.addEventListener('click', () => {
    (0,_statistics_statisticFilter__WEBPACK_IMPORTED_MODULE_0__["default"])(inner, true);
  });
  descending.addEventListener('click', () => {
    (0,_statistics_statisticFilter__WEBPACK_IMPORTED_MODULE_0__["default"])(inner, false);
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

  _statistics_cards__WEBPACK_IMPORTED_MODULE_5__.sections.forEach((section) => {
    (0,_pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_1__.createLiForLegend)(section, containerLegend);
  });
}
function difficultPageCreate() {
  localStorage.setItem('page', 'difficult');
  const errors = (0,_statistics_statisticFilter__WEBPACK_IMPORTED_MODULE_0__.returnEightErrorsOrLess)();
  (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_3__.cleanPage)();
  (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_3__.changeTextOnBtn)('PLAY');
  if (errors.length !== 0) {
    (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_3__.showBlockOnPlay)();
    (0,_cardsCreators_categoryCardCreate__WEBPACK_IMPORTED_MODULE_4__.loadCategoryCards)(errors);
  } else {
    (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_3__.zeroErrorsPage)();
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
      (0,_statistics_createLocalStorage__WEBPACK_IMPORTED_MODULE_2__.resetStatistic)();
      (0,_statistics_statisticFilter__WEBPACK_IMPORTED_MODULE_0__["default"])('Sr.No.', true);
    });
    diffBtn.addEventListener('click', () => {
      difficultPageCreate();
    });
  }
}

function closeDropdownContent(event) {
  if (!event.target.classList.contains('dropbtn')) {
    const myDropdowns = document.querySelectorAll('.dropdown-content');
    myDropdowns.forEach((dropdown) => {
      if (!dropdown.classList.contains('hide')) {
        dropdown.classList.add('hide');
      }
    });
  }
  if (event.target.classList.contains('dropbtn')) {
    const allContents = document.querySelectorAll('.dropdown-content');
    const content = event.target.parentElement.querySelector('.dropdown-content');

    allContents.forEach((singleContent) => {
      if (!singleContent.classList.contains('hide') && content !== singleContent) {
        singleContent.classList.add('hide');
      } else if (content === singleContent) {
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
    (0,_statistics_statisticFilter__WEBPACK_IMPORTED_MODULE_0__["default"])('Sr.No.', true);

    window.addEventListener('click', closeDropdownContent);
  } else {
    document.querySelector('table').remove();
    createStatisticsPageLayout();
    window.removeEventListener('click', closeDropdownContent);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStatisticsPageLayout);



/***/ }),

/***/ "./js/pages/showPages/toggleTheme.js":
/*!*******************************************!*\
  !*** ./js/pages/showPages/toggleTheme.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyTheme": () => (/* binding */ applyTheme),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOMFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOMFunctions */ "./js/pages/DOMFunctions.js");
/* harmony import */ var _showPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./showPage */ "./js/pages/showPages/showPage.js");
/* harmony import */ var _statisticCreater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statisticCreater */ "./js/pages/showPages/statisticCreater.js");




function applyTheme(themeName) {
  const themeUrl = `css/${themeName}-theme.css`;
  document.querySelector('[title="theme"]').setAttribute('href', themeUrl);
  localStorage.setItem('theme', themeName);

  if (themeName === 'train') {
    (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_DOMFunctions__WEBPACK_IMPORTED_MODULE_0__.hideBlockOnPlay)();
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
  if (currentPage !== 'sections' && currentPage !== 'difficult') {
    (0,_showPage__WEBPACK_IMPORTED_MODULE_1__["default"])(currentPage);
  } else if (currentPage === 'difficult') {
    (0,_statisticCreater__WEBPACK_IMPORTED_MODULE_2__.difficultPageCreate)();
  }
}

function checkTheme() {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkTheme);



/***/ }),

/***/ "./js/pages/statistics/cards.js":
/*!**************************************!*\
  !*** ./js/pages/statistics/cards.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "sections": () => (/* binding */ sections)
/* harmony export */ });
const cardsDB = {
  sections: [
    {
      src: './assets/images/sections/food5.jpg',
      title: 'Food 1',
    },
    {
      src: './assets/images/sections/food4.jpg',
      title: 'Food 2',
    },
    {
      src: './assets/images/sections/nature.jpg',
      title: 'Nature',
    },
    {
      src: './assets/images/sections/animals1.jpg',
      title: 'Animals 1',
    },
    {
      src: './assets/images/sections/animals2.jpg',
      title: 'Animals 2',
    },
    {
      src: './assets/images/sections/birds.jpg',
      title: 'Birds',
    },
    {
      src: './assets/images/sections/products1.jpg',
      title: 'Products 1',
    },
    {
      src: './assets/images/sections/products2.jpg',
      title: 'Products 2',
    },
  ],
  food1: [
    {
      src: './assets/images/food/cake.jpg',
      title: 'Cake',
      translate: 'Торт',
      audio: './assets/audio/food/cake.wav',
    },
    {
      src: './assets/images/food/candy.jpg',
      title: 'Candy',
      translate: 'Конфета',
      audio: './assets/audio/food/candy.wav',
    },
    {
      src: './assets/images/food/cheesecake.jpg',
      title: 'Cheesecake',
      translate: 'Чизкейк',
      audio: './assets/audio/food/cheesecake.mp3',
    },
    {
      src: './assets/images/food/cookies.jpg',
      title: 'Cookie',
      translate: 'Печенье',
      audio: './assets/audio/food/cookies.wav',
    },
    {
      src: './assets/images/food/croissant.jpg',
      title: 'Croissant',
      translate: 'Круассан',
      audio: './assets/audio/food/croissant.wav',
    },
    {
      src: './assets/images/food/donut.jpg',
      title: 'Donut',
      translate: 'Пончик',
      audio: './assets/audio/food/donut.wav',
    },
    {
      src: './assets/images/food/hotdog.jpg',
      title: 'Hot Dog',
      translate: 'Хот-Дог',
      audio: './assets/audio/food/hotdog.wav',
    },
    {
      src: './assets/images/food/humburger.jpg',
      title: 'Hamburger',
      translate: 'Гамбургер',
      audio: './assets/audio/food/humburger.wav',
    },
  ],
  food2: [
    {
      src: './assets/images/food/ice-cream.jpg',
      title: 'Ice cream',
      translate: 'Мороженое',
      audio: './assets/audio/food/ice-cream.wav',
    },
    {
      src: './assets/images/food/pancakes.jpg',
      title: 'Pancakes',
      translate: 'Блины',
      audio: './assets/audio/food/pancakes.wav',
    },
    {
      src: './assets/images/food/pizza.jpg',
      title: 'Pizza',
      translate: 'Пицца',
      audio: './assets/audio/food/pizza.wav',
    },
    {
      src: './assets/images/food/popcorn.jpg',
      title: 'Popcorn',
      translate: 'Попкорн',
      audio: './assets/audio/food/popcorn.wav',
    },
    {
      src: './assets/images/food/salat.jpg',
      title: 'Salad',
      translate: 'Салат',
      audio: './assets/audio/food/salat.wav',
    },
    {
      src: './assets/images/food/waffles.jpg',
      title: 'Waffles',
      translate: 'Вафли',
      audio: './assets/audio/food/waffles.wav',
    },
    {
      src: './assets/images/food/fish-steak.jpg',
      title: 'Fish Steak',
      translate: 'Рыбный стейк',
      audio: './assets/audio/food/fish-steak.wav',
    },
    {
      src: './assets/images/food/sandwich.jpg',
      title: 'Sandwich',
      translate: 'Сэндвич',
      audio: './assets/audio/food/sandwich.wav',
    },
  ],
  nature: [
    {
      src: './assets/images/nature/stars.jpg',
      title: 'Star',
      translate: 'Звезда',
      audio: './assets/audio/nature/star.wav',
    },
    {
      src: './assets/images/nature/planet.jpg',
      title: 'Planet',
      translate: 'Планета',
      audio: './assets/audio/nature/planet.wav',
    },
    {
      src: './assets/images/nature/crescent.jpg',
      title: 'Crescent',
      translate: 'Полумесяц',
      audio: './assets/audio/nature/crescent.wav',
    },
    {
      src: './assets/images/nature/leaf.jpg',
      title: 'Leaf',
      translate: 'Лист',
      audio: './assets/audio/nature/leaf.wav',
    },
    {
      src: './assets/images/nature/flower.jpg',
      title: 'Flower',
      translate: 'Цветок',
      audio: './assets/audio/nature/flower.wav',
    },
    {
      src: './assets/images/nature/fire.jpg',
      title: 'Fire',
      translate: 'Огонь',
      audio: './assets/audio/nature/fire.wav',
    },
    {
      src: './assets/images/nature/cloud.jpg',
      title: 'Cloud',
      translate: 'Облако',
      audio: './assets/audio/nature/cloud.wav',
    },
    {
      src: './assets/images/nature/butterfly.jpg',
      title: 'Butterfly',
      translate: 'Бабочка',
      audio: './assets/audio/nature/butterfly.wav',
    },
    {
      src: './assets/images/nature/tree.jpg',
      title: 'Tree',
      translate: 'Дерево',
      audio: './assets/audio/nature/tree.wav',
    },
  ],
  animals1: [
    {
      src: './assets/images/animals/bear.jpg',
      title: 'Bear',
      translate: 'Медведь',
      audio: './assets/audio/animals/bear.wav',
    },
    {
      src: './assets/images/animals/cat.jpg',
      title: 'Cat',
      translate: 'Кот',
      audio: './assets/audio/animals/cat.wav',
    },
    {
      src: './assets/images/animals/cow.jpg',
      title: 'Cow',
      translate: 'Корова',
      audio: './assets/audio/animals/cow.wav',
    },
    {
      src: './assets/images/animals/deer.jpg',
      title: 'Deer',
      translate: 'Олень',
      audio: './assets/audio/animals/deer.wav',
    },
    {
      src: './assets/images/animals/dog.jpg',
      title: 'Dog',
      translate: 'Собака',
      audio: './assets/audio/animals/dog.wav',
    },
    {
      src: './assets/images/animals/giraffe.jpg',
      title: 'Giraffe',
      translate: 'Жираф',
      audio: './assets/audio/animals/giraffe.wav',
    },
    {
      src: './assets/images/animals/fox.jpg',
      title: 'Fox',
      translate: 'Лиса',
      audio: './assets/audio/animals/fox.wav',
    },
    {
      src: './assets/images/animals/koala.jpg',
      title: 'Koala',
      translate: 'Коала',
      audio: './assets/audio/animals/koala.wav',
    },
  ],
  animals2: [
    {
      src: './assets/images/animals/monkey.jpg',
      title: 'Monkey',
      translate: 'Обезьяна',
      audio: './assets/audio/animals/monkey.wav',
    },
    {
      src: './assets/images/animals/mouse.jpg',
      title: 'Mouse',
      translate: 'Мышь',
      audio: './assets/audio/animals/mouse.wav',
    },
    {
      src: './assets/images/animals/panda.jpg',
      title: 'Panda',
      translate: 'Панда',
      audio: './assets/audio/animals/panda.wav',
    },
    {
      src: './assets/images/animals/rabbit.jpg',
      title: 'Rabbit',
      translate: 'Кролик',
      audio: './assets/audio/animals/rabbit.wav',
    },
    {
      src: './assets/images/animals/snail.jpg',
      title: 'Snail',
      translate: 'Улитка',
      audio: './assets/audio/animals/snail.wav',
    },
    {
      src: './assets/images/animals/squirrel.jpg',
      title: 'Squirrel',
      translate: 'Белка',
      audio: './assets/audio/animals/squirrel.wav',
    },
    {
      src: './assets/images/animals/tiger.jpg',
      title: 'Tiger',
      translate: 'Тигр',
      audio: './assets/audio/animals/tiger.wav',
    },
    {
      src: './assets/images/animals/turtle.jpg',
      title: 'Turtle',
      translate: 'Черепаха',
      audio: './assets/audio/animals/turtle.wav',
    },
    {
      src: './assets/images/animals/sheep.jpg',
      title: 'Sheep',
      translate: 'Овца',
      audio: './assets/audio/animals/sheep.wav',
    },
  ],
  birds: [
    {
      src: './assets/images/birds/duck.jpg',
      title: 'Duck',
      translate: 'Утка',
      audio: './assets/audio/birds/duck.wav',
    },
    {
      src: './assets/images/birds/chick.jpg',
      title: 'Chick',
      translate: 'Цыпленок',
      audio: './assets/audio/birds/chick.wav',
    },
    {
      src: './assets/images/birds/owl.jpg',
      title: 'Owl',
      translate: 'Сова',
      audio: './assets/audio/birds/owl.wav',
    },
    {
      src: './assets/images/birds/parrot.jpg',
      title: 'Parrot',
      translate: 'Попугай',
      audio: './assets/audio/birds/parrot.wav',
    },
    {
      src: './assets/images/birds/penguin.jpg',
      title: 'Penguin',
      translate: 'Пингвин',
      audio: './assets/audio/birds/penguin.wav',
    },
    {
      src: './assets/images/birds/pigeon.jpg',
      title: 'Pigeon',
      translate: 'Голубь',
      audio: './assets/audio/birds/pigeon.wav',
    },
    {
      src: './assets/images/birds/sparrow.jpg',
      title: 'Sparrow',
      translate: 'Воробей',
      audio: './assets/audio/birds/sparrow.wav',
    },
    {
      src: './assets/images/birds/swan.jpg',
      title: 'Swan',
      translate: 'Лебедь',
      audio: './assets/audio/birds/swan.wav',
    },
    {
      src: './assets/images/birds/turkey.jpg',
      title: 'Turkey',
      translate: 'Индюк',
      audio: './assets/audio/birds/turkey.wav',
    },
  ],
  products1: [
    {
      src: './assets/images/products/bananas.jpg',
      title: 'Bananas',
      translate: 'Бананы',
      audio: './assets/audio/products/bananas.wav',
    },
    {
      src: './assets/images/products/carrot.jpg',
      title: 'Carrot',
      translate: 'Морковь',
      audio: './assets/audio/products/carrot.wav',
    },
    {
      src: './assets/images/products/cheese.jpg',
      title: 'Cheese',
      translate: 'Сыр',
      audio: './assets/audio/products/cheese.wav',
    },
    {
      src: './assets/images/products/chocolate.jpg',
      title: 'Chocolate',
      translate: 'Шоколад',
      audio: './assets/audio/products/chocolate.wav',
    },
    {
      src: './assets/images/products/corn.jpg',
      title: 'Corn',
      translate: 'Кукуруза',
      audio: './assets/audio/products/corn.wav',
    },
    {
      src: './assets/images/products/grape.jpg',
      title: 'Grape',
      translate: 'Виноград',
      audio: './assets/audio/products/grape.wav',
    },
    {
      src: './assets/images/products/kiwi.jpg',
      title: 'Kiwi',
      translate: 'Киви',
      audio: './assets/audio/products/kiwi.wav',
    },
    {
      src: './assets/images/products/lemon.jpg',
      title: 'Lemon',
      translate: 'Лимон',
      audio: './assets/audio/products/lemon.wav',
    },
  ],
  products2: [
    {
      src: './assets/images/products/meat.jpg',
      title: 'Meat',
      translate: 'Мясо',
      audio: './assets/audio/products/meat.wav',
    },
    {
      src: './assets/images/products/orange.jpg',
      title: 'Orange',
      translate: 'Апельсин',
      audio: './assets/audio/products/orange.wav',
    },
    {
      src: './assets/images/products/peer.jpg',
      title: 'Pear',
      translate: 'Груша',
      audio: './assets/audio/products/peer.wav',
    },
    {
      src: './assets/images/products/pepper.jpg',
      title: 'Pepper',
      translate: 'Перец',
      audio: './assets/audio/products/pepper.wav',
    },
    {
      src: './assets/images/products/pineapple.jpg',
      title: 'Pineapple',
      translate: 'Ананас',
      audio: './assets/audio/products/pineapple.wav',
    },
    {
      src: './assets/images/products/strawberry.jpg',
      title: 'Strawberry',
      translate: 'Клубника',
      audio: './assets/audio/products/strawberry.wav',
    },
    {
      src: './assets/images/products/tomato.jpg',
      title: 'Tomato',
      translate: 'Помидор',
      audio: './assets/audio/products/tomato.wav',
    },
    {
      src: './assets/images/products/watermelon.jpg',
      title: 'Watermelon',
      translate: 'Арбуз',
      audio: './assets/audio/products/watermelon.wav',
    },
  ],
};

const sections = Object.keys(cardsDB).filter((section) => section !== 'sections');

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cardsDB);



/***/ }),

/***/ "./js/pages/statistics/createLocalStorage.js":
/*!***************************************************!*\
  !*** ./js/pages/statistics/createLocalStorage.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "editStatistics": () => (/* binding */ editStatistics),
/* harmony export */   "resetStatistic": () => (/* binding */ resetStatistic)
/* harmony export */ });
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards */ "./js/pages/statistics/cards.js");


function searchInLocalStorage(func) {
  const newData = JSON.parse(localStorage.getItem('statistic'));
  _cards__WEBPACK_IMPORTED_MODULE_0__.sections.forEach((section) => {
    newData[section].forEach((currentSection) => func(currentSection));
  });
  localStorage.setItem('statistic', JSON.stringify(newData));
}
function addKey() {
  const newData = JSON.parse(localStorage.getItem('statistic'));
  _cards__WEBPACK_IMPORTED_MODULE_0__.sections.forEach((section) => {
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
  localStorage.setItem('statistic', JSON.stringify(_cards__WEBPACK_IMPORTED_MODULE_0__["default"]));
  resetStatistic();
  addKey();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createLocalStorage);



/***/ }),

/***/ "./js/pages/statistics/statisticFilter.js":
/*!************************************************!*\
  !*** ./js/pages/statistics/statisticFilter.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "returnAllWords": () => (/* binding */ returnAllWords),
/* harmony export */   "returnEightErrorsOrLess": () => (/* binding */ returnEightErrorsOrLess),
/* harmony export */   "updateStatisticContent": () => (/* binding */ updateStatisticContent)
/* harmony export */ });
/* harmony import */ var _pagesLayout_statisticLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pagesLayout/statisticLayout */ "./js/pages/pagesLayout/statisticLayout.js");
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cards */ "./js/pages/statistics/cards.js");



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
  const cards = JSON.parse(localStorage.getItem('statistic'));

  const arr = [];
  _cards__WEBPACK_IMPORTED_MODULE_1__.sections.forEach((section) => {
    cards[section].forEach((currentItem) => {
      arr.push(currentItem);
    });
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
        createStatisticsBySection(_cards__WEBPACK_IMPORTED_MODULE_1__.sections.sort());
      } else {
        createStatisticsBySection(_cards__WEBPACK_IMPORTED_MODULE_1__.sections.sort().reverse());
      }
      break;
    case 'Sr.No.':
      if (reverse) {
        createStatisticsBySection(_cards__WEBPACK_IMPORTED_MODULE_1__.sections);
      } else {
        createStatisticsBySection(_cards__WEBPACK_IMPORTED_MODULE_1__.sections.reverse());
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (statisticFilter);



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
/* harmony import */ var _pages_showPages_showPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/showPages/showPage */ "./js/pages/showPages/showPage.js");
/* harmony import */ var _pages_showPages_headerCreater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/showPages/headerCreater */ "./js/pages/showPages/headerCreater.js");
/* harmony import */ var _pages_showPages_toggleTheme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/showPages/toggleTheme */ "./js/pages/showPages/toggleTheme.js");
/* harmony import */ var _pages_cardsCreators_categoryCardCreate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/cardsCreators/categoryCardCreate */ "./js/pages/cardsCreators/categoryCardCreate.js");
/* harmony import */ var _pages_showPages_playMode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/showPages/playMode */ "./js/pages/showPages/playMode.js");
/* harmony import */ var _pages_statistics_createLocalStorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/statistics/createLocalStorage */ "./js/pages/statistics/createLocalStorage.js");








function showMainPage() {
  (0,_pages_showPages_headerCreater__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_pages_pagesLayout_mainPageLayout__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_pages_showPages_showPage__WEBPACK_IMPORTED_MODULE_1__["default"])('sections');

  (0,_pages_showPages_playMode__WEBPACK_IMPORTED_MODULE_5__.clickPlayBtn)();

  (0,_pages_showPages_toggleTheme__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_pages_cardsCreators_categoryCardCreate__WEBPACK_IMPORTED_MODULE_4__.flipCardByClick)();
}
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('statistic')) {
    (0,_pages_statistics_createLocalStorage__WEBPACK_IMPORTED_MODULE_6__["default"])();
    showMainPage();
  } else {
    showMainPage();
  }
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
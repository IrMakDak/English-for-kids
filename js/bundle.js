/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/categoryPage/categoryCardCreate.js":
/*!*****************************************************!*\
  !*** ./js/pages/categoryPage/categoryCardCreate.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CategoryCard": () => (/* binding */ CategoryCard),
/* harmony export */   "flipCardByClick": () => (/* binding */ flipCardByClick)
/* harmony export */ });
/* harmony import */ var _statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../statisticsPage/createLocalStorage */ "./js/pages/statisticsPage/createLocalStorage.js");


class CategoryCard {
    constructor(src, title, translate, audio) {
        this.src = src;
        this.alt = title.replaceAll(' ', '') + '-img';
        this.title = title;
        this.translate = translate;
        this.audio = audio;
        this.parent = document.querySelector('.album').querySelector('.row');
        this.id = title.replaceAll(' ', '').toLowerCase();
    }
    render() {

        const col = document.createElement("div");
        col.classList.add("col");

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
                (0,_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_0__.editStatistics)(localStorage.getItem('page').toLowerCase().replaceAll(' ', ''), this.title, 'trainClick');
                if (e.target !== col.querySelector('.translate-icon')) {
                    new Audio(`${this.audio}`).play();
                } else {
                    turnOverCard(col);
                }
            })
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

function turnOverCard(parentOfCard) {

    let cleanCards = document.querySelectorAll('.rotate180');
    let cleanInv = document.querySelectorAll('.rotate360');

    if (cleanCards) {
        cleanCards.forEach(i => {
            i.classList.remove('rotate180');
        })
    }
    if (cleanInv) {
        cleanInv.forEach(i => {
            i.classList.remove('rotate360');
        })
    }

    let card = parentOfCard.querySelector('.card');
    let cardInverted = parentOfCard.querySelector('.card-inverted');

    card.classList.add('rotate180');
    cardInverted.classList.add('rotate360');

    cardInverted.addEventListener("mouseout", () => {
        card.classList.remove('rotate180');
        cardInverted.classList.remove('rotate360');
    })
}

function flipCardByClick() {
    document.querySelector('main').addEventListener('click', (e) => {
        let cardsInverted = document.querySelectorAll('.card-inverted');

        cardsInverted.forEach(i => {
            if (i.classList.contains('rotate360') && !e.target.classList.contains('translate-icon')) {

                let card = i.parentElement.firstElementChild;
                card.classList.remove('rotate180');
                i.classList.remove('rotate360');
            }
        });
    })
}



/***/ }),

/***/ "./js/pages/categoryPage/changeMode.js":
/*!*********************************************!*\
  !*** ./js/pages/categoryPage/changeMode.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeMode": () => (/* binding */ changeMode)
/* harmony export */ });
/* harmony import */ var _showPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../showPage */ "./js/pages/showPage.js");
/* harmony import */ var _toggleTheme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toggleTheme */ "./js/pages/toggleTheme.js");



function changeMode () {

    toggle.setAttribute("aria-checked", toggle.checked);
    let currentPage = localStorage.getItem('page');

    if (toggle.checked === true) {
        (0,_toggleTheme__WEBPACK_IMPORTED_MODULE_1__.applyTheme)('play');
    } else {
        (0,_toggleTheme__WEBPACK_IMPORTED_MODULE_1__.applyTheme)('train');
    } 
    if (currentPage !== 'sections') {
        (0,_showPage__WEBPACK_IMPORTED_MODULE_0__["default"])(currentPage);
    }
}



/***/ }),

/***/ "./js/pages/categoryPage/clickPlayButton.js":
/*!**************************************************!*\
  !*** ./js/pages/categoryPage/clickPlayButton.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeTextOnBtn": () => (/* binding */ changeTextOnBtn),
/* harmony export */   "cleanForNewGame": () => (/* binding */ cleanForNewGame),
/* harmony export */   "clickPlayBtn": () => (/* binding */ clickPlayBtn),
/* harmony export */   "hideBlockOnPlay": () => (/* binding */ hideBlockOnPlay),
/* harmony export */   "showBlockOnPlay": () => (/* binding */ showBlockOnPlay),
/* harmony export */   "showTextUnderPlayBtn": () => (/* binding */ showTextUnderPlayBtn)
/* harmony export */ });
/* harmony import */ var _startPlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startPlay */ "./js/pages/categoryPage/startPlay.js");


function showBlockOnPlay() {
    if (localStorage.getItem('theme') === 'play') {
        const block = document.querySelector('.play-block');

        if (block.classList.contains('hide')) {
            block.classList.remove('hide');
        }
    }
}

function hideBlockOnPlay() {
    const block = document.querySelector('.play-block');

    if (!block.classList.contains('hide')) {
        block.classList.add('hide');
    }
}

function showTextUnderPlayBtn(showText) {
    const parent =  document.querySelector('.header-main');
    const text = document.createElement('span');

    text.classList.add('text-btn');
    text.textContent = showText;

    parent.append(text);
}

function cleanTextUnderPlayBtn() {
    const text = document.querySelector('.text-btn');
    if (text) {
        text.remove();
    }
}
function cleanForNewGame() {
    if (document.querySelector('.hearts-container')) {
        document.querySelector('.hearts-container').remove();
    }
    if (document.querySelector('.result-img')) {
        document.querySelector('.result-img').remove();
    }
    cleanTextUnderPlayBtn();
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

function clickPlayBtn() {
    const btnPlay = document.querySelector('.btn');
    const block = document.querySelector('.play-block');
    
    btnPlay.addEventListener('click', () => {
        if (!block.classList.contains('hide') && localStorage.getItem('page') !== 'sections' && btnPlay.textContent === 'PLAY') {
            hideBlockOnPlay();
            cleanForNewGame();
            changeTextOnBtn('REPEAT');

            (0,_startPlay__WEBPACK_IMPORTED_MODULE_0__.startPlay)();
        } else if (block.classList.contains('hide') && localStorage.getItem('page') !== 'sections' && btnPlay.textContent === 'REPEAT') {
            (0,_startPlay__WEBPACK_IMPORTED_MODULE_0__.repeatAudio)();
        } else if (!document.querySelector('.text-btn') && localStorage.getItem('page') === 'sections') {
            showTextUnderPlayBtn('Choose a topic');
        }
    })
    block.addEventListener('click', () => {
        if (!document.querySelector('.text-btn') && localStorage.getItem('page') !== 'sections') {
            showTextUnderPlayBtn('Click "PLAY" to start');
        }
    })
}



/***/ }),

/***/ "./js/pages/categoryPage/startPlay.js":
/*!********************************************!*\
  !*** ./js/pages/categoryPage/startPlay.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "repeatAudio": () => (/* binding */ repeatAudio),
/* harmony export */   "startPlay": () => (/* binding */ startPlay)
/* harmony export */ });
/* harmony import */ var _services_getResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/getResource */ "./js/services/getResource.js");
/* harmony import */ var _clickPlayButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clickPlayButton */ "./js/pages/categoryPage/clickPlayButton.js");
/* harmony import */ var _statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../statisticsPage/createLocalStorage */ "./js/pages/statisticsPage/createLocalStorage.js");




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

function finishGame() {
    (0,_clickPlayButton__WEBPACK_IMPORTED_MODULE_1__.showBlockOnPlay)();
    (0,_clickPlayButton__WEBPACK_IMPORTED_MODULE_1__.changeTextOnBtn)('PLAY');
    showResult();
}

function showResult() {

    const blockedLayer = document.querySelector('.play-block');
    let result = document.createElement('img');
    result.setAttribute('alt', 'result'); 
    result.classList.add('result-img');

    if (blockedLayer.querySelector('.result-img')) {
        blockedLayer.querySelector('.result-img').remove();
    }

    if (document.querySelector('.heart-bad')) {
        result.setAttribute('src', './assets/icons/result-sad.jpg');
        (0,_clickPlayButton__WEBPACK_IMPORTED_MODULE_1__.showTextUnderPlayBtn)('You lose. Click to play again');
    } else {
        result.setAttribute('src', './assets/icons/win.jpg');
        (0,_clickPlayButton__WEBPACK_IMPORTED_MODULE_1__.showTextUnderPlayBtn)('You won! Click to play again');
    }

    blockedLayer.prepend(result);
}

function addHeart(type) {
    let parent = document.querySelector('.hearts-container');
    if (parent) {
        let heart = document.createElement('img');

        heart.setAttribute('alt', 'heart');
        
        if (type === "GOOD") {
            heart.setAttribute('src', './assets/icons/heart.png');
            heart.classList.add('heart-img', 'heart-good');
        }
        if (type === "BAD") {
            heart.setAttribute('src', './assets/icons/heart-bad.png');
            heart.classList.add('heart-img', 'heart-bad');
        }
        parent.append(heart);

        if (parent.querySelectorAll('.heart-bad').length > 6) {
            finishGame();
        }
    } else {
        const header = document.querySelector('.header-main');

        const parent = document.createElement('div');
        parent.classList.add('hearts-container');

        header.append(parent);
        addHeart(type);
    }
}

function blockCardClick() {
    let blockCard = getCurrentCard().title.replaceAll(' ', '').toLowerCase();
    document.querySelector(`#${blockCard}`).classList.add('block-card');
}

function checkCorrectCard(e) {
    let currentPage = localStorage.getItem('page').toLocaleLowerCase().replaceAll(' ', '');

    if (e.target.getAttribute('id') === getCurrentCard().title.replaceAll(' ', '').toLowerCase()){
        new Audio('./assets/audio/win.mp3').play();
        (0,_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_2__.editStatistics)(currentPage, getCurrentCard().title, 'playClick');

        deleteListenersForPlay();

        getCardsOrder().shift();
        setCardsOrder(getCardsOrder());
        blockCardClick();

        if (getCardsOrder().length >= 1) {
            addHeart('GOOD');
            setNextCardAsActive();
        } else {
            finishGame();
        }
    } else {
        addHeart('BAD');
        new Audio('./assets/audio/fail.mp3').play();
        (0,_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_2__.editStatistics)(currentPage, getCurrentCard().title, 'errors');
        (0,_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_2__.editStatistics)(currentPage, getCurrentCard().title, 'playClick');
    }
}

function setNextCardAsActive() {
    (0,_services_getResource__WEBPACK_IMPORTED_MODULE_0__.getResource)()
    .then(data => {
        let currentPage = localStorage.getItem('page');
        currentPage = currentPage.replaceAll(' ', '').toLowerCase();

        let currentCardObj = data[currentPage][getCardsOrder()[0]];

        setCurrentCard(currentCardObj);

        new Audio(currentCardObj.audio).play();

        createListenersForPlay();
    })    
}

function startPlay() {
    let cards = document.querySelectorAll('.block-card');
    cards.forEach(card => {
        card.classList.remove('block-card');
    })

    let currentPage = localStorage.getItem('page');
    currentPage = currentPage.replaceAll(' ', '').toLowerCase();

    (0,_services_getResource__WEBPACK_IMPORTED_MODULE_0__.getResource)()
    .then(data => {
        let dataLength = data[currentPage].length;
        createArray(dataLength);

        setNextCardAsActive();
    })
}
function repeatAudio() {
    if (getCurrentCard()) {
        new Audio(getCurrentCard().audio).play();
    }
}

function createArray(dataLength) {
    let mySet = new Set([]);
    while (mySet.size < dataLength) {
        mySet.add(Math.floor(Math.random() * (dataLength - 0)));
    }
    setCardsOrder(Array.from(mySet));
}


function createListenersForPlay() {
    let allCards = document.querySelectorAll('.card');

    allCards.forEach(card => {
        card.addEventListener('click', checkCorrectCard);
    })
}
function deleteListenersForPlay() {
    let allCards = document.querySelectorAll('.card');

    allCards.forEach(card => {
        card.removeEventListener('click', checkCorrectCard);
    })
}


/***/ }),

/***/ "./js/pages/header/headerCreater.js":
/*!******************************************!*\
  !*** ./js/pages/header/headerCreater.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_getResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/getResource */ "./js/services/getResource.js");
/* harmony import */ var _showPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../showPage */ "./js/pages/showPage.js");
/* harmony import */ var _headerLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./headerLayout */ "./js/pages/header/headerLayout.js");




function createHeader() {

    (0,_headerLayout__WEBPACK_IMPORTED_MODULE_2__["default"])();

    const btnMain = document.querySelector('.main-page');
    const btnStatistic = document.querySelector('.statistic-page');

    btnMain.addEventListener('click', () => {
        (0,_showPage__WEBPACK_IMPORTED_MODULE_1__["default"])('sections');
    });
    btnStatistic.addEventListener('click', () => {
        (0,_showPage__WEBPACK_IMPORTED_MODULE_1__["default"])('statistic');
    })
    
    ;(0,_services_getResource__WEBPACK_IMPORTED_MODULE_0__.getResource)()
    .then(data => {
        data.sections.forEach(i => {
            new liCreate(i.title).render();
        })
    })
}

class liCreate {
    constructor(title) {
        this.title = title;
    }
    render() {
        const container = document.querySelector('#headerContainer');
        const li = document.createElement("li");
        li.classList.add("li-header");
        li.innerHTML = `
            <span class="change-section-header">${this.title}</span>
        `;
        container.append(li);
        const span = li.querySelector("span");
        span.addEventListener('click', () => {
            (0,_showPage__WEBPACK_IMPORTED_MODULE_1__["default"])(this.title);
        })
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createHeader);

/***/ }),

/***/ "./js/pages/header/headerLayout.js":
/*!*****************************************!*\
  !*** ./js/pages/header/headerLayout.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createHeaderLayout() {
    const header = document.createElement("header");

    header.innerHTML = `
        <div class="collapse header-color" id="navbarHeader">
            <div class="container header-container">
                <div class="header-main-statistic">
                    <h4 class="main-page">Main Page</h4>
                    <h4 class="statistic-page">Statistic</h4>
                </div>
                <div class="container" id="headerContainer"></div>
            </div>
        </div>
        <div class="navbar navbar-dark header-color shadow-sm">
            <div class="container">
                <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createHeaderLayout);

/***/ }),

/***/ "./js/pages/mainPage/mainPageLayout.js":
/*!*********************************************!*\
  !*** ./js/pages/mainPage/mainPageLayout.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function mainPageLayout() {
    const parentOfMainLayout = document.createElement("div");

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

/***/ "./js/pages/mainPage/sectionsCardsCreater.js":
/*!***************************************************!*\
  !*** ./js/pages/mainPage/sectionsCardsCreater.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _showPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../showPage */ "./js/pages/showPage.js");


class Card {
    constructor(src, title, cardsNum = 0) {
        this.src = src;
        this.alt = title + '-img';
        this.title = title;
        this.parent = document.querySelector('.album').querySelector('.row');
        this.cardsNum = cardsNum;
    }
    render() {
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `
            <div class="card">
                <img src=${this.src} alt=${this.alt} class="album-img">
                    <div class="cards-numbers">
                        <p class="card-text">${this.title}</p>
                        <small class="text-muted">${this.cardsNum} cards</small>
                    </div>
                </div>
            </div>
        `;
        this.parent.append(col);

        const card = col.querySelector('.card');
        card.addEventListener('click', () => {
            (0,_showPage__WEBPACK_IMPORTED_MODULE_0__["default"])(this.title);
        })
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);






/***/ }),

/***/ "./js/pages/showPage.js":
/*!******************************!*\
  !*** ./js/pages/showPage.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mainPage_sectionsCardsCreater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainPage/sectionsCardsCreater */ "./js/pages/mainPage/sectionsCardsCreater.js");
/* harmony import */ var _categoryPage_categoryCardCreate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./categoryPage/categoryCardCreate */ "./js/pages/categoryPage/categoryCardCreate.js");
/* harmony import */ var _services_getResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/getResource */ "./js/services/getResource.js");
/* harmony import */ var _categoryPage_clickPlayButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./categoryPage/clickPlayButton */ "./js/pages/categoryPage/clickPlayButton.js");
/* harmony import */ var _statisticsPage_statisticPageLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./statisticsPage/statisticPageLayout */ "./js/pages/statisticsPage/statisticPageLayout.js");






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

function showPage(category) {
    cleanPage();
    (0,_categoryPage_clickPlayButton__WEBPACK_IMPORTED_MODULE_3__.cleanForNewGame)();
    (0,_categoryPage_clickPlayButton__WEBPACK_IMPORTED_MODULE_3__.changeTextOnBtn)('PLAY');

    localStorage.setItem('page', category);
    let request = category.toLowerCase().replaceAll(' ', '');

    if (request === 'sections') {
        (0,_categoryPage_clickPlayButton__WEBPACK_IMPORTED_MODULE_3__.hideBlockOnPlay)();
        (0,_services_getResource__WEBPACK_IMPORTED_MODULE_2__.getResource)()
        .then(data => {
            data.sections.forEach(({src, title}) => {
                let requestN = title.toLowerCase().replaceAll(' ', '');
                let cardsNum = data[requestN].length;
                new _mainPage_sectionsCardsCreater__WEBPACK_IMPORTED_MODULE_0__["default"](src, title, cardsNum).render();
            })
        })
    } else if (request === 'statistic') {
        (0,_categoryPage_clickPlayButton__WEBPACK_IMPORTED_MODULE_3__.hideBlockOnPlay)();
        (0,_statisticsPage_statisticPageLayout__WEBPACK_IMPORTED_MODULE_4__["default"])();
        document.querySelector('.btn').classList.add('hide');
    } else {
        (0,_categoryPage_clickPlayButton__WEBPACK_IMPORTED_MODULE_3__.showBlockOnPlay)();
        (0,_services_getResource__WEBPACK_IMPORTED_MODULE_2__.getResource)()
        .then(data => {
            data[request].forEach(({src, title, translate, audio}) => {
                new _categoryPage_categoryCardCreate__WEBPACK_IMPORTED_MODULE_1__.CategoryCard(src, title, translate, audio).render();
            })
        })
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
/* harmony export */   "resetStatistic": () => (/* binding */ resetStatistic)
/* harmony export */ });
/* harmony import */ var _services_getResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/getResource */ "./js/services/getResource.js");
/* harmony import */ var _statisticPageLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statisticPageLayout */ "./js/pages/statisticsPage/statisticPageLayout.js");



function createLocalStorage() {
    (0,_services_getResource__WEBPACK_IMPORTED_MODULE_0__.getResource)()
    .then(data => {
        const keys = Object.keys(data);
        keys.forEach(key => {
            if (key !== 'sections') {
                data[key].forEach(i => {
                    i.key = key;
                    i.trainClick = 0;
                    i.playClick = 0;
                    i.errors = 0;
                })  
            }
        })
        localStorage.setItem('statistic', JSON.stringify(data));
    })
}

function editStatistics(section, title, typeOfClick) {
    let newData = JSON.parse(localStorage.getItem('statistic'));

    newData[section].forEach(item => {
        if (item.title === title) {
            item[typeOfClick]++;
        }
    })
    localStorage.setItem('statistic', JSON.stringify(newData));
}

function resetStatistic() {
    let newData = JSON.parse(localStorage.getItem('statistic'));
    let section = Object.keys(newData);

    section.forEach(i => {
        if (i !== 'sections') {
            newData[i].forEach(item => {
                item.trainClick = 0;
                item.playClick = 0;
                item.errors = 0;
            })
        }
    })
    localStorage.setItem('statistic', JSON.stringify(newData));
    document.querySelector('table').remove();
    (0,_statisticPageLayout__WEBPACK_IMPORTED_MODULE_1__["default"])();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createLocalStorage);


/***/ }),

/***/ "./js/pages/statisticsPage/statisticFilter.js":
/*!****************************************************!*\
  !*** ./js/pages/statisticsPage/statisticFilter.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _statisticPageLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statisticPageLayout */ "./js/pages/statisticsPage/statisticPageLayout.js");


function cleanTBody() {
    let tbody = document.querySelector('tbody');
    while(tbody.firstChild) {
        tbody.firstChild.remove();
    }
}

function returnAllWords() {
    let statistic = JSON.parse(localStorage.getItem('statistic'));
    const keys = Object.keys(statistic);

    let arr = [];
    keys.forEach(key => {
        if (key !== 'sections') {
            statistic[key].forEach(i => {
                arr.push(i);
            })
        }
    })
    return(arr);
}

function sortWordAlphabet(arr, filter) {
    arr.sort((a, b) => {
        if (b[filter] < a[filter]) {
            return 1;
        } else {
            return -1;
        }
    })
    return arr;
}
function sortPercent(arr) {
    arr.sort((a, b) => {
        let aNew = Math.floor(a.errors/a.playClick) * 100 | 0;
        let bNew = Math.floor(b.errors/b.playClick) * 100 | 0;
        if (aNew > bNew) {
            return 1;
        } else {
            return -1;
        }
    })
    return arr;
}

function createStatisticsBySection(keys) {

    let statistic = JSON.parse(localStorage.getItem('statistic'));
    let num = 1;

    keys.forEach(key => {
        if (key !== 'sections') {
            statistic[key].forEach(({title, translate, trainClick, playClick, errors}) => {
                (0,_statisticPageLayout__WEBPACK_IMPORTED_MODULE_0__.createStatistics)(num, key, title, translate, trainClick, playClick, errors);
                num++;
            })
        }
    })
}

function createStatisticsByWord(arr) {
    let num = 1;

    arr.forEach(({title, translate, trainClick, playClick, errors, key}) => {
        (0,_statisticPageLayout__WEBPACK_IMPORTED_MODULE_0__.createStatistics)(num, key, title, translate, trainClick, playClick, errors);
        num++;
    })
}

function statisticFilter(filter, reverse) {
    cleanTBody();

    let statistic = JSON.parse(localStorage.getItem('statistic'));
    const keys = Object.keys(statistic);

    switch(filter) {
        case "Category":
            reverse ? keys.sort() : keys.sort().reverse();
            createStatisticsBySection(keys);
            break;
        case "Sr. No.":
            reverse ? keys : keys.reverse();
            createStatisticsBySection(keys);
            break;
        case "Word":
            let newArr = (reverse ? sortWordAlphabet(returnAllWords(), 'title') : sortWordAlphabet(returnAllWords(), 'title').reverse());
            createStatisticsByWord(newArr);
            break;
        case "Translation":
            let arr = (reverse ? sortWordAlphabet(returnAllWords(), 'translate') : sortWordAlphabet(returnAllWords(), 'translate').reverse());
            createStatisticsByWord(arr);
            break;
        case "trainClick":
            let clickArr = (reverse ? sortWordAlphabet(returnAllWords(), 'trainClick') : sortWordAlphabet(returnAllWords(), 'trainClick').reverse());
            createStatisticsByWord(clickArr);
            break;
        case "playClick":
            let clickArrPlay = (reverse ? sortWordAlphabet(returnAllWords(), 'playClick') : sortWordAlphabet(returnAllWords(), 'playClick').reverse());
            createStatisticsByWord(clickArrPlay);
            break;
        case "errors":
            let errorClick = (reverse ? sortWordAlphabet(returnAllWords(), 'errors') : sortWordAlphabet(returnAllWords(), 'errors').reverse());
            createStatisticsByWord(errorClick);
            break;
        case "percent":
            let perClick = (reverse ? sortPercent(returnAllWords()) : sortPercent(returnAllWords()).reverse());
            createStatisticsByWord(perClick);
            break;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (statisticFilter);

/***/ }),

/***/ "./js/pages/statisticsPage/statisticPageLayout.js":
/*!********************************************************!*\
  !*** ./js/pages/statisticsPage/statisticPageLayout.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStatistics": () => (/* binding */ createStatistics),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createLocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createLocalStorage */ "./js/pages/statisticsPage/createLocalStorage.js");
/* harmony import */ var _statisticFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statisticFilter */ "./js/pages/statisticsPage/statisticFilter.js");



function createTh(parent, inner) {

    let heading = document.createElement('th');
    heading.classList.add('dropdown');

    switch (inner) {
        case "trainClick":
            heading.classList.add('train-column');
            break;
        case "playClick":
            heading.classList.add('play-column');
            break;
        case "errors":
            heading.classList.add('errors-column');
            break;
        case "percent":
            heading.classList.add('percent-column');
            break;
    }
    heading.innerHTML = `
        <button class="dropbtn">${inner}
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content hide">
            <div class="ascending">In ascending order</div>
            <div class="descending">In descending order</div>
        </div>
    `;
    
    let ascending = heading.querySelector('.ascending');
    let descending = heading.querySelector('.descending');

    ascending.addEventListener('click', () => {
        (0,_statisticFilter__WEBPACK_IMPORTED_MODULE_1__["default"])(inner, true);
    })
    descending.addEventListener('click', () => {
        ;(0,_statisticFilter__WEBPACK_IMPORTED_MODULE_1__["default"])(inner, false);
    })
    parent.appendChild(heading);
}

function createRow(parent, inner, addClass = null) {
    let row_data = document.createElement('td');
    row_data.textContent = inner;
    if (addClass) {
        row_data.classList.add(addClass);
    }
    if (inner === 'Food1' || inner === 'Food2' || inner === 'Nature' || inner === 'Animals1' || inner === 'Animals2' || inner === 'Birds' || inner === "Products1" || inner === "Products2") {
        row_data.classList.add('category-icon');
        switch (inner) {
            case 'Food1':
                row_data.classList.add('category-icon-red');
                break;
            case "Food2": 
                row_data.classList.add('category-icon-blue');
                break;
            case "Nature":
                row_data.classList.add('category-icon-green');
                break;
            case "Animals1": 
                row_data.classList.add('category-icon-pink');
                break;
            case "Animals2":
                row_data.classList.add('category-icon-orange');
                break;
            case "Birds":
                row_data.classList.add('category-icon-violet');
                break;
            case "Products1":
                row_data.classList.add('category-icon-sky');
                break
            case "Products2":
                row_data.classList.add('category-icon-grey');
                break;
        }
    }
    parent.appendChild(row_data);
}

function createStatistics(num, category, word, translation, trainClick, playClick, errors) {
    
    let tbody = document.querySelector('tbody');
    
    let percent = Math.floor(errors/playClick)*100 | 0;
    
    let row = document.createElement('tr');

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

function createStatisticBtn(container) {

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

    resetBtn.addEventListener('click', () => {
        (0,_createLocalStorage__WEBPACK_IMPORTED_MODULE_0__.resetStatistic)();
    })
    diffBtn.addEventListener('click', () => {
        // trainDifficultWords();
        console.log('train diff');
    })
}

function createStatisticsPageLayout() {

    const container = document.querySelector('.album').querySelector('.container');

    if (!container.querySelector('.btn-group')) {
        createStatisticBtn(container);
    }
    
    if (!document.querySelector('table')) {

        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        container.appendChild(table);

        let row_1 = document.createElement('tr');
        createTh(row_1, "Sr. No.");
        createTh(row_1, "Category");
        createTh(row_1, "Word");
        createTh(row_1, "Translation");
        createTh(row_1, "trainClick");
        createTh(row_1, "playClick");
        createTh(row_1, "errors");
        createTh(row_1, "percent");

        thead.appendChild(row_1);

        (0,_statisticFilter__WEBPACK_IMPORTED_MODULE_1__["default"])('Sr. No.', true);

        window.addEventListener('click', closeDropdownContent);
    } else {
        document.querySelector('table').remove();
        createStatisticsPageLayout();
        window.removeEventListener('click', closeDropdownContent);
    }
}

function closeDropdownContent(e) {
    if (!e.target.classList.contains('dropbtn')) {
        let myDropdowns = document.querySelectorAll(".dropdown-content");
        myDropdowns.forEach(i => {
            if (!i.classList.contains('hide')) {
                i.classList.add('hide');
            }
        })
    }
    if (e.target.classList.contains('dropbtn')) {
        let allContents = document.querySelectorAll('.dropdown-content');
        let content = e.target.parentElement.querySelector('.dropdown-content');

        allContents.forEach(i => {
            if (!i.classList.contains('hide') && content !== i) {
                i.classList.add('hide');
            } else if (content === i) {
                content.classList.toggle('hide');
            }
        }) 
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStatisticsPageLayout);


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
/* harmony import */ var _categoryPage_changeMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categoryPage/changeMode */ "./js/pages/categoryPage/changeMode.js");
/* harmony import */ var _categoryPage_clickPlayButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./categoryPage/clickPlayButton */ "./js/pages/categoryPage/clickPlayButton.js");



function applyTheme(themeName) {
    let themeUrl = `css/${themeName}-theme.css`;
    document.querySelector('[title="theme"]').setAttribute('href', themeUrl);
    localStorage.setItem('theme', themeName);   

    if (themeName === 'train') {
        (0,_categoryPage_clickPlayButton__WEBPACK_IMPORTED_MODULE_1__.cleanForNewGame)();
        (0,_categoryPage_clickPlayButton__WEBPACK_IMPORTED_MODULE_1__.hideBlockOnPlay)();
    }
}

function firstCheckTheme() {
    let activeTheme = localStorage.getItem('theme');
    activeTheme ? applyTheme(activeTheme) : applyTheme('train');

    const toggle = document.querySelector('#toggle');
    
    if (activeTheme === 'play') {
        toggle.setAttribute("aria-checked", true);
        toggle.setAttribute('checked', true);
    }

    toggle.addEventListener('change', () => {
        (0,_categoryPage_changeMode__WEBPACK_IMPORTED_MODULE_0__.changeMode)()
    }) 
}



/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pages_mainPage_mainPageLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/mainPage/mainPageLayout */ "./js/pages/mainPage/mainPageLayout.js");
/* harmony import */ var _pages_showPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/showPage */ "./js/pages/showPage.js");
/* harmony import */ var _pages_header_headerCreater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/header/headerCreater */ "./js/pages/header/headerCreater.js");
/* harmony import */ var _pages_toggleTheme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/toggleTheme */ "./js/pages/toggleTheme.js");
/* harmony import */ var _pages_categoryPage_categoryCardCreate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/categoryPage/categoryCardCreate */ "./js/pages/categoryPage/categoryCardCreate.js");
/* harmony import */ var _pages_categoryPage_clickPlayButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/categoryPage/clickPlayButton */ "./js/pages/categoryPage/clickPlayButton.js");
/* harmony import */ var _pages_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/statisticsPage/createLocalStorage */ "./js/pages/statisticsPage/createLocalStorage.js");
const url = 'https://irmakdak.github.io/English-for-kids/cards.json';
function getUrl() {
    return url;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getUrl);









document.addEventListener("DOMContentLoaded", () => {

    (0,_pages_header_headerCreater__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_pages_mainPage_mainPageLayout__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_pages_showPage__WEBPACK_IMPORTED_MODULE_1__["default"])('sections');

    (0,_pages_categoryPage_clickPlayButton__WEBPACK_IMPORTED_MODULE_5__.clickPlayBtn)();

    (0,_pages_toggleTheme__WEBPACK_IMPORTED_MODULE_3__.firstCheckTheme)();
    (0,_pages_categoryPage_categoryCardCreate__WEBPACK_IMPORTED_MODULE_4__.flipCardByClick)();
    
    if (!localStorage.getItem('statistic')) {
        (0,_pages_statisticsPage_createLocalStorage__WEBPACK_IMPORTED_MODULE_6__["default"])();
    }
})


/***/ }),

/***/ "./js/services/getResource.js":
/*!************************************!*\
  !*** ./js/services/getResource.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../script */ "./js/script.js");


const getResource = async() => {
  const url = (0,_script__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const res = await fetch(url, {
      method: "GET"
    }) 
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    } else {
      return await res.json();
    }
  };
  
  

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map
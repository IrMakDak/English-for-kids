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
/* harmony export */   "CategoryCard": () => (/* binding */ CategoryCard)
/* harmony export */ });
class CategoryCard {
    constructor(src, title, translate, audio, parent) {
        this.src = src;
        this.alt = title + '-img';
        this.title = title;
        this.translate = translate;
        this.audio = audio;
        this.parent = parent;
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

                if (e.target !== col.querySelector('.translate-icon')) {
                    new Audio(`${this.audio}`).play();
                } else {
                    turnOverCard(col);
                }
            })
        }
        if (localStorage.getItem('theme') === 'play') {
            col.innerHTML = `
                <div class="card">
                    <img src=${this.src} alt=${this.alt} class="album-img">
                </div>
            `;
        }
        this.parent.append(col);   
    }
}

function turnOverCard(parentOfCard) {
    let card = parentOfCard.querySelector('.card');
    let cardInverted = parentOfCard.querySelector('.card-inverted');

    card.style = 'transform: rotateY(180deg);';
    cardInverted.style = 'transform: rotateY(360deg);';

    cardInverted.addEventListener("mouseout", () => {
        card.style = '';
        cardInverted.style = '';
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
/* harmony export */   "applyTheme": () => (/* reexport safe */ _toggleTheme__WEBPACK_IMPORTED_MODULE_1__.applyTheme),
/* harmony export */   "changeMode": () => (/* binding */ changeMode)
/* harmony export */ });
/* harmony import */ var _showPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../showPage */ "./js/pages/showPage.js");
/* harmony import */ var _toggleTheme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toggleTheme */ "./js/pages/toggleTheme.js");



function startPlayingMode (url) {
    let currentPage = localStorage.getItem('page');

    if (currentPage !== 'sections') {
        (0,_showPage__WEBPACK_IMPORTED_MODULE_0__["default"])(url, currentPage);
    }
}
function startTrainMode(url) {

    let currentPage = localStorage.getItem('page');

    if (currentPage !== 'sections') {
        (0,_showPage__WEBPACK_IMPORTED_MODULE_0__["default"])(url, currentPage);
    }
}

function changeMode (url) {

    toggle.setAttribute("aria-checked", toggle.checked);

    if (toggle.checked === true) {
        (0,_toggleTheme__WEBPACK_IMPORTED_MODULE_1__.applyTheme)('play');
        startPlayingMode(url);
    } else {
        (0,_toggleTheme__WEBPACK_IMPORTED_MODULE_1__.applyTheme)('train');
        startTrainMode(url);
    } 
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




function createHeader(url) {

    (0,_headerLayout__WEBPACK_IMPORTED_MODULE_2__["default"])();

    const btnMain = document.querySelector('.main-page');
    btnMain.addEventListener('click', () => {
        (0,_showPage__WEBPACK_IMPORTED_MODULE_1__["default"])(url, 'sections');
    });
    
    (0,_services_getResource__WEBPACK_IMPORTED_MODULE_0__.getResource)(url)
    .then(data => {
        data.sections.forEach(i => {
            new liCreate(i.title, url).render();
        })
    })
}

class liCreate {
    constructor(title, url) {
        this.title = title;
        this.url = url;
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
            (0,_showPage__WEBPACK_IMPORTED_MODULE_1__["default"])(this.url, this.title);
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
                <h4 class="main-page">Main Page</h4>
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
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">Train & Play</h1>
                </div>
            </div>
        </section>

        <div class="album py-5 bg-light">
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
    constructor(src, title, cardsNum = 0, parent, url) {
        this.src = src;
        this.alt = title + '-img';
        this.title = title;
        this.parent = parent;
        this.cardsNum = cardsNum;
        this.url = url;
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
            (0,_showPage__WEBPACK_IMPORTED_MODULE_0__["default"])(this.url, this.title);
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




function showPage(url, category) {

    localStorage.setItem('page', category);

    const album = document.querySelector('.album');
    const cardParent = album.querySelector('.row');

    while (cardParent.firstChild) {
        cardParent.removeChild(cardParent.firstChild);
    }

    let request = category.toLowerCase().replaceAll(' ', '');
    

    if (request === 'sections') {
        (0,_services_getResource__WEBPACK_IMPORTED_MODULE_2__.getResource)(url)
        .then(data => {
            data.sections.forEach(({src, title}) => {
                let requestN = title.toLowerCase().replaceAll(' ', '');
                let cardsNum = data[requestN].length;
                new _mainPage_sectionsCardsCreater__WEBPACK_IMPORTED_MODULE_0__["default"](src, title, cardsNum, cardParent, url).render();
            })
        })
    } else {
        (0,_services_getResource__WEBPACK_IMPORTED_MODULE_2__.getResource)(url)
        .then(data => {
            data[request].forEach(({src, title, translate, audio}) => {
                new _categoryPage_categoryCardCreate__WEBPACK_IMPORTED_MODULE_1__.CategoryCard(src, title, translate, audio, cardParent).render();
            })
        })
    }    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showPage);

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


function applyTheme(themeName) {
    let themeUrl = `css/${themeName}-theme.css`;
    document.querySelector('[title="theme"]').setAttribute('href', themeUrl);
    localStorage.setItem('theme', themeName);   
}

function firstCheckTheme(url) {
    let activeTheme = localStorage.getItem('theme');
    activeTheme ? applyTheme(activeTheme) : applyTheme('train');

    const toggle = document.querySelector('#toggle');
    
    if (activeTheme === 'play') {
        toggle.setAttribute("aria-checked", true);
        toggle.setAttribute('checked', true);
    }

    toggle.addEventListener('change', () => {
        (0,_categoryPage_changeMode__WEBPACK_IMPORTED_MODULE_0__.changeMode)(url)
    }) 
}



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
const getResource = async(url) => {
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_mainPage_mainPageLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/mainPage/mainPageLayout */ "./js/pages/mainPage/mainPageLayout.js");
/* harmony import */ var _pages_showPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/showPage */ "./js/pages/showPage.js");
/* harmony import */ var _pages_header_headerCreater__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/header/headerCreater */ "./js/pages/header/headerCreater.js");
/* harmony import */ var _pages_toggleTheme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/toggleTheme */ "./js/pages/toggleTheme.js");





document.addEventListener("DOMContentLoaded", () => {
    const url = 'https://irmakdak.github.io/English-for-kids/cards.json';

    (0,_pages_header_headerCreater__WEBPACK_IMPORTED_MODULE_2__["default"])(url);
    (0,_pages_mainPage_mainPageLayout__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_pages_showPage__WEBPACK_IMPORTED_MODULE_1__["default"])(url, 'sections');

    (0,_pages_toggleTheme__WEBPACK_IMPORTED_MODULE_3__.firstCheckTheme)(url);
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
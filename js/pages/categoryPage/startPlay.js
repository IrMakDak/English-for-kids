import { showBlockOnPlay, changeTextOnBtn, showTextUnderPlayBtn } from "./clickPlayButton";
import { editStatistics } from "../statisticsPage/createLocalStorage";
import { returnAllWords } from "../statisticsPage/trainDifficultWords";
import { shortName } from "../showPage";

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
    showBlockOnPlay();
    changeTextOnBtn('PLAY');
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
        showTextUnderPlayBtn('You lose. Click to play again');
        new Audio('./assets/audio/loseGame.mp3').play();
    } else {
        result.setAttribute('src', './assets/icons/win.jpg');
        showTextUnderPlayBtn('You won! Click to play again');
        new Audio('./assets/audio/winGame.mp3').play();
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

function blockCardClick(blockCard) {
    document.querySelector(`#${blockCard}`).classList.add('block-card');
}

function checkCorrectCard(e) {
    let blockCard = shortName(getCurrentCard().title);

    if (e.target.getAttribute('id') === blockCard){    
        new Audio('./assets/audio/win.mp3').play();
        editStatistics(getCurrentCard().key, getCurrentCard().title, 'playClick');

        deleteListenersForPlay();

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
        editStatistics(getCurrentCard().key, getCurrentCard().title, 'errors');
        editStatistics(getCurrentCard().key, getCurrentCard().title, 'playClick');
    }
}

function setNextCardAsActive() {

    const resourse = JSON.parse(localStorage.getItem('statistic'));
    let currentPage = localStorage.getItem('page');

    let cards = document.querySelectorAll('.card');
    let numOfActiveCard = getCardsOrder()[0];

    let activeCard = cards[numOfActiveCard];
    let currentCardObj;
    let arrForSearch;

    if (currentPage !== 'difficult') {
        arrForSearch = resourse[currentPage];
    } else {
        arrForSearch = returnAllWords();
    }
    arrForSearch.forEach(i => {
        if (i.title.toLocaleLowerCase().replace(' ', '') === activeCard.id) {
            currentCardObj = i;
        }
    })
    setCurrentCard(currentCardObj);

    new Audio(currentCardObj.audio).play();

    createListenersForPlay();
}

function startPlay() {
    let cards = document.querySelectorAll('.block-card');
    cards.forEach(card => {
        card.classList.remove('block-card');
    })
    createArray(document.querySelectorAll('.card').length);
    setNextCardAsActive();
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
export {startPlay, repeatAudio, getCardsOrder, getCurrentCard, setCurrentCard};
import { getResource } from "../../services/getResource";
import { showBlockOnPlay, changeTextOnBtn, showTextUnderPlayBtn } from "./clickPlayButton";

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
    } else {
        result.setAttribute('src', './assets/icons/win.jpg');
        showTextUnderPlayBtn('You won! Click to play again');
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
            showBlockOnPlay();
            changeTextOnBtn('PLAY');
            showResult();
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
    if (e.target.getAttribute('id') === getCurrentCard().title.replaceAll(' ', '').toLowerCase()){
        new Audio('./assets/audio/win.mp3').play();

        deleteListenersForPlay();

        getCardsOrder().shift();
        setCardsOrder(getCardsOrder());
        blockCardClick();

        if (getCardsOrder().length >= 1) {
            addHeart('GOOD');
            setNextCardAsActive();
        } else {
            showBlockOnPlay();
            changeTextOnBtn('PLAY');
            showResult();
        }
    } else {
        addHeart('BAD');
        new Audio('./assets/audio/fail.mp3').play();
    }
}

function setNextCardAsActive() {
    getResource()
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
    if (document.querySelector('.hearts-container')) {
        document.querySelector('.hearts-container').remove()
    }

    let currentPage = localStorage.getItem('page');
    currentPage = currentPage.replaceAll(' ', '').toLowerCase();

    getResource()
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
export {startPlay, repeatAudio};
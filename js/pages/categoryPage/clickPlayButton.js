import {startPlay, repeatAudio} from "./startPlay";

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

            startPlay();
        } else if (block.classList.contains('hide') && localStorage.getItem('page') !== 'sections' && btnPlay.textContent === 'REPEAT') {
            repeatAudio();
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

export {showBlockOnPlay, hideBlockOnPlay, clickPlayBtn, changeTextOnBtn, showTextUnderPlayBtn, cleanForNewGame};
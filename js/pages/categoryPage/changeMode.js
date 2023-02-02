import showPage from '../showPage';
import { applyTheme } from '../toggleTheme';
import playMode from './playMode';

function startPlayingMode (url) {
    let currentPage = localStorage.getItem('page');

    if (currentPage !== 'sections') {
        showPage(url, currentPage);
        playMode();
    }
}
function startTrainMode(url) {

    let currentPage = localStorage.getItem('page');

    if (currentPage !== 'sections') {
        showPage(url, currentPage);
    }
}

function changeMode (url) {

    toggle.setAttribute("aria-checked", toggle.checked);

    if (toggle.checked === true) {
        applyTheme('play');
        startPlayingMode(url);
    } else {
        applyTheme('train');
        startTrainMode(url);
    } 
}

export {changeMode, applyTheme};
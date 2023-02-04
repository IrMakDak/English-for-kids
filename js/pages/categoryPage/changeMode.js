import showPage from '../showPage';
import { applyTheme } from '../toggleTheme';

function changeMode () {

    toggle.setAttribute("aria-checked", toggle.checked);
    let currentPage = localStorage.getItem('page');

    if (toggle.checked === true) {
        applyTheme('play');
    } else {
        applyTheme('train');
    } 
    if (currentPage !== 'sections') {
        showPage(currentPage);
    }
}

export {changeMode};
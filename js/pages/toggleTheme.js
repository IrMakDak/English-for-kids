import { changeMode } from "./categoryPage/changeMode";
import { hideBlockOnPlay, cleanForNewGame } from "./categoryPage/clickPlayButton";

function applyTheme(themeName) {
    let themeUrl = `css/${themeName}-theme.css`;
    document.querySelector('[title="theme"]').setAttribute('href', themeUrl);
    localStorage.setItem('theme', themeName);   

    if (themeName === 'train') {
        cleanForNewGame();
        hideBlockOnPlay();
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
        changeMode()
    }) 
}

export {firstCheckTheme, applyTheme};
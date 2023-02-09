const url = 'https://irmakdak.github.io/English-for-kids/cards.json';
function getUrl() {
    return url;
}
export default getUrl;

import mainPageLayout from "./pages/mainPage/mainPageLayout";
import showPage from "./pages/showPage";
import createHeader from "./pages/header/headerCreater";
import { firstCheckTheme } from "./pages/toggleTheme";
import { flipCardByClick } from "./pages/categoryPage/categoryCardCreate";
import { clickPlayBtn } from "./pages/categoryPage/clickPlayButton";
import createLocalStorage from "./pages/statisticsPage/createLocalStorage";

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('statistic')) {
        createLocalStorage()
        .then(() => {
            start();
        })
    } else {
        start();
    }
})

function start() {
    createHeader();
    mainPageLayout();
    showPage('sections');

    clickPlayBtn();

    firstCheckTheme();
    flipCardByClick();
}

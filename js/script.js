import mainPageLayout from "./pages/mainPage/mainPageLayout";
import showPage from "./pages/showPage";
import createHeader from "./pages/header/headerCreater";
import { firstCheckTheme } from "./pages/toggleTheme";
import { flipCard } from "./pages/categoryPage/categoryCardCreate";

document.addEventListener("DOMContentLoaded", () => {
    const url = 'https://irmakdak.github.io/English-for-kids/cards.json';

    createHeader(url);
    mainPageLayout();
    showPage(url, 'sections');

    firstCheckTheme(url);
    flipCard();
})
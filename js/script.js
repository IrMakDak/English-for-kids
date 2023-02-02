import mainPageLayout from "./pages/mainPage/mainPageLayout";
import showPage from "./pages/showPage";
import createHeader from "./pages/header/headerCreater";
import { firstCheckTheme } from "./pages/toggleTheme";

document.addEventListener("DOMContentLoaded", () => {
    const url = 'http://localhost:3000';

    createHeader(url);
    mainPageLayout();
    showPage(url, 'sections');

    firstCheckTheme(url);
})
import Card from "./mainPage/sectionsCardsCreater";
import { CategoryCard } from "./categoryPage/categoryCardCreate";
import {getResource} from "../services/getResource";
import { showBlockOnPlay, hideBlockOnPlay, cleanForNewGame, changeTextOnBtn} from "./categoryPage/clickPlayButton";
import createStatisticsPageLayout from "./statisticsPage/statisticPageLayout";
import { difficultPageCreate } from "./statisticsPage/trainDifficultWords";

function cleanPage() {
    const album = document.querySelector('.album');
    const cardParent = album.querySelector('.row');
    const table = document.querySelector('table');
    const btnPlay = document.querySelector('.btn');

    if (btnPlay.classList.contains('hide')) {
        btnPlay.classList.remove('hide');
    }

    if (table) {
        table.remove();
    }
    while (cardParent.firstChild) {
        cardParent.removeChild(cardParent.firstChild);
    }
}

function showPage(category) {
    cleanPage();
    cleanForNewGame();
    changeTextOnBtn('PLAY');

    localStorage.setItem('page', category);
    let request = category.toLowerCase().replaceAll(' ', '');

    if (request === 'sections') {
        hideBlockOnPlay();
        getResource()
        .then(data => {
            data.sections.forEach(({src, title}) => {
                let requestN = title.toLowerCase().replaceAll(' ', '');
                let cardsNum = data[requestN].length;
                new Card(src, title, cardsNum).render();
            })
        })
    } else if (request === 'difficult') {
        showBlockOnPlay();
        difficultPageCreate();
    } else if (request === 'statistic') {
        hideBlockOnPlay();
        createStatisticsPageLayout();
        document.querySelector('.btn').classList.add('hide');
    } else {
        showBlockOnPlay();
        const resourse = JSON.parse(localStorage.getItem('statistic'));
        resourse[request].forEach(({src, title, translate, audio, key}) => {
            new CategoryCard(src, title, translate, audio, key).render();
        })
    }    
}

export default showPage;
import Card from "./mainPage/sectionsCardsCreater";
import { CategoryCard } from "./categoryPage/categoryCardCreate";
import { showBlockOnPlay, hideBlockOnPlay, cleanForNewGame, changeTextOnBtn} from "./categoryPage/clickPlayButton";
import createStatisticsPageLayout from "./statisticsPage/statisticPageLayout";
import { difficultPageCreate } from "./statisticsPage/trainDifficultWords";
import { closeMenu } from "./header/headerLayout";

function shortName(name) {
    return name.toLowerCase().replaceAll(' ', '');
}

function hidePlayBtn() {
    document.querySelector('.btn').classList.add('hide');
}
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
    closeMenu();
    cleanPage();
    cleanForNewGame();
    changeTextOnBtn('PLAY');

    category = shortName(category);
    localStorage.setItem('page', category);
    
    const resourse = JSON.parse(localStorage.getItem('statistic'));
    if (category === 'sections') {
        
        hideBlockOnPlay();
        resourse.sections.forEach(({src, title}) => {
            let cardsNum = resourse[shortName(title)].length;
            new Card(src, title, cardsNum).render();
        })
    } else if (category === 'difficult') {
        showBlockOnPlay();
        difficultPageCreate();
    } else if (category === 'statistic') {
        hideBlockOnPlay();
        createStatisticsPageLayout();
        hidePlayBtn();
    } else {
        showBlockOnPlay();
        
        resourse[category].forEach(({src, title, translate, audio, key}) => {
            new CategoryCard(src, title, translate, audio, key).render();
        })
    }    
}

export default showPage;
export {hidePlayBtn, shortName};
import Card from "./mainPage/sectionsCardsCreater";
import { CategoryCard } from "./categoryPage/categoryCardCreate";
import {getResource} from "../services/getResource";
import { showBlockOnPlay, hideBlockOnPlay, cleanTextUnderPlayBtn, changeTextOnBtn} from "./categoryPage/clickPlayButton";

function cleanPage() {
    const cardParent = document.querySelector('.album').querySelector('.row');

    while (cardParent.firstChild) {
        cardParent.removeChild(cardParent.firstChild);
    }
}

function showPage(category) {

    localStorage.setItem('page', category);
    let request = category.toLowerCase().replaceAll(' ', '');

    cleanPage();

    changeTextOnBtn('PLAY');
    cleanTextUnderPlayBtn();
    
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
    } else {
        showBlockOnPlay();
        getResource()
        .then(data => {
            data[request].forEach(({src, title, translate, audio}) => {
                new CategoryCard(src, title, translate, audio).render();
            })
        })
    }    
}

export default showPage;
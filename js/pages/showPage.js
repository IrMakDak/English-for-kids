import Card from "./mainPage/sectionsCardsCreater";
import { CategoryCard } from "./categoryPage/categoryCardCreate";
import {getResource} from "../services/getResource";

function showPage(url, category) {

    localStorage.setItem('page', category);

    const album = document.querySelector('.album');
    const cardParent = album.querySelector('.row');

    while (cardParent.firstChild) {
        cardParent.removeChild(cardParent.firstChild);
    }

    let request = category.toLowerCase().replaceAll(' ', '');
    

    if (request === 'sections') {
        getResource(url)
        .then(data => {
            data.sections.forEach(({src, title}) => {
                let requestN = title.toLowerCase().replaceAll(' ', '');
                let cardsNum = data[requestN].length;
                new Card(src, title, cardsNum, cardParent, url).render();
            })
        })
    } else {
        getResource(url)
        .then(data => {
            data[request].forEach(({src, title, translate, audio}) => {
                new CategoryCard(src, title, translate, audio, cardParent).render();
            })
        })
    }    
}

export default showPage;
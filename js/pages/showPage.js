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
        getResource(`${url}/${request}`)
        .then(data => {
            data.forEach(({src, title}) => {
                let requestN = title.toLowerCase().replaceAll(' ', '');
                getResource(`${url}/${requestN}`)
                .then(
                    dataN => {
                        let cardsNum = dataN.length;
                        new Card(src, title, cardsNum, cardParent, url).render();
                    }
                )
            })
        })
    } else {
        getResource(`${url}/${request}`)
        .then(data => {
            data.forEach(({src, title, translate, audio}) => {
                new CategoryCard(src, title, translate, audio, cardParent).render();
            })
        })
    }    
}

export default showPage;
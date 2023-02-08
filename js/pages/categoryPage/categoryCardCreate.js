import { editStatistics } from "../statisticsPage/createLocalStorage";
import { shortName } from "../showPage";

class CategoryCard {
    constructor(src, title, translate, audio, key) {
        this.src = src;
        this.alt = title.replaceAll(' ', '') + '-img';
        this.title = title;
        this.translate = translate;
        this.audio = audio;
        this.parent = document.querySelector('.album').querySelector('.row');
        this.id = shortName(title);
        this.key = key;
    }
    render() {

        const col = document.createElement("div");
        col.classList.add("col");

        if (localStorage.getItem('theme') === 'train') {
            col.innerHTML = `
                <div class="card card__front">
                    <img src=${this.src} alt=${this.alt} class="album-img">
                    <div class="cards-numbers">
                        <p class="card-text">${this.title}</p>
                        <img src="./assets/icons/turnOverCard.png" alt="turn over" class="translate-icon">
                    </div>
                </div>
                <div class="card-inverted card__back">
                    <div class="translate">${this.translate}</div>
                </div>
            `;
            col.querySelector('.card').addEventListener('click', (e) => {
                console.log(this.key)
                editStatistics(this.key, this.title, 'trainClick');
                if (e.target !== col.querySelector('.translate-icon')) {
                    new Audio(`${this.audio}`).play();
                } else {
                    turnOverCard(col);
                }
            })
        }
        if (localStorage.getItem('theme') === 'play') {
            col.innerHTML = `
                <div class="card" id=${this.id}>
                    <img src=${this.src} alt=${this.alt} class="album-img">
                </div>
            `;
        }
        this.parent.append(col);   
    }
}

function turnOverCard(parentOfCard) {

    let cleanCards = document.querySelectorAll('.rotate180');
    let cleanInv = document.querySelectorAll('.rotate360');

    if (cleanCards) {
        cleanCards.forEach(i => {
            i.classList.remove('rotate180');
        })
    }
    if (cleanInv) {
        cleanInv.forEach(i => {
            i.classList.remove('rotate360');
        })
    }

    let card = parentOfCard.querySelector('.card');
    let cardInverted = parentOfCard.querySelector('.card-inverted');

    card.classList.add('rotate180');
    cardInverted.classList.add('rotate360');

    cardInverted.addEventListener("mouseout", () => {
        card.classList.remove('rotate180');
        cardInverted.classList.remove('rotate360');
    })
}

function flipCardByClick() {
    document.querySelector('main').addEventListener('click', (e) => {
        let cardsInverted = document.querySelectorAll('.card-inverted');

        cardsInverted.forEach(i => {
            if (i.classList.contains('rotate360') && !e.target.classList.contains('translate-icon')) {

                let card = i.parentElement.firstElementChild;
                card.classList.remove('rotate180');
                i.classList.remove('rotate360');
            }
        });
    })
}

export {CategoryCard, flipCardByClick};
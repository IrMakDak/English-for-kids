class CategoryCard {
    constructor(src, title, translate, audio, parent) {
        this.src = src;
        this.alt = title + '-img';
        this.title = title;
        this.translate = translate;
        this.audio = audio;
        this.parent = parent;
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

                if (e.target !== col.querySelector('.translate-icon')) {
                    new Audio(`${this.audio}`).play();
                } else {
                    turnOverCard(col);
                }
            })
        }
        if (localStorage.getItem('theme') === 'play') {
            col.innerHTML = `
                <div class="card">
                    <img src=${this.src} alt=${this.alt} class="album-img">
                </div>
            `;
        }
        this.parent.append(col);   
    }
}

function turnOverCard(parentOfCard) {
    let card = parentOfCard.querySelector('.card');
    let cardInverted = parentOfCard.querySelector('.card-inverted');

    card.style = 'transform: rotateY(180deg);';
    cardInverted.style = 'transform: rotateY(360deg);';

    cardInverted.addEventListener("mouseout", () => {
        card.style = '';
        cardInverted.style = '';
    })
}

export {CategoryCard};
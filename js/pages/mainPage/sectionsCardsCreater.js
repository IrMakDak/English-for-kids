import showPage from "../showPage";

class Card {
    constructor(src, title, cardsNum = 0) {
        this.src = src;
        this.alt = title + '-img';
        this.title = title;
        this.parent = document.querySelector('.album').querySelector('.row');
        this.cardsNum = cardsNum;
    }
    render() {
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `
            <div class="card">
                <img src=${this.src} alt=${this.alt} class="album-img">
                    <div class="cards-numbers">
                        <p class="card-text">${this.title}</p>
                        <small class="text-muted">${this.cardsNum} cards</small>
                    </div>
                </div>
            </div>
        `;
        this.parent.append(col);

        const card = col.querySelector('.card');
        card.addEventListener('click', () => {
            showPage(this.title);
        })
    }
}
export default Card;





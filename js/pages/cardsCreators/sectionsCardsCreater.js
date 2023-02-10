class Card {
  constructor(src, title, key, cardsNum = 0) {
    this.src = src;
    this.alt = `${key}-img`;
    this.title = title;
    this.key = key;
    this.parent = document.querySelector('.album').querySelector('.row');
    this.cardsNum = cardsNum;
  }

  render() {
    const col = document.createElement('div');
    col.classList.add('col');
    col.innerHTML = `
            <div class="card" id=${this.key}>
                <img src=${this.src} alt=${this.alt} class="album-img">
                    <div class="cards-numbers">
                        <p class="card-text">${this.title}</p>
                        <small class="text-muted">${this.cardsNum} cards</small>
                    </div>
                </div>
            </div>
        `;
    this.parent.append(col);
  }
}
export default Card;

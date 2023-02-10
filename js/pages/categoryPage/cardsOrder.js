let currentCard;
let cardsOrder;

function getCurrentCard() {
  return currentCard;
}
function setCurrentCard(val) {
  currentCard = val;
}
function getCardsOrder() {
  return cardsOrder;
}
function setCardsOrder(val) {
  cardsOrder = val;
}
function createArray(dataLength) {
  const mySet = new Set([]);
  while (mySet.size < dataLength) {
    mySet.add(Math.floor(Math.random() * (dataLength - 0)));
  }
  setCardsOrder(Array.from(mySet));
}
function repeatAudio() {
  if (getCurrentCard()) {
    new Audio(getCurrentCard().audio).play();
  }
}

export default createArray;
export {
  getCurrentCard, setCurrentCard, getCardsOrder, setCardsOrder, repeatAudio,
};

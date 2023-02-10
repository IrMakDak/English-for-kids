function cleanTextUnderPlayBtn() {
  const text = document.querySelector('.text-btn');
  if (text) {
    text.remove();
  }
}
function changeTextOnBtn(text) {
  const btn = document.querySelector('.btn');
  if (text === 'REPEAT') {
    btn.textContent = 'REPEAT';
  }
  if (text === 'PLAY') {
    btn.textContent = 'PLAY';
  }
}
function cleanForNewGame() {
  if (document.querySelector('.hearts-container')) {
    document.querySelector('.hearts-container').remove();
  }
  if (document.querySelector('.result-img')) {
    document.querySelector('.result-img').remove();
  }
  if (document.querySelector('.statistic-group')) {
    document.querySelector('.statistic-group').remove();
  }
  cleanTextUnderPlayBtn();
}
function hideBlockOnPlay() {
  const block = document.querySelector('.play-block');

  if (!block.classList.contains('hide')) {
    block.classList.add('hide');
  }
}
function showTextUnderPlayBtn(showText) {
  const parent = document.querySelector('.header-main');
  const text = document.createElement('span');

  text.classList.add('text-btn');
  text.textContent = showText;

  parent.append(text);
}
function showBlockOnPlay() {
  if (localStorage.getItem('theme') === 'play') {
    const block = document.querySelector('.play-block');

    if (block.classList.contains('hide')) {
      block.classList.remove('hide');
    }
  }
}
export default cleanForNewGame;
export {
  hideBlockOnPlay, showTextUnderPlayBtn, showBlockOnPlay, changeTextOnBtn,
};

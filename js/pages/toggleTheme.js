import cleanForNewGame, { hideBlockOnPlay } from './categoryPage/DOMFunctions';
import showPage from './showPage';

function applyTheme(themeName) {
  const themeUrl = `css/${themeName}-theme.css`;
  document.querySelector('[title="theme"]').setAttribute('href', themeUrl);
  localStorage.setItem('theme', themeName);

  if (themeName === 'train') {
    cleanForNewGame();
    hideBlockOnPlay();
  }
}
function changeMode() {
  const toggle = document.querySelector('#toggle');
  toggle.setAttribute('aria-checked', toggle.checked);
  const currentPage = localStorage.getItem('page');

  if (toggle.checked === true) {
    applyTheme('play');
  } else {
    applyTheme('train');
  }
  if (currentPage !== 'sections') {
    showPage(currentPage);
  }
}

function firstCheckTheme() {
  const activeTheme = localStorage.getItem('theme');
  if (activeTheme) {
    applyTheme(activeTheme);
  } else {
    applyTheme('train');
  }

  const toggle = document.querySelector('#toggle');

  if (activeTheme === 'play') {
    toggle.setAttribute('aria-checked', true);
    toggle.setAttribute('checked', true);
  }

  toggle.addEventListener('change', () => {
    changeMode();
  });
}

export { firstCheckTheme, applyTheme };

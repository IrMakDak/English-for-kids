function openMenu() {
  const menuBtn = document.querySelector('.toggler');
  const menu = document.querySelector('.header-container');
  const backg = document.querySelector('.background-all');

  menuBtn.classList.add('hide');
  backg.classList.remove('hide');

  setTimeout(() => {
    backg.classList.remove('hide-bg');
  }, 200);
  setTimeout(() => {
    menu.classList.remove('hide-menu-left');
  }, 200);

  document.body.style = 'overflow:  hidden;';
}
function closeMenu() {
  const menu = document.querySelector('.header-container');
  if (!menu.classList.contains('hide-menu-left')) {
    menu.classList.add('hide-menu-left');
  }
  const menuBtn = document.querySelector('.toggler');
  if (menuBtn.classList.contains('hide')) {
    menuBtn.classList.remove('hide');
  }
  const backg = document.querySelector('.background-all');
  if (!backg.classList.contains('hide-bg')) {
    backg.classList.add('hide-bg');
    setTimeout(() => {
      backg.classList.add('hide');
    }, 300);
  }
  document.body.style = '';
}

function createHeaderLayout() {
  const header = document.createElement('header');

  header.innerHTML = `
        <div class="header-cont">
            <div class="container header-container hide-menu-left">
                <div class="close">&#10008;</div>
                <div class="header-main-statistic">
                    <h4 class="main-page">Main Page</h4>
                    <h4 class="statistic-page">Statistic</h4>
                </div>
            </div>
        </div>
        <div class="navbar navbar-dark header-color shadow-sm">
            <div class="container">
                <div>
                    <button class="toggler">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            <div class="group-switch">
                <input id="toggle" class="toggle" type="checkbox" role="switch" name="toggle" value="on">
                <label for="toggle" class="slot">
                    <span class="slot__label">TRAIN</span>
                    <span class="slot__label">PLAY</span>
                </label>
            </div>
        </div>
    `;
  document.body.append(header);

  const menuBtn = header.querySelector('.toggler');
  const close = header.querySelector('.close');

  const backg = document.createElement('div');
  backg.classList.add('background-all', 'hide-bg', 'hide');
  document.body.append(backg);

  menuBtn.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  backg.addEventListener('click', closeMenu);
}

export default createHeaderLayout;
export { closeMenu };

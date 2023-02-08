function createHeaderLayout() {
    const header = document.createElement("header");

    header.innerHTML = `
        <div class="header-cont hide">
            <div class="container header-container">
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
    const menu = header.querySelector('.header-cont');
    const close = header.querySelector('.close');

    const backg = document.createElement('div');
    backg.classList.add('background-all', 'hide');
    document.body.append(backg);

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.add('hide');
        menu.classList.toggle('hide');
        backg.classList.remove('hide');
        document.body.style = 'overflow:  hidden;';
    })
    close.addEventListener('click', closeMenu);
    backg.addEventListener('click', closeMenu);

}

function closeMenu() {
    const menu = document.querySelector('.header-cont');
    if (!menu.classList.contains('hide')) {
        menu.classList.add('hide');
    }
    const menuBtn = document.querySelector('.toggler');
    if (menuBtn.classList.contains('hide')) {
        menuBtn.classList.remove('hide');
    }
    const backg = document.querySelector('.background-all');
    if (!backg.classList.contains('hide')) {
        backg.classList.add('hide');
    }
    document.body.style = '';
}
export default createHeaderLayout;
export {closeMenu};
function createHeaderLayout() {
    const header = document.createElement("header");

    header.innerHTML = `
        <div class="collapse header-color" id="navbarHeader">
            <div class="container header-container">
                <h4 class="main-page">Main Page</h4>
                <div class="container" id="headerContainer"></div>
            </div>
        </div>
        <div class="navbar navbar-dark header-color shadow-sm">
            <div class="container">
                <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
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
}
export default createHeaderLayout;
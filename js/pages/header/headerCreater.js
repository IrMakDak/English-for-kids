import showPage from "../showPage";
import createHeaderLayout from "./headerLayout";

function createHeader() {

    createHeaderLayout();

    const btnMain = document.querySelector('.main-page');
    const btnStatistic = document.querySelector('.statistic-page');

    btnMain.addEventListener('click', () => {
        showPage('sections');
    });
    btnStatistic.addEventListener('click', () => {
        showPage('statistic');
    })
    
    let resourse = JSON.parse(localStorage.getItem('statistic'));
    resourse.sections.forEach(i => {
        new liCreate(i.title).render();
    })
}

class liCreate {
    constructor(title) {
        this.title = title;
    }
    render() {
        const container = document.querySelector('.header-container');
        const li = document.createElement("li");
        li.classList.add("li-header");
        li.innerHTML = `
            <span class="change-section-header">${this.title}</span>
        `;
        container.append(li);
        const span = li.querySelector("span");
        span.addEventListener('click', () => {
            showPage(this.title);
        })
    }
}

export default createHeader;
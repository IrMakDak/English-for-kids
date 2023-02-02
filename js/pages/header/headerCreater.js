import { getResource } from "../../services/getResource";
import showPage from "../showPage";
import createHeaderLayout from "./headerLayout";

function createHeader(url) {

    createHeaderLayout();

    const btnMain = document.querySelector('.main-page');
    btnMain.addEventListener('click', () => {
        showPage(url, 'sections');
    });
    
    getResource(`${url}/sections`)
    .then(data => {
        data.forEach(i => {
            new liCreate(i.title, url).render();
        })
    })
}

class liCreate {
    constructor(title, url) {
        this.title = title;
        this.url = url;
    }
    render() {
        const container = document.querySelector('#headerContainer');
        const li = document.createElement("li");
        li.classList.add("li-header");
        li.innerHTML = `
            <span class="change-section-header">${this.title}</span>
        `;
        container.append(li);
        const span = li.querySelector("span");
        span.addEventListener('click', () => {
            showPage(this.url, this.title);
        })
    }
}

export default createHeader;
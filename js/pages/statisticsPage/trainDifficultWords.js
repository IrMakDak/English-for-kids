import {hidePlayBtn} from "../showPage";
import { returnEightErrorsOrLess, returnAllWords } from "./statisticFilter";
import { CategoryCard } from "../categoryPage/categoryCardCreate";

function zeroErrorsPage() {
    hidePlayBtn();
    const error = document.createElement('div');
    error.classList.add('zero-error');

    error.textContent = "You don't have any error cards yet";

    document.querySelector('.album').querySelector('.row').append(error);
}
function difficultPageCreate() {
    let errors = returnEightErrorsOrLess();
    if (errors.length !== 0) {
        errors.forEach(error => {
            new CategoryCard(error.src, error.title, error.translate, error.audio, error.key).render();
        })
    } else {
        zeroErrorsPage();
    }
}
export {difficultPageCreate, returnAllWords}
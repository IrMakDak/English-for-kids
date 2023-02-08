import {createStatistics} from './statisticPageLayout';

function cleanTBody() {
    let tbody = document.querySelector('tbody');
    while(tbody.firstChild) {
        tbody.firstChild.remove();
    }
}

function returnAllWords() {
    let statistic = JSON.parse(localStorage.getItem('statistic'));
    const keys = Object.keys(statistic);

    let arr = [];
    keys.forEach(key => {
        if (key !== 'sections') {
            statistic[key].forEach(i => {
                arr.push(i);
            })
        }
    })
    return(arr);
}

function tableSort(arr, filter) {
    arr.sort((a, b) => {
        let aNew;
        let bNew;
        if (filter === 'percent') {
            aNew = Math.floor(a.errors/a.playClick * 100) | 0;
            bNew = Math.floor(b.errors/b.playClick * 100) | 0;
        } else {
            aNew = a[filter];
            bNew = b[filter];
        }
        if (aNew > bNew) {
            return 1;
        } else {
            return -1;
        }
    })
    return arr;
}

function createStatisticsBySection(keys) {

    let statistic = JSON.parse(localStorage.getItem('statistic'));
    let num = 1;

    keys.forEach(key => {
        if (key !== 'sections') {
            statistic[key].forEach(({title, translate, trainClick, playClick, errors}) => {
                createStatistics(num, key, title, translate, trainClick, playClick, errors);
                num++;
            })
        }
    })
}

function createStatisticsByWord(arr) {
    let num = 1;

    arr.forEach(({title, translate, trainClick, playClick, errors, key}) => {
        createStatistics(num, key, title, translate, trainClick, playClick, errors);
        num++;
    })
}

function statisticFilter(filter, reverse) {
    cleanTBody();

    let statistic = JSON.parse(localStorage.getItem('statistic'));
    const keys = Object.keys(statistic);

    switch(filter) {
        case "Category":
            reverse ? keys.sort() : keys.sort().reverse();
            createStatisticsBySection(keys);
            break;
        case "Sr. No.":
            reverse ? keys : keys.reverse();
            createStatisticsBySection(keys);
            break;
        case "Word":
            let newArr = (reverse ? tableSort(returnAllWords(), 'title') : tableSort(returnAllWords(), 'title').reverse());
            createStatisticsByWord(newArr);
            break;
        case "Translation":
            let arr = (reverse ? tableSort(returnAllWords(), 'translate') : tableSort(returnAllWords(), 'translate').reverse());
            createStatisticsByWord(arr);
            break;
        case "trainClick":
            let clickArr = (reverse ? tableSort(returnAllWords(), 'trainClick') : tableSort(returnAllWords(), 'trainClick').reverse());
            createStatisticsByWord(clickArr);
            break;
        case "playClick":
            let clickArrPlay = (reverse ? tableSort(returnAllWords(), 'playClick') : tableSort(returnAllWords(), 'playClick').reverse());
            createStatisticsByWord(clickArrPlay);
            break;
        case "errors":
            let errorClick = (reverse ? tableSort(returnAllWords(), 'errors') : tableSort(returnAllWords(), 'errors').reverse());
            createStatisticsByWord(errorClick);
            break;
        case "percent":
            let perClick = (reverse ? tableSort(returnAllWords(), "percent") : tableSort(returnAllWords(), "percent").reverse());
            createStatisticsByWord(perClick);
            break;
    }
}

function returnEightErrorsOrLess() {
    let errorClick = tableSort(returnAllWords(), 'errors');

    errorClick = errorClick.filter(i => i.errors !== 0).reverse();
    errorClick.length >= 8 ? errorClick = errorClick.slice(0, 8) : errorClick = errorClick.slice(0, errorClick.length);

    return errorClick;
}

export default statisticFilter;
export {returnEightErrorsOrLess, returnAllWords};
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

function sortWordAlphabet(arr, filter) {
    arr.sort((a, b) => {
        if (b[filter] < a[filter]) {
            return 1;
        } else {
            return -1;
        }
    })
    return arr;
}
function sortPercent(arr) {
    arr.sort((a, b) => {
        let aNew = Math.floor(a.errors/a.playClick) * 100 | 0;
        let bNew = Math.floor(b.errors/b.playClick) * 100 | 0;
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
            let newArr = (reverse ? sortWordAlphabet(returnAllWords(), 'title') : sortWordAlphabet(returnAllWords(), 'title').reverse());
            createStatisticsByWord(newArr);
            break;
        case "Translation":
            let arr = (reverse ? sortWordAlphabet(returnAllWords(), 'translate') : sortWordAlphabet(returnAllWords(), 'translate').reverse());
            createStatisticsByWord(arr);
            break;
        case "trainClick":
            let clickArr = (reverse ? sortWordAlphabet(returnAllWords(), 'trainClick') : sortWordAlphabet(returnAllWords(), 'trainClick').reverse());
            createStatisticsByWord(clickArr);
            break;
        case "playClick":
            let clickArrPlay = (reverse ? sortWordAlphabet(returnAllWords(), 'playClick') : sortWordAlphabet(returnAllWords(), 'playClick').reverse());
            createStatisticsByWord(clickArrPlay);
            break;
        case "errors":
            let errorClick = (reverse ? sortWordAlphabet(returnAllWords(), 'errors') : sortWordAlphabet(returnAllWords(), 'errors').reverse());
            createStatisticsByWord(errorClick);
            break;
        case "percent":
            let perClick = (reverse ? sortPercent(returnAllWords()) : sortPercent(returnAllWords()).reverse());
            createStatisticsByWord(perClick);
            break;
    }
}

export default statisticFilter;
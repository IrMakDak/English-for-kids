import { getResource } from "../../services/getResource";
import createStatisticsPageLayout from "./statisticPageLayout";

function createLocalStorage() {
    getResource()
    .then(data => {
        const keys = Object.keys(data);
        keys.forEach(key => {
            if (key !== 'sections') {
                data[key].forEach(i => {
                    i.key = key;
                    i.trainClick = 0;
                    i.playClick = 0;
                    i.errors = 0;
                })  
            }
        })
        localStorage.setItem('statistic', JSON.stringify(data));
    })
}

function editStatistics(section, title, typeOfClick) {
    let newData = JSON.parse(localStorage.getItem('statistic'));

    newData[section].forEach(item => {
        if (item.title === title) {
            item[typeOfClick]++;
        }
    })
    localStorage.setItem('statistic', JSON.stringify(newData));
}

function resetStatistic() {
    let newData = JSON.parse(localStorage.getItem('statistic'));
    let section = Object.keys(newData);

    section.forEach(i => {
        if (i !== 'sections') {
            newData[i].forEach(item => {
                item.trainClick = 0;
                item.playClick = 0;
                item.errors = 0;
            })
        }
    })
    localStorage.setItem('statistic', JSON.stringify(newData));
    document.querySelector('table').remove();
    createStatisticsPageLayout();
}

export default createLocalStorage;
export {editStatistics, resetStatistic};
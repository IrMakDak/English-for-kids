import { resetStatistic } from "./createLocalStorage";
import statisticFilter from "./statisticFilter";

function createTh(parent, inner) {

    let heading = document.createElement('th');
    heading.classList.add('dropdown');

    switch (inner) {
        case "trainClick":
            heading.classList.add('train-column');
            break;
        case "playClick":
            heading.classList.add('play-column');
            break;
        case "errors":
            heading.classList.add('errors-column');
            break;
        case "percent":
            heading.classList.add('percent-column');
            break;
    }
    heading.innerHTML = `
        <button class="dropbtn">${inner}
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content hide">
            <div class="ascending">In ascending order</div>
            <div class="descending">In descending order</div>
        </div>
    `;
    
    let ascending = heading.querySelector('.ascending');
    let descending = heading.querySelector('.descending');

    ascending.addEventListener('click', () => {
        statisticFilter(inner, true);
    })
    descending.addEventListener('click', () => {
        statisticFilter(inner, false);
    })
    parent.appendChild(heading);
}

function createRow(parent, inner, addClass = null) {
    let row_data = document.createElement('td');
    row_data.textContent = inner;
    if (addClass) {
        row_data.classList.add(addClass);
    }
    if (inner === 'Food1' || inner === 'Food2' || inner === 'Nature' || inner === 'Animals1' || inner === 'Animals2' || inner === 'Birds' || inner === "Products1" || inner === "Products2") {
        row_data.classList.add('category-icon');
        switch (inner) {
            case 'Food1':
                row_data.classList.add('category-icon-red');
                break;
            case "Food2": 
                row_data.classList.add('category-icon-blue');
                break;
            case "Nature":
                row_data.classList.add('category-icon-green');
                break;
            case "Animals1": 
                row_data.classList.add('category-icon-pink');
                break;
            case "Animals2":
                row_data.classList.add('category-icon-orange');
                break;
            case "Birds":
                row_data.classList.add('category-icon-violet');
                break;
            case "Products1":
                row_data.classList.add('category-icon-sky');
                break
            case "Products2":
                row_data.classList.add('category-icon-grey');
                break;
        }
    }
    parent.appendChild(row_data);
}

function createStatistics(num, category, word, translation, trainClick, playClick, errors) {
    
    let tbody = document.querySelector('tbody');
    
    let percent = Math.floor(errors/playClick *100) | 0;
    
    let row = document.createElement('tr');

    createRow(row, num);
    createRow(row, (category.charAt(0).toUpperCase() + category.slice(1)));
    createRow(row, word);
    createRow(row, translation);
    createRow(row, trainClick, 'train-column');
    createRow(row, playClick, 'play-column');
    createRow(row, errors, 'errors-column');
    createRow(row, percent, 'percent-column');

    tbody.appendChild(row);
}

function createStatisticBtn(container) {

    const btnGroup = document.createElement('div');
    const resetBtn = document.createElement('button');
    const diffBtn = document.createElement('button');

    resetBtn.textContent = 'RESET statistic';
    diffBtn.textContent = 'TRAIN difficult';

    resetBtn.classList.add('reset-btn');
    diffBtn.classList.add('diff-btn');
    btnGroup.classList.add('btn-group');

    container.append(btnGroup);
    btnGroup.append(resetBtn);
    btnGroup.append(diffBtn);

    resetBtn.addEventListener('click', () => {
        resetStatistic();
    })
    diffBtn.addEventListener('click', () => {
        // trainDifficultWords();
        console.log('train diff');
    })
}

function createStatisticsPageLayout() {

    const container = document.querySelector('.album').querySelector('.container');

    if (!container.querySelector('.btn-group')) {
        createStatisticBtn(container);
    }
    
    if (!document.querySelector('table')) {

        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        container.appendChild(table);

        let row_1 = document.createElement('tr');
        createTh(row_1, "Sr. No.");
        createTh(row_1, "Category");
        createTh(row_1, "Word");
        createTh(row_1, "Translation");
        createTh(row_1, "trainClick");
        createTh(row_1, "playClick");
        createTh(row_1, "errors");
        createTh(row_1, "percent");
        thead.appendChild(row_1);

        statisticFilter('Sr. No.', true);

        window.addEventListener('click', closeDropdownContent);
    } else {
        document.querySelector('table').remove();
        createStatisticsPageLayout();
        window.removeEventListener('click', closeDropdownContent);
    }
}

function closeDropdownContent(e) {
    if (!e.target.classList.contains('dropbtn')) {
        let myDropdowns = document.querySelectorAll(".dropdown-content");
        myDropdowns.forEach(i => {
            if (!i.classList.contains('hide')) {
                i.classList.add('hide');
            }
        })
    }
    if (e.target.classList.contains('dropbtn')) {
        let allContents = document.querySelectorAll('.dropdown-content');
        let content = e.target.parentElement.querySelector('.dropdown-content');

        allContents.forEach(i => {
            if (!i.classList.contains('hide') && content !== i) {
                i.classList.add('hide');
            } else if (content === i) {
                content.classList.toggle('hide');
            }
        }) 
    }
}

export default createStatisticsPageLayout;
export {createStatistics};
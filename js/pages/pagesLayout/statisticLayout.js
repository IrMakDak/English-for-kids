function thLayout(parent, inner) {
  const heading = document.createElement('th');
  heading.classList.add('dropdown');

  switch (inner) {
    case 'trainClick':
      heading.classList.add('train-column');
      break;
    case 'playClick':
      heading.classList.add('play-column');
      break;
    case 'errors':
      heading.classList.add('errors-column');
      break;
    case 'percent':
      heading.classList.add('percent-column');
      break;
    default:
      break;
  }
  const text = `
    <button class="dropbtn">${inner}
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content hide">
      <div class="ascending">In ascending order</div>
      <div class="descending">In descending order</div>
    </div>`;
  heading.innerHTML = text;

  parent.appendChild(heading);
  return heading;
}
function addColorClass(block, inner) {
  switch (inner) {
    case 'Food1':
      block.classList.add('category-icon-red');
      break;
    case 'Food2':
      block.classList.add('category-icon-blue');
      break;
    case 'Nature':
      block.classList.add('category-icon-green');
      break;
    case 'Animals1':
      block.classList.add('category-icon-pink');
      break;
    case 'Animals2':
      block.classList.add('category-icon-orange');
      break;
    case 'Birds':
      block.classList.add('category-icon-violet');
      break;
    case 'Products1':
      block.classList.add('category-icon-sky');
      break;
    case 'Products2':
      block.classList.add('category-icon-grey');
      break;
    default:
      break;
  }
}
function createLiForLegend(key, container) {
  const legendItem = document.createElement('li');
  legendItem.classList.add('legend-li');
  legendItem.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  addColorClass(legendItem, legendItem.textContent);

  container.append(legendItem);
}
function createRow(parent, inner, addClass = null) {
  const rowData = document.createElement('td');
  rowData.textContent = inner;
  if (addClass) {
    rowData.classList.add(addClass);
  }
  if (inner === 'Food1' || inner === 'Food2' || inner === 'Nature' || inner === 'Animals1' || inner === 'Animals2' || inner === 'Birds' || inner === 'Products1' || inner === 'Products2') {
    rowData.classList.add('category-icon');
    addColorClass(rowData, inner);
  }
  parent.appendChild(rowData);
}

export default thLayout;
export { createRow, createLiForLegend };

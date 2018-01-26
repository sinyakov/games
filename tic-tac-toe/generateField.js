const ROWS_COUNT = 3;
const COLS_COUNT = 3;
const field = document.querySelector('.field');

function generateCols(row, colsCount, rowId) {
  for (let i = 0; i < colsCount; i++) {
    const id = rowId * 3 + i;
    const col = document.createElement('div');
    col.id = `c-${id}`;
    col.dataset.id = id;
    col.className = 'cell';
    row.appendChild(col);
  }
}

function generateRows(rowsCount, colsCount) {
  for (let i = 0; i < rowsCount; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    generateCols(row, colsCount, i);
    field.appendChild(row);
  }
}

generateRows(ROWS_COUNT, COLS_COUNT);

const cells = document.querySelectorAll('.cell');
const undo = document.querySelector('.undo-btn');
const redo = document.querySelector('.redo-btn');
const restart = document.querySelector('.restart-btn');
const wonTitle = document.querySelector('.won-title');
const wonMessage = document.querySelector('.won-message');

const stack = [{
  currentPlayer: 'r',
  field: [null, null, null, null, null, null, null, null, null]
}];
let step = 0;
let gameOver = false;

const isGameOver = () => {
  const { currentPlayer, field } = stack[step];

  if (field[0] !== null && field[0] === field[3] && field[3] === field[6]) {
    cells[0].classList.add('win');
    cells[0].classList.add('vertical');
    cells[3].classList.add('win');
    cells[3].classList.add('vertical');
    cells[6].classList.add('win');
    cells[6].classList.add('vertical');
  } else if (field[1] !== null && field[1] === field[4] && field[4] === field[7]) {
    cells[1].classList.add('win');
    cells[1].classList.add('vertical');
    cells[4].classList.add('win');
    cells[4].classList.add('vertical');
    cells[7].classList.add('win');
    cells[7].classList.add('vertical');
  } else if (field[2] !== null && field[2] === field[5] && field[5] === field[8]) {
    cells[2].classList.add('win');
    cells[2].classList.add('vertical');
    cells[5].classList.add('win');
    cells[5].classList.add('vertical');
    cells[8].classList.add('win');
    cells[8].classList.add('vertical');
  } else if (field[0] !== null && field[0] === field[1] && field[1] === field[2]) {
    cells[0].classList.add('win');
    cells[0].classList.add('horizontal');
    cells[1].classList.add('win');
    cells[1].classList.add('horizontal');
    cells[2].classList.add('win');
    cells[2].classList.add('horizontal');
  } else if (field[3] !== null && field[3] === field[4] && field[4] === field[5]) {
    cells[3].classList.add('win');
    cells[3].classList.add('horizontal');
    cells[4].classList.add('win');
    cells[4].classList.add('horizontal');
    cells[5].classList.add('win');
    cells[5].classList.add('horizontal');
  } else if (field[6] !== null && field[6] === field[7] && field[7] === field[8]) {
    cells[6].classList.add('win');
    cells[6].classList.add('horizontal');
    cells[7].classList.add('win');
    cells[7].classList.add('horizontal');
    cells[8].classList.add('win');
    cells[8].classList.add('horizontal');
  } else if (field[0] !== null && field[0] === field[4] && field[4] === field[8]) {
    cells[0].classList.add('win');
    cells[0].classList.add('diagonal-right');
    cells[4].classList.add('win');
    cells[4].classList.add('diagonal-right');
    cells[8].classList.add('win');
    cells[8].classList.add('diagonal-right');
  } else if (field[2] !== null && field[2] === field[4] && field[4] === field[6]) {
    cells[2].classList.add('win');
    cells[2].classList.add('diagonal-left');
    cells[4].classList.add('win');
    cells[4].classList.add('diagonal-left');
    cells[6].classList.add('win');
    cells[6].classList.add('diagonal-left');
  }
  else if (field.every(x => x)) {
    wonMessage.textContent = `It's a draw!`;
    wonTitle.classList.remove('hidden');
    return true;
  }
  else {
    return false;
  }

  wonMessage.textContent = currentPlayer === 'ch' ? `Crosses won!` : `Toes won!`;
  wonTitle.classList.remove('hidden');
  return true;
}

const render = () => {
  const { field } = stack[step];

  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove('ch');
    cells[i].classList.remove('r');
    cells[i].classList.remove('win');
    cells[i].classList.remove('vertical');
    cells[i].classList.remove('horizontal');
    cells[i].classList.remove('diagonal-left');
    cells[i].classList.remove('diagonal-right');

    if (field[i]) {
      cells[i].classList.add(field[i]);
    }
  }

  wonTitle.classList.add('hidden');
  wonMessage.textContent = '';
  gameOver = isGameOver();
}

document.querySelector('.field').addEventListener('click', event => {
  const id = event.target.dataset.id;

  if (stack[step].field[id] !== null || gameOver) {
    return;
  }

  stack.splice(step + 1);

  const currentPlayer = stack[stack.length - 1].currentPlayer === 'ch' ? 'r' : 'ch';
  const field = stack[stack.length - 1].field.slice();

  field[id] = currentPlayer;
  stack.push({ currentPlayer, field });
  step++;

  if (step > 0) {
    undo.disabled = false;
  }
  redo.disabled = true;

  render();
})

undo.addEventListener('click', event => {
  step--;
  if (step === 0) {
    undo.disabled = true;
  }
  redo.disabled = false;

  render();
})

redo.addEventListener('click', event => {
  step++;
  if (step === stack.length - 1) {
    redo.disabled = true;
  }
  if (step > 0) {
    undo.disabled = false;
  }

  render();
})

restart.addEventListener('click', event => {

  stack.splice(1);
  step = 0;

  redo.disabled = true;
  undo.disabled = true;

  render();
})
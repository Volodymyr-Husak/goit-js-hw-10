const bodyEl = document.querySelector('body');

const startBtnEl = document.querySelector('button[data-start');

const stoptBtnEl = document.querySelector('button[data-stop');

let timerId = null;

bodyEl.addEventListener('click', onClick);

function onClick(event) {
  const onStartBool = Object.keys(event.target.dataset).join('') === 'start';
  const onStopBool = Object.keys(event.target.dataset).join('') === 'stop';

  if (onStartBool) {
    // console.log('Це кнопка старт');
    timerId = setInterval(backgroundColorInterval, 1000);
    startBtnEl.disabled = true;
    stoptBtnEl.disabled = false;
  } else if (onStopBool) {
    // console.log('Це кнопка стоп');
    clearInterval(timerId);
    stoptBtnEl.disabled = true;
    startBtnEl.disabled = false;
  } else return;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function backgroundColorInterval() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

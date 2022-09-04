// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// console.log(selectedDates[0]);
import Notiflix from 'notiflix';

let dateSelected = 0;
let dateNow = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateSelected = new Date(selectedDates[0]).getTime();
    dateNow = new Date().getTime();

    if (dateSelected < dateNow) {
      // window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else btnStartEl.disabled = false;
  },
};

const btnStartEl = document.querySelector('button[data-start');
const inputEl = document.querySelector('input[type="text"]');
const valueElArr = document.querySelectorAll('.value');

const fp = flatpickr(inputEl, options);

btnStartEl.disabled = true;

btnStartEl.addEventListener('click', onClick);

function onClick() {
  setInterval(addsValueInterface, 1000);
}

function addsValueInterface() {
  dateNow = new Date().getTime();
  const dateDifference = dateSelected - dateNow;
  if (dateSelected < dateNow) {
    return;
  }

  const dateObj = convertMs(dateDifference);
  const { days, hours, minutes, seconds } = dateObj;
  valueElArr[0].textContent = days;
  valueElArr[1].textContent = hours;
  valueElArr[2].textContent = minutes;
  valueElArr[3].textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  addLeadingZero();
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
// ==========================================================
const timerEl = document.querySelector('.timer');

timerEl.style.display = 'flex';
timerEl.style.justifyContent = 'center';
const fieldsEl = document.querySelectorAll('.field');

fieldsEl.forEach(field => {
  // field.style.outline = 'solid';
  field.style.backgroundColor = '#0cb7eb';
  field.style.margin = '20px';
  field.style.padding = '5px';
  field.style.borderRadius = '5px';
  field.style.fontWeight = 'bold';
});
// ==========================================================

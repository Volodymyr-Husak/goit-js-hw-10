import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries.js';
// import countryListMarkup from './countryListMarkup';

import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};
const { inputEl, countryListEl, countryInfoEl } = refs;

inputEl.addEventListener('input', debounce(onInput, 300));

function onInput(event) {
  let inputValue = event.target.value.trim();
  if (inputValue === '') {
    return;
  }
  // console.log(event.target.value);
  // console.log(event.target.value.trim());

  const country = inputValue;
  // country.trim();

  fetchCountries(country)
    .then(country => {
      console.log('Країни в then:', country);
      renderCountryMarkup(country);

      //   return country;
    })
    .catch(error => {
      // console.warn(error);
      Notiflix.Notify.failure('Oops, there is no country with that name.');
    });
}
let itemCountryEl = '';
let countryInfoItemEl = '';

function renderCountryMarkup(country) {
  if (country.length > 10) {
    itemCountryEl = document.querySelectorAll('.item-country');
    itemCountryEl.forEach(item => item.remove());

    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (country.length === 1) {
    countryInfoItemEl = document.querySelector('.country-info-item');
    if (countryInfoItemEl) {
      return;
    }

    itemCountryEl = document.querySelectorAll('.item-country');
    itemCountryEl.forEach(item => item.remove());

    const markupInfo = country.map(
      count => `<div class="country-info-item">
      <div class="country-flag-container">
          <img class="country-flags" src="${count.flags.svg}"
               alt="flags ${count.name.common}" width=100 >
          <p>${count.name.common}</p>
    </div>
    
    <ul>
        <li>Capital: ${count.capital}</li>
        <li>Population: ${count.population}</li>
        <li>Languages: ${count.languages}</li>
    </ul>
    </div>`
    );
    return countryInfoEl.insertAdjacentHTML('beforeend', markupInfo);
  }
  countryInfoItemEl = document.querySelector('.country-info-item');
  if (countryInfoItemEl) {
    countryInfoItemEl.remove();
  }

  const markup = country.map(
    count =>
      `<li class="item-country">
            <img class="country-flag" src="${count.flags.svg}"
               alt="flags ${count.name.common}" width=30>
            <p>${count.name.common}</p>
      </li>`
  );

  countryListEl.insertAdjacentHTML('beforeend', markup);
}

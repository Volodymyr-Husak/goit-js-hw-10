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

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  let inputValue = event.target.value.trim();
  if (inputValue === '') {
    return;
  }

  const country = inputValue;

  fetchCountries(country)
    .then(country => {
      // console.log(country);
      renderCountryMarkup(country);
    })
    .catch(error => {
      // console.warn(error);
      Notiflix.Notify.failure('Oops, there is no country with that name.');
    });
}

function renderCountryMarkup(country) {
  let itemCountryEl = document.querySelectorAll('.item-country');
  let countryInfoItemEl = document.querySelector('.country-info-item');

  if (country.length > 10) {
    itemCountryEl?.forEach(item => item.remove());
    // if (countryInfoItemEl) {
    countryInfoItemEl?.remove();
    // }
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (country.length === 0) {
    itemCountryEl?.forEach(item => item.remove());
    countryInfoItemEl?.remove();
  }

  if (country.length === 1) {
    // countryInfoItemEl = document.querySelector('.country-info-item');
    if (countryInfoItemEl) {
      return;
    }

    itemCountryEl.forEach(item => item.remove());

    const countryObj = country[0];

    // const countryLanguagesArr = Object.values(countryObj.languages);
    let countryLanguagesArr = [];

    const countryLanguagesArrObj = countryObj.languages;

    countryLanguagesArrObj.map(countryLanguage =>
      countryLanguagesArr.push(countryLanguage.name)
    );

    const markupInfo = `<div class="country-info-item">
       <div class="country-flag-container">
           <img class="country-info__flags" src="${countryObj.flags.svg}"
               alt="flags ${countryObj.name}" width=30 >
          <p class="country-info__text">${countryObj.name}</p>
       </div>
    
     <ul class="country-info__list">
         <li class="country-info__item"><span class="country-info__bold-text">Capital:</span> ${countryObj.capital}</li>
         <li class="country-info__item"><span class="country-info__bold-text">Population:</span> ${countryObj.population}</li>
         <li class="country-info__item"><span class="country-info__bold-text">Languages:</span> ${countryLanguagesArr}</li>
     </ul>
     </div>`;

    return countryInfoEl.insertAdjacentHTML('beforeend', markupInfo);
  }

  // if (countryInfoItemEl) {
  countryInfoItemEl?.remove();
  // }
  // if (itemCountryEl) {
  itemCountryEl?.forEach(item => item.remove());
  // }

  const markupList = country
    .map(
      count =>
        `<li class="item-country">
            <img class="country-flag" src="${count.flags.svg}"
               alt="flags ${count.name}" width=30>
            <p class="country-list__text">${count.name}</p>
      </li>`
    )
    .join('');

  countryListEl.insertAdjacentHTML('beforeend', markupList);
}

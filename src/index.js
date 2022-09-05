import './css/styles.css';

// import fetchCountries from './fetchCountries';
// import countryListMarkup from './countryListMarkup';

import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};
const { inputEl, countryListEl, countryInfoEl } = refs;

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages` //
  )
    .then(response => {
      return response.json();
    })
    .then(country => {
      console.log('Країни в then:', country);
      renderCountryMarkup(country);
      // const countryName = country.forEach(element => {
      //   console.log('Країна у forEach:', element.name.common);
      //   return element.name.common;
      // });
      //   return country;
    })
    .catch(error => console.warn(error));
}

inputEl.addEventListener('input', debounce(onInput, 300));

function onInput(event) {
  // console.log(event.target.value);
  const country = event.target.value;
  fetchCountries(country);
  // console.log(fetchCountries(country));
  // setTimeout(addInnerHtml, 400);
  // setInterval(addsValueInterface, 1000);
}

function renderCountryMarkup(country) {
  const markup = country.map(
    count =>
      ` <li class="list-item">
            <img class="country-flags" src="${count.flags.svg}"
               alt="flags ${count.name.common}" width=100 >
            <p>${count.name.common}</p>
      </li> `
  );
  countryListEl.insertAdjacentHTML('beforeend', markup);
  // ==========================
  // const markup = newTechnologies
  //   .map(technology => `<li class="list-item new">${technology}</li>`)
  //   .join('');
  // list.insertAdjacentHTML('beforeend', markup);
  // ==========================
}

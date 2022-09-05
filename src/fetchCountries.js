export default function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages` //
  )
    .then(response => {
      return response.json();
    })
    .then(country => {
      console.log('Країни в then:', country);
      //   renderCountryMarkup(country);
      // const countryName = country.forEach(element => {
      //   console.log('Країна у forEach:', element.name.common);
      //   return element.name.common;
      // });
      //   return country;
    })
    .catch(error => console.warn(error));
}

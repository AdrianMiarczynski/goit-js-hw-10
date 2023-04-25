import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const boxEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
inputEl.addEventListener(
  'input',
  debounce(async ev => {
    const countryName = ev.target.value;
    const countries = await fetchCountries(countryName.trim());
    if (countryName === '') {
      inputEl.innerHTML = '';
      listEl.innerHTML = '';
      boxEl.innerHTML = '';
      document.body.classList.remove('bg-body');
      return;
    }

    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else {
      listEl.innerHTML = countries
        .map(
          country => `
      <li class="list-item"><img class="imgEl" src="${country.flags.svg}" width="40"></>${country.name.common}</li>
      `
        )
        .join('');
    }

    if (countries.length === 1) {
      document.body.classList.add('bg-body');
      const imgEl = document.querySelector('.imgEl');
      imgEl.classList.add('img--modyfication');
      const listItemEl = document.querySelector('.list-item');
      listItemEl.classList.add('list-item--modification');
      boxEl.innerHTML = `
      <p>Capital: ${countries[0].capital}</p>
      <p>Population: ${countries[0].population}</p>
      <p>Languages: ${Object.values(countries[0].languages).join(', ')}</p>
      `;
    }
    console.log(countries);
  }, DEBOUNCE_DELAY)
);

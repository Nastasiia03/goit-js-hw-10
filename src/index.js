import './css/styles.css'
import { fetchCountries } from './fetchCountries.js'
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const name = input.value.trim();
  if (name === '') {
    return (list.innerHTML = ''), (info.innerHTML = '')
  };

  fetchCountries(name)
    .then(countries => {
      list.innerHTML = '';
      info.innerHTML = '';
      if (countries.length >= 10) { 
        errorManyCountries();
      } else if (countries.length === 1) {  
        info.insertAdjacentHTML('beforeend', getInfo(countries));
      } else {
        list.insertAdjacentHTML('beforeend', getCountries(countries));
      }
    })
    .catch(errorNoName);
}

function getCountries(countries) {
  return countries.map(({ name, flags }) => 
      `<li class="country-list__item">
              <img class="country-list__img" src="${flags.svg}" alt="flag" width = 30px height = 20px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>`
    ).join('');
}

function getInfo(countries) {
  return countries.map(({ name, flags, capital, population, languages }) => 
       `<ul class="country-info__list">
            <li class="country-info__item1">
            <img class="country-info__img" src="${flags.svg}" alt="flag" width = 35px height = 25px>
            <h2 class="country-info__name">${name.official}</h2></li>
            <li class="country-info__item"><p><span>Capital:</span> ${capital}</p></li>
            <li class="country-info__item"><p><span>Population:</span> ${population}</p></li>
            <li class="country-info__item"><p><span>Languages:</span> ${Object.values(languages).join(', ')}</p></li>
        </ul>`).join('');
}

function errorManyCountries() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')};

function errorNoName() {
  list.innerHTML = '';
  info.innerHTML = '';
  Notiflix.Notify.failure('Oops, there is no country with that name')
  };
import './css/styles.css'
import { fetchCountries } from './fetchcountries.js'
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'

const DEBOUNCE_DELAY = 300

fetchCountries("Poland").then(data => console.log(data))

const input = document.querySelector('#search-box')
const list = document.querySelector('.country-list')
const info = document.querySelector('.country-info')

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const name = input.value.trim();
  if (name === '') {
    return (list.innerHTML = ''), (info.innerHTML = '')
  }

  fetchCountries(name)
    .then(countries => {
      list.innerHTML = ''
      info.innerHTML = ''
      if (countries.length === 1) {
        list.insertAdjacentHTML('beforeend', renderCountries(countries))
        info.insertAdjacentHTML('beforeend', renderInfo(countries))
      } else if (countries.length >= 10) {
        errorManyCountries()
      } else {
        list.insertAdjacentHTML('beforeend', renderCountries(countries))
      }
    })
    .catch(errorNoName);
}

function renderCountries(countries) {
  return countries.map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="flag" width = 25px height = 25px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `
    }).join('')
}

function renderInfo(countries) {
  return countries.map(({ capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item"><p>Capital: ${capital}</p></li>
            <li class="country-info__item"><p>Population: ${population}</p></li>
            <li class="country-info__item"><p>Languages: ${Object.values(languages).join(', ')}</p></li>
        </ul>
        `
    }).join('')
}

function errorManyCountries() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')}

function errorNoName() {
    Notiflix.Notify.failure('Oops, there is no country with that name')
  }
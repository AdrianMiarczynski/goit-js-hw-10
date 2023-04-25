import Notiflix from 'notiflix';

const API_URL = 'https://restcountries.com/v3.1/name';

export const fetchCountries = name => {
  return fetch(`
      ${API_URL}/${name}?fields=name,capital,population,flags,languages
    `)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .catch(err =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
};


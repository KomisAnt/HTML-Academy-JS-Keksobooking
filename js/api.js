import { onLoadErrorMessage } from './util.js';
import { realtyMapFilter } from './map-filters.js';


fetch('https://25.javascript.htmlacademy.pro/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Ошибка загрузки данных');

  })
  .then((realtys) => {
    // renderSimilarCards(() => realtyMapFilter(realtys));
    realtyMapFilter(realtys);
  })
  .catch((err) => {
    onLoadErrorMessage(err.message);
  });

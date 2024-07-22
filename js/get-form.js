import { adForm, adFormInputs, adFormTextarea, adFormSelects, mapFilters, mapFiltersSelets } from './constants.js';

function formInit() {
  adForm.classList.add('ad-form--disabled');
  adFormInputs.forEach((input) => {
    input.setAttribute('disabled', true);
  });

  adFormTextarea.setAttribute('disabled', true);

  adFormSelects.forEach((select) => {
    select.setAttribute('disabled', true);
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFiltersSelets.forEach((select) => {
    select.setAttribute('disabled', true);
  });
}

function formAnabled() {
  adForm.classList.remove('ad-form--disabled');
  adFormInputs.forEach((input) => {
    input.removeAttribute('disabled');
  });

  adFormTextarea.removeAttribute('disabled');

  adFormSelects.forEach((select) => {
    select.removeAttribute('disabled');
  });

  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersSelets.forEach((select) => {
    select.removeAttribute('disabled');
  });
}

formInit();

export { formAnabled, adForm };

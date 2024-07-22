import { adFormSubmitButton } from './constants.js';
import { resetMapPinMainPosition } from './map.js';

const ALERT_SHOW_ERROR_TIME = 5000;


const onLoadErrorMessage = (message) => {
  const errorBlock = document.createElement('div');
  errorBlock.style.zIndex = 100;
  errorBlock.style.position = 'absolute';
  errorBlock.textContent = message;
  errorBlock.style.left = 0;
  errorBlock.style.right = 0;
  errorBlock.style.top = '10px';

  errorBlock.style.textAlign = 'center';
  errorBlock.style.padding = '10px 20px';
  errorBlock.style.backgroundColor = 'red';
  errorBlock.style.fontSize = '20px';
  errorBlock.style.fontWeight = 'bold';
  errorBlock.style.color = 'white';

  document.body.appendChild(errorBlock);

  setTimeout(() => {
    errorBlock.remove();
  }, ALERT_SHOW_ERROR_TIME);
};

const onSuccessCreatedAds = () => {

  function removeSuccessMessage(evt) {
    if (evt.key === 'Escape') {
      document.body.removeChild(successMessageTemplate);
      document.removeEventListener('keydown', removeSuccessMessage);
    }
    if (evt.type === 'click') {
      document.body.removeChild(successMessageTemplate);
      document.removeEventListener('click', removeSuccessMessage);
    }
  }

  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  document.body.appendChild(successMessageTemplate);
  document.addEventListener('keydown', removeSuccessMessage);
  document.addEventListener('click', removeSuccessMessage);
  unBlockFormSubmitButton();
  resetMapPinMainPosition();
};

const onErrorCreatedAds = () => {

  function removeErrorMessage(evt) {
    const containerErrorMessage = document.querySelector('.error');
    if (evt.key === 'Escape' || evt.type === 'click') {
      document.body.removeChild(containerErrorMessage);
    }
    unBlockFormSubmitButton();
  }

  const errorMessageTemplate = document.querySelector('#error').content;
  const errorMessageClone = errorMessageTemplate.cloneNode(true);

  document.body.appendChild(errorMessageClone);

  const errorButton = document.querySelector('.error__button');

  document.addEventListener('keydown', removeErrorMessage);
  document.addEventListener('click', removeErrorMessage);
  errorButton.addEventListener('click', removeErrorMessage);
};

function blockFormSubmitButton() {
  adFormSubmitButton.disabled = true;
  adFormSubmitButton.textContent = 'Публикую...';
}

function unBlockFormSubmitButton() {
  adFormSubmitButton.disabled = false;
  adFormSubmitButton.textContent = 'Опубликовать';
}

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { onLoadErrorMessage, onSuccessCreatedAds, onErrorCreatedAds, blockFormSubmitButton, unBlockFormSubmitButton, debounce };

import { createMarker } from './map.js';

function getPopupRealtyType(realty) {
  const typeRealtys = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель'
  };
  for (const key in typeRealtys) {
    if (realty === key) {
      return typeRealtys[key];
    }
  }
}

function getPopupPhotos(photo) {
  return `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
}

function getPopupFeatures(feature) {
  const newElementLi = document.createElement('li');
  newElementLi.classList.add('popup__feature', `popup__feature--${feature}`);
  return newElementLi;
}

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderSimilarCards = (similarCards) => {

  const viewSimilarCards = similarCards.slice(0, 10);

  viewSimilarCards.forEach(({ author, offer, location }) => {

    const popupClone = cardTemplate.cloneNode(true);
    popupClone.querySelector('.popup__title').textContent = offer.title;
    popupClone.querySelector('.popup__text--address').textContent = offer.address;
    popupClone.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    popupClone.querySelector('.popup__type').textContent = getPopupRealtyType(offer.type);
    popupClone.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
    popupClone.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    popupClone.querySelector('.popup__description').textContent = offer.description;

    popupClone.querySelector('.popup__photo').remove();

    if (offer.photos) {
      for (const photo of offer.photos) {
        const popupPhoto = getPopupPhotos(photo);
        popupClone.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', popupPhoto);
      }
    }

    const popupFeaturesList = popupClone.querySelector('.popup__features');
    const popupFeatures = popupClone.querySelectorAll('.popup__feature');

    for (const popupFeature of popupFeatures) {
      popupFeature.remove();
    }

    if (offer.features) {
      for (const feature of offer.features) {
        const popupFeature = getPopupFeatures(feature);
        popupFeaturesList.appendChild(popupFeature);
      }
    }

    popupClone.querySelector('.popup__avatar').src = author.avatar;

    createMarker(location, popupClone);
  });

};

export { renderSimilarCards };

import { renderSimilarCards } from './get-similar-card.js';
import { markerGroupMap } from './map.js';
import { realtyPriceLow, realtyPriceMiddle, RERENDER_DELAY } from './constants.js';
import { debounce } from './util.js';

const mapFiltersForm = document.querySelector('.map__filters');

const realtyMapFilter = (realtys) => {

  renderSimilarCards(realtys);

  const realtysCopy = realtys.slice();

  let filterOptions = {};
  const featuresList = [];

  function getRealtyPrice(price) {
    if (price <= realtyPriceLow) {
      return 'low';
    } else if (price > realtyPriceLow && price < realtyPriceMiddle) {
      return 'middle';
    }
    return 'high';
  }

  function getFeature(realtyFeatures, userFeatures) {

    const availableFeaturesBoolean = [];

    userFeatures.forEach((userFeature) => {
      availableFeaturesBoolean.push(realtyFeatures.includes(userFeature));
    });

    return availableFeaturesBoolean.every((elem) => elem === true);

  }

  function getFilterOptions(evt) {

    const filterTargetName = evt.target.name;
    const filterTargetValue = evt.target.value;

    if (filterTargetName === 'housing-rooms' || filterTargetName === 'housing-guests') {
      filterOptions[filterTargetName] = +filterTargetValue;
    } else {
      filterOptions[filterTargetName] = filterTargetValue;
    }

    if (filterTargetValue === 'any') {
      delete filterOptions[filterTargetName];
    }

    if (filterTargetName === 'features' && evt.target.checked) {
      featuresList.push(filterTargetValue);
      filterOptions[filterTargetName] = featuresList;
    } else if (filterTargetName === 'features' && !evt.target.checked) {
      const indexItem = featuresList.indexOf(filterTargetValue);
      featuresList.splice(indexItem, 1);
      filterOptions[filterTargetName] = featuresList;
      if (featuresList.length === 0) {
        delete filterOptions[filterTargetName];
      }
    }
    return filterOptions;
  }

  function onMapFilter(evt) {
    filterOptions = getFilterOptions(evt);
    let offerTypeValue;

    const filterRealty = realtysCopy.filter(({ offer }) => {
      return Object.keys(filterOptions).every((key) => {
        if (key.includes('housing')) {
          const offerType = key.replace('housing-', '');
          offerTypeValue = offer[offerType];
        }

        if (key === 'housing-price') {
          offerTypeValue = getRealtyPrice(offerTypeValue);
        }

        if (key === 'features' && offer[key] !== undefined) {
          const availableFeatures = getFeature(offer[key], filterOptions[key]);
          return availableFeatures;
        }

        return filterOptions[key] === offerTypeValue;

      });
    });
    markerGroupMap.clearLayers();
    renderSimilarCards(filterRealty);
  }

  const debounceMapFilter = debounce(onMapFilter, RERENDER_DELAY);

  mapFiltersForm.addEventListener('change', debounceMapFilter);

};

export { realtyMapFilter };

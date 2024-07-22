
import { formAnabled } from './get-form.js';
import { addressField, mapPinMainLat, mapPinMainLng } from './constants.js';

addressField.value = `${mapPinMainLat}, ${mapPinMainLng}`;

const map = L.map('map-canvas')
  .setView({
    lat: mapPinMainLat,
    lng: mapPinMainLng
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
)
  .on('load', formAnabled)
  .addTo(map);


const mapPinMain = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

const mapPinOrdinary = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const mainPinMarker = L.marker(
  {
    lat: mapPinMainLat,
    lng: mapPinMainLng
  },
  {
    draggable: true,
    icon: mapPinMain
  }
);

function resetMapPinMainPosition() {
  mainPinMarker.setLatLng({
    lat: mapPinMainLat,
    lng: mapPinMainLng
  });
}

const markerGroupMap = L.layerGroup().addTo(map);

const createMarker = (location, popupClone) => {

  const ordinaryPinMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng
    },
    {
      icon: mapPinOrdinary
    }
  );
  ordinaryPinMarker
    .addTo(markerGroupMap)
    .bindPopup(popupClone);
};


mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const addressPoint = evt.target.getLatLng();
  addressField.value = `${addressPoint.lat.toFixed(5)}, ${addressPoint.lng.toFixed(5)}`;
});

export { createMarker, markerGroupMap, resetMapPinMainPosition };

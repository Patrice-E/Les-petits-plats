import {
  selectableComponents,
  selectableDevices,
  selectableUstensils,
} from '../pages/index.js';
import { formatListFilters } from '../templates/select.js';
import { handleSelectFilter } from './useFilter.js';

const mainSearch = document.querySelector('#mainsearch');

const searchByMainInput = (e) => {
  const target = e.currentTarget;
  console.log(target);
};

const searchBySelectInput = (e) => {
  const element = e.currentTarget;
  const value = element.value;
  const category = element.name;
  const selectableList = document.querySelector(
    `.showlist[data-showlist="${category}"] .selectable-items`
  );
  let selectableItems = [];
  switch (category) {
    case 'Ingrédients':
      selectableItems = selectableComponents.data;
      break;
    case 'Appareils':
      selectableItems = selectableDevices.data;
      break;
    case 'Ustensiles':
      selectableItems = selectableUstensils.data;
      break;
  }
  selectableItems = selectableItems.filter(
    (item) => item.toLowerCase().indexOf(value.toLowerCase()) > -1
  );
  selectableList.innerHTML = formatListFilters(selectableItems, category);
  // Activation de la sélection des filtres
  const filters = document.querySelectorAll('.selectable');
  filters.forEach((filter) => {
    filter.addEventListener('click', handleSelectFilter);
  });
};

const startToListen = () => {
  mainSearch.addEventListener('input', searchByMainInput);
};

export { searchBySelectInput, startToListen };

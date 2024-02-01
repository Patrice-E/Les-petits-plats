import {
  selectableComponents,
  selectableDevices,
  selectableUstensils,
} from '../pages/index.js';
import { handleSelectFilter } from './useFilter.js';

const mainSearch = document.querySelector('#mainsearch');

const handleMainSearch = (e) => {
  const target = e.currentTarget;
  console.log(target);
};

const formatListFilters = (list, cat) => {
  let listFilters = '';
  list.map((item) => {
    listFilters += `<li class="selectable" data-cat=${cat}>${item}</li>`;
  });
  return listFilters;
};

const handleFilterSearch = (e) => {
  const element = e.currentTarget;
  const value = element.value;
  console.log(value);
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
  mainSearch.addEventListener('input', handleMainSearch);
};

export { handleFilterSearch, startToListen };

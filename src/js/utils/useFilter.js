import {
  components,
  devices,
  selectedComponents,
  selectedDevices,
  selectedUstensils,
  ustensils,
} from '../pages/index.js';
import { Select } from '../templates/select.js';
import { handleFilterSearch } from './useSearch.js';

const filterSelects = document.querySelector('.filters');

const renderFilters = () => {
  filterSelects.innerHTML = Select(
    'Ingrédients',
    components,
    selectedComponents
  );
  filterSelects.innerHTML += Select('Appareils', devices, selectedDevices);
  filterSelects.innerHTML += Select('Ustensiles', ustensils, selectedUstensils);
  // Activation des boutons de filtres
  const btns = document.querySelectorAll('button[data-btn]');
  btns.forEach((btn) => {
    btn.addEventListener('click', handleSelectBtn);
  });
  // Activation de l'écoute de la barre de recherche avancée
  const filterSearch = document.querySelectorAll('.filtersearch');
  filterSearch.forEach((fs) =>
    fs.addEventListener('input', handleFilterSearch)
  );
  // Activation de la sélection des filtres
  const filters = document.querySelectorAll('.selectable');
  filters.forEach((filter) => {
    filter.addEventListener('click', handleSelectFilter);
  });
  // Activation du bouton suppression d'un filtre
  const selectedFilters = document.querySelectorAll('.btn-selected');
  selectedFilters.forEach((select) => {
    select.addEventListener('click', handleDeleteFilter);
  });
};
const handleSelectBtn = (e) => {
  const btnInfo = e.currentTarget.dataset.btn;
  const showList = document.querySelector(
    `.showlist[data-showlist="${btnInfo}"]`
  );
  showList.classList.toggle('hidden');
};
const handleSelectFilter = (e) => {
  const element = e.currentTarget;
  const category = element.dataset.cat;
  const name = element.innerHTML;
  switch (category) {
    case 'Ingrédients':
      selectedComponents.add(name);
      break;
    case 'Appareils':
      selectedDevices.add(name);
      break;
    case 'Ustensiles':
      selectedUstensils.add(name);
      break;
  }
  renderFilters();
};
const handleDeleteFilter = (e) => {
  const element = e.currentTarget;
  const category = element.dataset.cat;
  const value = element.previousElementSibling.textContent;
  switch (category) {
    case 'Ingrédients':
      selectedComponents.remove(value);
      break;
    case 'Appareils':
      selectedDevices.remove(value);
      break;
    case 'Ustensiles':
      selectedUstensils.remove(value);
      break;
  }
  renderFilters();
};

export { handleSelectFilter, renderFilters };

import {
  selectableComponents,
  selectableDevices,
  selectableUstensils,
  selectedComponents,
  selectedDevice,
  selectedUstensils,
} from '../pages/index.js';
import { Select } from '../templates/select.js';
import {
  filterRecipesListBySelection,
  renderRecipesList,
} from './useRecipes.js';

// Eléments du DOM
const filterSelects = document.querySelector('.filters');

const filterSelectableItems = (category, selectableItems, selectedItems) => {
  const notFilteredArray = selectableItems.data.filter(
    (items) => !selectedItems.data.includes(items)
  );
  switch (category) {
    case 'Ingrédients':
      selectableComponents.data = notFilteredArray;
      break;
    case 'Appareils':
      selectableDevices.data = notFilteredArray;
      break;
    case 'Ustensiles':
      selectableUstensils.data = notFilteredArray;
      break;
  }
};

const renderFilters = () => {
  filterSelects.innerHTML = Select(
    'Ingrédients',
    selectableComponents,
    selectedComponents
  );
  filterSelects.innerHTML += Select(
    'Appareils',
    selectableDevices,
    selectedDevice
  );
  filterSelects.innerHTML += Select(
    'Ustensiles',
    selectableUstensils,
    selectedUstensils
  );
  // Activation des boutons de filtres
  const btns = document.querySelectorAll('button[data-btn]');
  btns.forEach((btn) => {
    btn.addEventListener('click', handleSelectBtn);
  });
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

const updateFiltersBtn = () => {
  let recipesList = filterRecipesListBySelection();
  let components = [];
  let devices = [];
  let ustensils = [];
  recipesList.map((recipe) => {
    // liste des ingrédients
    recipe.ingredients.map((ingredient) => {
      components.push(ingredient.ingredient);
    });
    // liste des appareils
    devices.push(recipe.appliance);
    // liste des ustensiles
    recipe.ustensils.map((ustensil) => {
      ustensils.push(ustensil);
    });
  });
  components = [...new Set(components)];
  selectableComponents.data = components;
  filterSelectableItems(
    'Ingrédients',
    selectableComponents,
    selectedComponents
  );
  devices = [...new Set(devices)];
  selectableDevices.data = devices;
  filterSelectableItems('Appareils', selectableDevices, selectedDevice);
  ustensils = [...new Set(ustensils)];
  selectableUstensils.data = ustensils;
  filterSelectableItems('Ustensiles', selectableUstensils, selectedUstensils);
  renderFilters();
  renderRecipesList();
};

// Gestion d'ouverture/fermeture d'un bouton de filtre
const handleSelectBtn = (e) => {
  const btnInfo = e.currentTarget.dataset.btn;
  const showList = document.querySelector(
    `.showlist[data-showlist="${btnInfo}"]`
  );
  showList.classList.toggle('hidden');
};
// Gestion de la sélection d'un filter
const handleSelectFilter = (e) => {
  const element = e.currentTarget;
  const category = element.dataset.cat;
  const name = element.innerHTML;
  switch (category) {
    case 'Ingrédients':
      selectedComponents.add(name);
      break;
    case 'Appareils':
      selectedDevice.add(name);
      break;
    case 'Ustensiles':
      selectedUstensils.add(name);
      break;
  }
  updateFiltersBtn();
};
// Suppression d'un filtre sélectionné
const handleDeleteFilter = (e) => {
  const element = e.currentTarget;
  const category = element.dataset.cat;
  const value = element.previousElementSibling.textContent;
  switch (category) {
    case 'Ingrédients':
      selectedComponents.remove(value);
      selectedItems = selectedComponents.data;
      break;
    case 'Appareils':
      selectedDevice.remove(value);
      selectedItems = selectedDevice.data;
      break;
    case 'Ustensiles':
      selectedUstensils.remove(value);
      selectedItems = selectedUstensils.data;
      break;
  }
  updateFiltersBtn();
};

export { handleSelectFilter, updateFiltersBtn };

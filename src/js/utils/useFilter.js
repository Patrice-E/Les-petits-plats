import {
  selectableComponents,
  selectableDevices,
  selectableUstensils,
  selectedComponents,
  selectedDevices,
  selectedUstensils,
} from '../pages/index.js';
import { renderRecipes } from '../templates/recipes.js';
import { Select } from '../templates/select.js';
import { useFetch } from './useFetch.js';
import { handleFilterSearch } from './useSearch.js';

const filterSelects = document.querySelector('.filters');
const { recipes } = await useFetch('./src/datas/recipes.json');

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
const newSelectableItems = (recipes) => {
  let components = [];
  let devices = [];
  let ustensils = [];
  recipes.map((r) => {
    // liste des ingrédients
    r.ingredients.map((i) => {
      components.push(i.ingredient);
    });
    // liste des appareils
    devices.push(r.appliance);
    // liste des ustensiles
    r.ustensils.map((u) => {
      ustensils.push(u);
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
  filterSelectableItems('Appareils', selectableDevices, selectedDevices);
  ustensils = [...new Set(ustensils)];
  selectableUstensils.data = ustensils;
  filterSelectableItems('Ustensiles', selectableUstensils, selectedUstensils);
  renderFilters();
  renderRecipes(recipes);
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
    selectedDevices
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
  let selectedItems = [];
  let recipesList = {};
  switch (category) {
    case 'Ingrédients':
      selectedComponents.add(name);
      selectedItems = selectedComponents.data;
      break;
    case 'Appareils':
      selectedDevices.add(name);
      selectedItems = selectedDevices.data;
      break;
    case 'Ustensiles':
      selectedUstensils.add(name);
      selectedItems = selectedUstensils.data;
      break;
  }
  recipesList = recipes.filter((recipe) =>
    selectedItems.every((selectedItem) =>
      recipe.ustensils.includes(selectedItem)
    )
  );
  newSelectableItems(recipesList);
};
const handleDeleteFilter = (e) => {
  const element = e.currentTarget;
  const category = element.dataset.cat;
  const value = element.previousElementSibling.textContent;
  let selectedItems = [];
  let recipesList = {};
  switch (category) {
    case 'Ingrédients':
      selectedComponents.remove(value);
      selectedItems = selectedComponents.data;
      break;
    case 'Appareils':
      selectedDevices.remove(value);
      selectedItems = selectedDevices.data;
      break;
    case 'Ustensiles':
      selectedUstensils.remove(value);
      selectedItems = selectedUstensils.data;
      break;
  }
  recipesList = recipes.filter((recipe) =>
    selectedItems.every((selectedItem) =>
      recipe.ustensils.includes(selectedItem)
    )
  );
  newSelectableItems(recipesList);
};

export { handleSelectFilter, newSelectableItems, renderFilters };

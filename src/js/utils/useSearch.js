import {
  selectableComponents,
  selectableDevices,
  selectableUstensils,
} from '../pages/index.js';
import { renderRecipes } from '../templates/recipes.js';
import { formatListFilters } from '../templates/select.js';
import { handleSelectFilter } from './useFilter.js';
import {
  filterRecipesListBySelection,
  renderRecipesList,
} from './useRecipes.js';

const mainSearch = document.querySelector('#mainsearch');
const mainCancel = document.querySelector('#maincancel');

const filterRecipesListByMainSearch = (mainSearchValue) => {
  let currentFilteredRecipes = filterRecipesListBySelection();
  currentFilteredRecipes = currentFilteredRecipes.filter((recipe) => {
    return (
      recipe.name.includes(mainSearchValue) ||
      recipe.ingredients.some((ingredient) => {
        return ingredient.ingredient.includes(mainSearchValue);
      }) ||
      recipe.description.includes(mainSearchValue)
    );
  });
  renderRecipes(currentFilteredRecipes);
};

const searchByMainInput = (e) => {
  let searchValue = e.currentTarget.value;
  // Affiche ou pas la croix pour effacer le contenu
  const onClick = () => {
    mainSearch.value = '';
    renderRecipesList(filterRecipesListBySelection());
  };
  if (!searchValue) {
    mainCancel.classList.add('hidden');
    mainCancel.removeEventListener('click', onClick);
  } else {
    mainCancel.classList.remove('hidden');
    mainCancel.addEventListener('click', onClick);
  }
  // Affiche la liste des recettes correspondantes
  if (searchValue.length < 3) {
    renderRecipesList(filterRecipesListBySelection());
  } else {
    filterRecipesListByMainSearch(searchValue);
  }
};

const searchBySelectInput = (e) => {
  const element = e.currentTarget;
  const value = element.value;
  // Affiche ou pas la croix pour effacer le contenu
  const cross = element.nextElementSibling;
  if (!value) {
    cross.classList.add('hidden');
  } else {
    cross.classList.remove('hidden');
  }
  // Affiche la liste des filtres correspondants
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

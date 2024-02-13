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
  let filteredRecipes = [];

  const containsString = (str, substring) => {
    return str.indexOf(substring) !== -1;
  };
  const containsIngredient = (ingredients, mainSearchValue) => {
    for (let j = 0; j < ingredients.length; j++) {
      if (containsString(ingredients[j].ingredient, mainSearchValue)) {
        return true;
      }
    }
    return false;
  };

  for (let i = 0; i < currentFilteredRecipes.length; i++) {
    let recipe = currentFilteredRecipes[i];
    if (
      containsString(recipe.name, mainSearchValue) ||
      containsIngredient(recipe.ingredients, mainSearchValue) ||
      containsString(recipe.description, mainSearchValue)
    ) {
      filteredRecipes.push(recipe);
    }
  }

  renderRecipes(filteredRecipes);
};

const searchByMainInput = (e) => {
  let searchValue = e.target.value;
  // Affiche ou pas la croix pour effacer le contenu
  if (!searchValue) {
    mainCancel.classList.add('hidden');
  } else {
    mainCancel.classList.remove('hidden');
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

import {
  recipes,
  selectedComponents,
  selectedDevice,
  selectedUstensils,
} from '../pages/index.js';
import { renderRecipes } from '../templates/recipes.js';

const filterRecipesListBySelection = (recipesList = recipes) => {
  let filteredRecipesList = recipesList;

  if (selectedComponents.data.length) {
    filteredRecipesList = filteredRecipesList.filter((recipe) => {
      return selectedComponents.data.every((selectedComponent) => {
        return recipe.ingredients.some((ingredient) => {
          return ingredient.ingredient === selectedComponent;
        });
      });
    });
  }
  if (selectedDevice.data.length) {
    filteredRecipesList = filteredRecipesList.filter((recipe) => {
      return recipe.appliance === selectedDevice.data[0];
    });
  }
  if (selectedUstensils.data.length) {
    filteredRecipesList = filteredRecipesList.filter((recipe) => {
      return selectedUstensils.data.some((selectedUstensil) => {
        return recipe.ustensils.includes(selectedUstensil);
      });
    });
  }

  return filteredRecipesList;
};

const renderRecipesList = () => {
  const filteredRecipesList = filterRecipesListBySelection();
  renderRecipes(filteredRecipesList);
};

export { filterRecipesListBySelection, renderRecipesList };

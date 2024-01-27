import { ListofRecipes } from '../templates/recipes.js';
import { Select } from '../templates/select.js';
import { useFetch } from '../utils/useFetch.js';

const nbRecipes = document.querySelector('.nbrecipes');
const filterSelects = document.querySelector('.filters__selects');
const recipesCards = document.querySelector('.cards');

async function init() {
  const { recipes } = await useFetch('./src/datas/recipes.json');
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
  devices = [...new Set(devices)];
  ustensils = [...new Set(ustensils)];

  // Mise à jour du total des recettes
  nbRecipes.innerHTML = `${recipes.length} recettes`;
  // Affichage des filtres
  filterSelects.innerHTML = Select('Ingrédients', components);
  filterSelects.innerHTML += Select('Appareils', devices);
  filterSelects.innerHTML += Select('Ustensiles', ustensils);
  // Affichage des plats
  recipesCards.innerHTML = ListofRecipes(recipes);
}

init();

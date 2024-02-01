import GlobalArray from '../models/GlobalArray.js';
import { listOfRecipes } from '../templates/recipes.js';
import { useFetch } from '../utils/useFetch.js';
import { renderFilters } from '../utils/useFilter.js';
import { startToListen } from '../utils/useSearch.js';

// Déclaration des variables
let components = [];
let selectedComponents = new GlobalArray();
let selectableComponents = new GlobalArray();
let devices = [];
let selectedDevices = new GlobalArray();
let selectableDevices = new GlobalArray();
let ustensils = [];
let selectedUstensils = new GlobalArray();
let selectableUstensils = new GlobalArray();

async function init() {
  const { recipes } = await useFetch('./src/datas/recipes.json');
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

  // Affichage des filtres
  renderFilters();
  // Affichage des plats
  listOfRecipes(recipes);
  // Début des écoutes des points de recherches
  startToListen();
}

init();

export {
  components,
  devices,
  selectableComponents,
  selectableDevices,
  selectableUstensils,
  selectedComponents,
  selectedDevices,
  selectedUstensils,
  ustensils,
};

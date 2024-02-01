import GlobalArray from '../models/GlobalArray.js';
import { renderRecipes } from '../templates/recipes.js';
import { useFetch } from '../utils/useFetch.js';
import { newSelectableItems } from '../utils/useFilter.js';
import { startToListen } from '../utils/useSearch.js';

// Déclaration des variables
let selectedComponents = new GlobalArray();
let selectableComponents = new GlobalArray();
let selectedDevices = new GlobalArray();
let selectableDevices = new GlobalArray();
let selectedUstensils = new GlobalArray();
let selectableUstensils = new GlobalArray();

async function init() {
  const { recipes } = await useFetch('./src/datas/recipes.json');
  // Création du tableau des filtres
  // Mise à jour des boutons des filtres
  // Mise à jour de l'affichage des recettes
  newSelectableItems(recipes);
  // Début des écoutes des points de recherches
  startToListen();
}

init();

export {
  selectableComponents,
  selectableDevices,
  selectableUstensils,
  selectedComponents,
  selectedDevices,
  selectedUstensils,
};

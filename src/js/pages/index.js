import GlobalArray from '../models/GlobalArray.js';
import useFetch from '../utils/useFetch.js';
import { updateFiltersBtn } from '../utils/useFilter.js';
import { startToListen } from '../utils/useSearch.js';

// Déclaration des variables
let selectedComponents = new GlobalArray();
let selectableComponents = new GlobalArray();
let selectedDevice = new GlobalArray();
let selectableDevices = new GlobalArray();
let selectedUstensils = new GlobalArray();
let selectableUstensils = new GlobalArray();
const { recipes } = await useFetch('./src/datas/recipes.json');

async function init() {
  // Création du tableau des filtres
  // Mise à jour des boutons des filtres
  // Mise à jour de l'affichage des recettes
  updateFiltersBtn(recipes);
  // Début des écoutes des points de recherches
  startToListen();
}

init();

export {
  recipes,
  selectableComponents,
  selectableDevices,
  selectableUstensils,
  selectedComponents,
  selectedDevice,
  selectedUstensils,
};

import { ListofRecipes } from '../templates/recipes.js';
import { Select } from '../templates/select.js';
import { useFetch } from '../utils/useFetch.js';

// DOM
const nbRecipes = document.querySelector('.nbrecipes');
const filterSelects = document.querySelector('.filters');
const recipesCards = document.querySelector('.cards');
// Déclaration des variables
let components = [];
let selectedComponents = [];
let devices = [];
let selectedDevices = [];
let ustensils = [];
let selectedUstensils = [];
// Déclaration des fonctions
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
  // Activation de la sélection des filtres
  const filters = document.querySelectorAll('.selectable');
  filters.forEach((filter) => {
    filter.addEventListener('click', handleSelectFilter);
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
  const category = e.currentTarget.dataset.cat;
  const name = e.currentTarget.innerHTML;
  switch (category) {
    case 'Ingrédients':
      selectedComponents.push(name);
      break;
    case 'Appareils':
      selectedDevices.push(name);
      break;
    case 'Ustensiles':
      selectedUstensils.push(name);
      break;
  }
  renderFilters();
};

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

  // Mise à jour du total des recettes
  nbRecipes.innerHTML = `${recipes.length} recettes`;
  // Affichage des filtres
  renderFilters();
  // Affichage des plats
  recipesCards.innerHTML = ListofRecipes(recipes);
}

init();

const nbTotalRecipes = document.querySelector('.nbrecipes');
const recipesCards = document.querySelector('.cards');

const listOfRecipes = (recipes) => {
  // Mise à jour du total des recettes dans le DOM
  const nbRecipes = recipes.length;
  if (nbRecipes) {
    nbTotalRecipes.innerHTML = `${recipes.length} recettes`;
  } else {
    return `
      <p>Aucune recette ne contient ‘XXX ’ vous pouvez chercher «
tarte aux pommes », « poisson », etc.</p>
    `;
  }

  let recipe = {};
  let card = '';
  for (let index = 0; index < nbRecipes; index++) {
    recipe = recipes[index];
    const { name, image, time, description, ingredients } = recipe;
    let components = '';
    ingredients.map((i) => {
      const quantity = i.quantity || '';
      let unit = i.unit || '';
      if (unit.length > 3) {
        if (unit == 'grammes') {
          unit = 'g';
        } else {
          unit = ' ' + unit;
        }
      }
      components += `
        <div class="components__item">
          <h4>${i.ingredient}</h4>
          <span>${quantity}${unit}</span>
        </div>
      `;
    });
    card += `
      <article class="card">
        <span class="card__time">${time}min</span>
        <img src="./src/assets/images/recipes/${image}" alt="${name}" />
        <div class="card__content">
          <h2>${name}</h2>
          <h3>Recette</h3>
          <p>${description}</p>
          <h3>Ingrédients</h3>
          <div class="components">${components}</div>
        </div>
      </article>
    `;
  }

  recipesCards.innerHTML = card;
};

export { listOfRecipes };

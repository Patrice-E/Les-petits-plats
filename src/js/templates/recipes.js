const ListofRecipes = (recipes) => {
  const nbRecipes = recipes.length > 10 ? 10 : nbRecipes.length;

  let recipe = {};
  let card = '';
  for (let index = 0; index < nbRecipes; index++) {
    recipe = recipes[index];
    const { name, image, time, description, ingredients } = recipe;
    let components = '';
    ingredients.map((i) => {
      const quantity = i.quantity || '';
      let unit = i.unit || '';
      if (unit.length > 7) {
        unit = ` ${unit}`;
      } else if (unit.length > 3) {
        unit = unit.charAt(0);
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
  return card;
};

export { ListofRecipes };

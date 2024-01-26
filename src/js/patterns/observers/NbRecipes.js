class RecipesSubject {
  constructor() {
    this._observers = [];
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers = this._observers.filter((obs) => obs !== observer);
  }

  fire(state) {
    this._observers.forEach((obs) => obs.update(state));
  }
}

class RecipesCounter {
  constructor() {
    this._nbRecipes = 0;
    this._$nbRecipes = document.querySelector('.nbrecipes');
  }

  update(count) {
    this._nbRecipes = count;
    this._$nbRecipes.innerHTML = this._nbRecipes;
  }
}

export { RecipesCounter, RecipesSubject };

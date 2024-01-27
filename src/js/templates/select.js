const Select = (title, arrayOfItems, arrayOfSelectedItems = []) => {
  let list = '';
  arrayOfItems.map((arr) => {
    list += `<li>${arr}</li>`;
  });
  let selected = '';
  arrayOfSelectedItems.map((arr) => {
    selected += `
      <li>
        <span>${arr}</span>
        <button>
          <img src="./src/assets/icons/cancel.svg" alt=""/>
        </button>
      </li>`;
  });

  return `
    <div class="filter">
      <div class="filter__btn">
        <button>
          <span>${title}</span>
          <span class="arrow">
            <img src="./src/assets/icons/arrowdown.svg" alt="" />
          </span>
        </button>
        <div class="showlist hidden">
          <input type="search" name=${title} id=${title}>
          <div class="filter__items"></div>
          <ul>${list}</ul>
        </div>
      </div>
      <div class="filter__selected">
        <ul>${selected}</ul>
      </div>
    </div>
  `;
};

export { Select };

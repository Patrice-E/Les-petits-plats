const Select = (title, arrayOfItems, arrayOfSelectedItems = []) => {
  const filteredArray = arrayOfItems.filter(
    (items) => !arrayOfSelectedItems.includes(items)
  );
  let list = '';
  filteredArray.map((item) => {
    list += `<li>${item}</li>`;
  });
  let selected = '';
  arrayOfSelectedItems.map((selectItem) => {
    selected += `
      <li>
        <span>${selectItem}</span>
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
          <button>
            <span>${title}</span>
            <span class="arrow">
              <img src="./src/assets/icons/arrowup.svg" alt="" />
            </span>
          </button>
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

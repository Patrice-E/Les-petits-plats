const capitalizeTxt = (text) => {
  return text[0].toUpperCase() + text.slice(1);
};

const formatListFilters = (list, cat) => {
  let listFilters = '';
  list.map((item) => {
    listFilters += `<li class="selectable" data-cat=${cat}>${capitalizeTxt(
      item
    )}</li>`;
  });
  return listFilters;
};

const Select = (title, arrayOfItems, arrayOfSelectedItems) => {
  let listSelected = '';
  arrayOfSelectedItems.data.map((item) => {
    listSelected += `
      <div class="selected">
        <li>${capitalizeTxt(item)}</li>
        <button type=button>
          <img src="./src/assets/icons/cross.svg" alt=""/>
        </button>
      </div>`;
  });
  let listFilters = formatListFilters(arrayOfItems.data, title);
  let selected = '';
  arrayOfSelectedItems.data.map((selectItem) => {
    selected += `
      <li>
        <span>${selectItem}</span>
        <button class="btn-selected" data-cat=${title}>
          <img src="./src/assets/icons/cancel.svg" alt=""/>
        </button>
      </li>`;
  });

  return `
    <div class="filter">
      <div class="filter__btn">
        <button data-btn=${title}>
          <span>${title}</span>
          <span class="arrow">
            <img src="./src/assets/icons/arrowdown.svg" alt="" />
          </span>
        </button>
        <div class="showlist hidden" data-showlist=${title}>
          <button data-btn=${title}>
            <span>${title}</span>
            <span class="arrow">
              <img src="./src/assets/icons/arrowup.svg" alt="" />
            </span>
          </button>
          <input type="text" name=${title} id=${title} class="filtersearch">
          <div class="showlist__items">
            <ul>${listSelected}</ul>
            <ul class= "selectable-items">${listFilters}</ul>
          </div>
        </div>
      </div>
      <div class="filter__selected">
        <ul>${selected}</ul>
      </div>
    </div>
  `;
};

export { Select, formatListFilters };

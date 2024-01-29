const handleClick = (e) => {
  const btnInfo = e.currentTarget.dataset.btn;
  const showList = document.querySelector(
    `.showlist[data-showlist="${btnInfo}"]`
  );
  showList.classList.toggle('hidden');
};

const Select = (title, arrayOfItems, arrayOfSelectedItems = []) => {
  const notFilteredArray = arrayOfItems.filter(
    (items) => !arrayOfSelectedItems.includes(items)
  );
  let listSelected = '';
  arrayOfSelectedItems.map((item) => {
    listSelected += `<li class="selected">${item}</li>`;
  });
  let listFilters = '';
  notFilteredArray.map((item) => {
    listFilters += `<li>${item}</li>`;
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
          <input type="search" name=${title} id=${title}>
          <div class="showlist__items">
            <ul>${listSelected}</ul>
            <ul>${listFilters}</ul>
          </div>
        </div>
      </div>
      <div class="filter__selected">
        <ul>${selected}</ul>
      </div>
    </div>
  `;
};

export { Select, handleClick };

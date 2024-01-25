const Select = (title, array) => {
  let list = '';
  array.map((arr) => {
    list += `<li>${arr}</li>`;
  });
  return `
    <div class="filter">
      <button>
        <span>${title}</span>
        <span class="arrow">
          <img src="./src/assets/icons/arrowdown.svg" alt="" />
        </span>
      </button>
      <div class="filter__showlist">
        <input type="text" name=${title} id=${title}>
        <div class="filter__items"></div>
        <ul>${list}</ul>
      </div>
    </div>
  `;
};

export { Select };

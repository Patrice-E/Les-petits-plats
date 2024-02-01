class GlobalArray {
  constructor() {
    this.data = [];
  }
  add(item) {
    this.data.push(item);
  }
  remove(value) {
    this.data = this.data.filter((item) => item !== value);
  }
}

export default GlobalArray;

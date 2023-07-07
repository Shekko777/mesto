class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderElements() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item, append) {
    !append
      ? this._containerElement.prepend(item)
      : this._containerElement.append(item);
  }
}

export default Section;

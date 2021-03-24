class Section {
  constructor({items, renderer}, containerSelector) {
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // render data items to html presentation
  renderItems() {
    this._itemsArray.forEach(item => {
      this._renderer(item);
    })
  }

  // insert html item to container
  addItem(element) {
    this._container.append(element);
  }
}

export default Section;

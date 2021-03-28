class Section {
  constructor({items, renderer}, containerSelector) {
    this._itemsArray = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  // render data items to html presentation
  renderItems() {
    this._itemsArray.forEach(item => {
      this._renderer(item);
    })
  }

  // insert html item to container
  addItem(element) {
    this._containerElement.prepend(element);
  }
}
export default Section;

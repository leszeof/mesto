import Popup from './Popup.js';
class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector(imageSelector);
    this._imageName = this._popup.querySelector(titleSelector);
  }

  // open popup
  open(name, link) {
    this._configurePopup(name, link);
    super.open();
  }

  // insert new content in preview image popup
  _configurePopup(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._imageName.textContent = name;
  }
}

export default PopupWithImage;

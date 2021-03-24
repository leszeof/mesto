import Popup from './Popup.js';
class PopupWithImage extends Popup {
  constructor(popupSelector, closeButtonSelector, imageSelector, titleSelector) {
    super(popupSelector, closeButtonSelector);

    this._image = this._popup.querySelector(imageSelector);
    this._imageName = this._popup.querySelector(titleSelector);
  }

  // open popup
  open(name, link) {
    this._fillPopup(name, link);
    super.open();
  }

  // insert new content in preview image popup
  _fillPopup(name, link) {

  }
}

export default PopupWithImage;

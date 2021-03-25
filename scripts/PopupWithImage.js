import Popup from './Popup.js';
class PopupWithImage extends Popup {
  constructor(popupSelector, {closeButtonSelector, popupImageSelector, popupImageTitleSelector}) {
    super(popupSelector, closeButtonSelector);

    this._imageElem = this._popupElem.querySelector(popupImageSelector);
    this._imageCaptionElem = this._popupElem.querySelector(popupImageTitleSelector);
  }

  // open popup
  open(name, link) {
    this._configurePopup(name, link);
    super.open();
  }

  // insert new content in preview image popup
  _configurePopup(name, link) {
    this._imageElem.src = link;
    this._imageElem.alt = name;
    this._imageCaptionElem.textContent = name;
  }
}

export default PopupWithImage;

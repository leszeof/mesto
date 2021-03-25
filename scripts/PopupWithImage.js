import Popup from './Popup.js';
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElem = this._popupElem.querySelector('.popup__image');
    this._imageCaptionElem = this._popupElem.querySelector('.popup__image-caption');
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

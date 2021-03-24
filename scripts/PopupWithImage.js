import Popup from './Popup.js';
class PopupWithImage extends Popup {
  constructor(popupSelector, closeButtonSelector, imageSelector, titleSelector) {
    super(popupSelector, closeButtonSelector);

    this._image = this._popup.querySelector(imageSelector);
    this._imageName = this._popup.querySelector(titleSelector);
  }


}

export default PopupWithImage;

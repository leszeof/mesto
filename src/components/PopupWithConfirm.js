import Popup from './Popup.js';
class PopupWithConfirm extends Popup {
  constructor({popupSelector, submitFormHandler}) {
    super(popupSelector);

    this._submitFormHandler = submitFormHandler;
  }

}

export default PopupWithConfirm;

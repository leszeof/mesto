import Popup from './Popup.js';
class PopupWithConfirm extends Popup {
  constructor({popupSelector, submitFormHandler}) {
    super(popupSelector);

    this._popupForm = this._popupElem.querySelector('.popup__form');
    this._submitFormHandler = submitFormHandler;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();

      this._submitFormHandler();
      this.close();
    });
  }
}

export default PopupWithConfirm;

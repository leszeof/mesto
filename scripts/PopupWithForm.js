import Popup from './Popup.js';
class PopupWithForm extends Popup {
  constructor({popupSelector, closeButtonSelector, formSelector, submitButtonSelector}, submitFormHandler) {
    super(popupSelector, closeButtonSelector);
    this._popupForm = this._popupElem.querySelector(formSelector);
    this._popupSubmitButton = this._popupElem.querySelector(submitButtonSelector);

    this._submitFormHandler = submitFormHandler;
  }

  // получаем значения всех полей формы
  _getInputValues() {}


  // обработчик сабмита
  setEventListeners() {}

  // делать ресет формы
  close() {}
}

export default PopupWithForm;

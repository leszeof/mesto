import Popup from './Popup.js';
class PopupWithForm extends Popup {
  constructor({popupSelector, closeButtonSelector, formSelector, submitButtonSelector, formInputSelector}, submitFormHandler) {
    super(popupSelector, closeButtonSelector);

    this._popupForm = this._popupElem.querySelector(formSelector);
    this._popupSubmitButton = this._popupElem.querySelector(submitButtonSelector);
    this._inputList = this._popupElem.querySelectorAll(formInputSelector);

    this._submitFormHandler = submitFormHandler;
  }

  // получаем значения всех полей формы
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }


  // обработчик сабмита
  setEventListeners() {}

  // делать ресет формы
  close() {}
}

export default PopupWithForm;

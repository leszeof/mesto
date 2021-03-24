import Popup from './Popup.js';
class PopupWithForm extends Popup {
  constructor(popupSelector, closeButtonSelector, formSelector, formInputSelector, submitFormHandler) {
    super(popupSelector, closeButtonSelector);

    this._popupForm = this._popupElem.querySelector(formSelector);
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
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) => {
      this._submitFormHandler(event);
    });
  }

  // делать ресет формы
  close() {
    super.close();

    this._popupForm.reset();
  }
}

export default PopupWithForm;

import Popup from './Popup.js';
class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormHandler) {
    console.log(arguments);
    super(popupSelector);

    this._popupForm = this._popupElem.querySelector('.popup__form');
    this._inputList = this._popupElem.querySelectorAll('.popup-form__input');

    this._submitFormHandler = submitFormHandler;
  }

  // get all input values
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  // set event-listeners
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();

      this._submitFormHandler();
    });
  }

  // close popup with additional functionality
  close() {
    super.close();

    this._popupForm.reset();
  }
}

export default PopupWithForm;

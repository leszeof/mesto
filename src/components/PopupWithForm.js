import Popup from './Popup.js';
class PopupWithForm extends Popup {
  constructor({popupSelector, submitFormHandler, validationHandler}) {
    super(popupSelector);

    this._popupForm = this._popupElem.querySelector('.popup__form');
    this._inputList = this._popupElem.querySelectorAll('.popup-form__input');

    this._submitFormHandler = submitFormHandler;
    this._validationHandler = validationHandler;
  }

  // get all input values
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // console.log(this._formValues);
    return this._formValues;
  }

  // set event-listeners
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();

      this._submitFormHandler(this._getInputValues());
      this.close();
    });
  }

  // close popup with additional functionality
  close() {
    super.close();
    this._popupForm.reset();
    this._validationHandler();
  }
}

export default PopupWithForm;

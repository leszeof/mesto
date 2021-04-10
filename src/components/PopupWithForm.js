import Popup from './Popup.js';
class PopupWithForm extends Popup {
  constructor({popupSelector, submitFormHandler, validationHandler}) {
    super(popupSelector);

    this._popupForm = this._popupElem.querySelector('.popup__form');
    this._inputList = this._popupElem.querySelectorAll('.popup-form__input');
    this._submitButton = this._popupForm.querySelector('.popup-form__submit-button');

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
      this.renderLoading(true);
      this._submitFormHandler(this._getInputValues());
      // this.close();
    });
  }

  //! косячная функция, надо запоминать текст кнопки
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButtonPreviousText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonPreviousText;
    }
  }

  // close popup with additional functionality
  close() {
    super.close();
    this._popupForm.reset();
    this._validationHandler();
  }
}

export default PopupWithForm;

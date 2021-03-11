class FormValidator {
  constructor(settingsObj, formToValidate) {
    // settings
    this._formSelector = settingsObj.formSelector;
    this._inputSelector = settingsObj.inputSelector;
    this._submitButtonSelector = settingsObj.submitButtonSelector;
    this._inputWithErrorClass = settingsObj.inputWithErrorClass;
    this._activeSpanErrorClass = settingsObj.activeSpanErrorClass;

    // form to validate
    this._formToValidate = formToValidate;
  }

  // public entrance function of FormValidator class
  enableValidation() {
    this._formToValidate.addEventListener('submit', (event) => {
      event.preventDefault();
    })

    this._setEventListeners();
  }

  // public class method: disables submit button for add place popup when popup reused
  disableSubmitButton(formElement) {
    const submitButton = formElement.querySelector(this._submitButtonSelector);
    submitButton.disabled = true;
  }

  // Private methods
  // set event-listeners on submit button and input
  _setEventListeners() {
    const inputList = Array.from(this._formToValidate.querySelectorAll(this._inputSelector));
    const submitButtonElement = this._formToValidate.querySelector(this._submitButtonSelector);

    inputList.forEach (inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);

        this._toggleSubmitButtonState(inputList, submitButtonElement);
      });
    });
  }

  // check current input validity
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // change submit button state based on the validity of all form inputs
  _toggleSubmitButtonState(inputList, submitButtonElement) {
    if (this._hasInvalidInput(inputList)) {
      submitButtonElement.disabled = true;
    } else {
      submitButtonElement.disabled = false;
    }
  }

  // function-predicate for _toggleSubmitButtonState function
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  // show span error and invalid input styles
  _showInputError(inputElement, errorMessage) {
    const errorSpanElement = this._formToValidate.querySelector(`#${inputElement.id}-error`);
    errorSpanElement.textContent = errorMessage;
    errorSpanElement.classList.add(this._activeSpanErrorClass);
    inputElement.classList.add(this._inputWithErrorClass);
  }

  // hide span error and show default input styles
  _hideInputError(inputElement) {
    const errorSpanElement = this._formToValidate.querySelector(`#${inputElement.id}-error`);
    errorSpanElement.textContent = '';
    errorSpanElement.classList.remove(this._activeSpanErrorClass);
    inputElement.classList.remove(this._inputWithErrorClass);
  }

}

export default FormValidator;

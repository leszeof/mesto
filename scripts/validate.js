class FormValidator {
  constructor(settingsObj, formToValidate) {
    // настройки
    this._formSelector = settingsObj.formSelector;
    this._inputSelector = settingsObj.inputSelector;
    this._submitButtonSelector = settingsObj.submitButtonSelector;
    this._inputWithErrorClass = settingsObj.inputWithErrorClass;
    this._activeSpanErrorClass = settingsObj.activeSpanErrorClass;

    // элемент который надо провалидировать
    this._formToValidate = formToValidate;
  }



}








const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__submit-button',
  inputWithErrorClass: 'popup-form__input_type_error',
  activeSpanErrorClass: 'popup__input-error_active'
};

// enable validation on forms, entrance function
function enableValidation({formSelector, ...options}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach( formElement => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    })

    setEventListeners(formElement, options);
  })
}
// enableValidation(validationSettings);

// set event-listeners in each form on submit buttons and inputs
function setEventListeners(formElement, {inputSelector, submitButtonSelector, ...options}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach (inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, options);

      toggleSubmitButtonState(inputList, submitButtonElement);
    });
  });
}

// change submit button state based on the validity of all form inputs
function toggleSubmitButtonState(inputList, submitButtonElement) {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.disabled = true;
  } else {
    submitButtonElement.disabled = false;
  }
}

// function-predicate for toggleSubmitButtonState function
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

// check current input validity
function checkInputValidity (formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

// show span error and invalid input styles
function showInputError(formElement, inputElement, errorMessage, {inputWithErrorClass, activeSpanErrorClass}) {
  const errorSpanElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorSpanElement.textContent = errorMessage;
  errorSpanElement.classList.add(activeSpanErrorClass);
  inputElement.classList.add(inputWithErrorClass);
}

// hide span error and show default input styles
function hideInputError(formElement, inputElement, {inputWithErrorClass, activeSpanErrorClass}) {
  const errorSpanElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorSpanElement.textContent = '';
  errorSpanElement.classList.remove(activeSpanErrorClass);
  inputElement.classList.remove(inputWithErrorClass);
}

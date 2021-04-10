import Popup from './Popup.js';
class PopupWithConfirm extends Popup {
  constructor({popupSelector, submitFormHandler}) {
    super(popupSelector);

    this._popupForm = this._popupElem.querySelector('.popup__form');
    this._submitButton = this._popupForm.querySelector('.popup-form__submit-button');

    this._submitFormHandler = submitFormHandler;
  }

  open(cardToDelete, cardID) {
    super.open();
    this._cardToDelete = cardToDelete;
    this._cardID = cardID;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButtonPreviousText = this._submitButton.textContent;
      this._submitButton.textContent = 'Выполнение...';
    } else {
      this._submitButton.textContent = this._submitButtonPreviousText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._submitFormHandler(this._cardToDelete, this._cardID);
      // this.close();
    });
  }
}

export default PopupWithConfirm;

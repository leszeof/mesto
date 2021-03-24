class Popup {
  constructor(popupSelector) {
    this._popupElem = document.querySelector(popupSelector);
  }

  open() {
    this._popupElem.classList.add('popup_opened');

    // close popup on escape listener
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElem.classList.remove('popup_opened');

    // delete close popup on escape listener
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      const curentOpenedPopup = document.querySelector('.popup_opened');
      this.close(curentOpenedPopup);
    }
  }

  setEventListeners() {}
}

export default Popup;

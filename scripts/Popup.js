class Popup {
  constructor(popupSelector) {
    this._popupElem = document.querySelector(popupSelector);
  }

  open() {
    this._popupElem.classList.add('popup_opened');

    // close popup on escape listener
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {}

  _handleEscClose() {}

  setEventListeners() {}
}

export default Popup;

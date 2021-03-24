class Popup {
  constructor(popupSelector) {
    this._popupElem = document.querySelector(popupSelector);
  }

  // open popup
  open() {
    this._popupElem.classList.add('popup_opened');

    // close popup on escape listener
    document.addEventListener('keydown', this._handleEscClose);
  }

  // close popup
  close() {
    this._popupElem.classList.remove('popup_opened');

    // delete close popup on escape listener
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // close popup on 'escape' press
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      const curentOpenedPopup = document.querySelector('.popup_opened');
      this.close(curentOpenedPopup);
    }
  }

  //! а что делать с закрытием по оверлею?

  setEventListeners() {
    // close popup on overlay click listener
    this._popupElem.addEventListener('click', this._closeOnOverlayClick);

    // close popup on close button
    this._popupElem.querySelector('.popup__close-button').addEventListener('click', this.close);
  }

  _closeOnOverlayClick() {

  }
}

export default Popup;

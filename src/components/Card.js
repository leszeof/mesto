class Card {
  constructor({name, link}, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
  }

  // get html template
  _getTemplate() {
    const cardElement = document
      .querySelector('.template-card-item')
      .content
      .querySelector('.cards-item')
      .cloneNode(true);

    return cardElement;
  }

  // generate a card
  generateCard() {
    this._htmlCard = this._getTemplate();

    this._htmlCard.querySelector('.cards-item__title').textContent = this._name;
    this._htmlCard.querySelector('.cards-item__image').alt = this._name;
    this._htmlCard.querySelector('.cards-item__image').src = this._link;

    this._setEventListeners();

    return this._htmlCard;
  }

  // event listeners on a card
  _setEventListeners() {
    // fill and open image preview popup
    this._htmlCard.querySelector('.cards-item__image').addEventListener('click', (event) => {
      const imageName = event.target.alt;
      const imageLink = event.target.src;
      this._handleCardClick(imageName, imageLink)
    });

    // like card listener
    this._htmlCard.querySelector('.cards-item__like-button').addEventListener('click', (event) => {
      this._setLikeHandler(event);
    });

    // delete card listener
    this._htmlCard.querySelector('.cards-item__delete-button').addEventListener('click', (event) => {
      this._deleteCardHandler();
    });
  }

  // Handlers functions
    // like card function
  _setLikeHandler(event) {
    event.target.classList.toggle('cards-item__like-button_active');
  }

    // delete card function
  _deleteCardHandler(event) {
    this._htmlCard.style.transition = '0.5s';
    this._htmlCard.style.transform = 'scale(0, 0.3) rotate(360deg)';
    this._htmlCard.style.opacity = '0';
    setTimeout(() => {
      this._htmlCard.remove();
    }, 500);
  }
}

export default Card;

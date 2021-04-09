class Card {
  constructor({cardData, cardTemplateSelector: cardSelector, currentUserId, handleCardPreview, deleteCardHandler, likeCardHandler}) {
    // card data binding
    this._cardDataBinding(cardData, currentUserId);

    // card elements binding
    this._cardElementsBinding(cardSelector);

    // callback handlers for card actions
    this._handleCardPreview = handleCardPreview;
    this._deleteCardHandler = deleteCardHandler;
    this._likeCardHandler = likeCardHandler;
  }

  _cardDataBinding(cardData, currentUserId) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes.length;
    this._cardId = cardData._id;
    console.log(this._cardId);
    this._ownerId = cardData.owner._id;
    this._isOwner = currentUserId === this._ownerId;
  }

  _cardElementsBinding(cardSelector) {
    this._cardSelector = cardSelector;

    this._htmlCard = this._getTemplate();
    this._cardImage = this._htmlCard.querySelector('.cards-item__image');
    this._cardTitle = this._htmlCard.querySelector('.cards-item__title');
    this._likeButton = this._htmlCard.querySelector('.cards-item__like-button');
    this._cardLikeCouner = this._htmlCard.querySelector('.cards-item__like-counter');
    this._cardDeleteButton = this._htmlCard.querySelector('.cards-item__delete-button');
  }

  // get html template
  _getTemplate() {
    const cardElement = document
      .querySelector('.template-card-item')
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  // generate a card
  generateCard() {
    this._renderCard();

    this._setEventListeners();

    return this._htmlCard;
  }

  // render card presentation
  _renderCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardLikeCouner.textContent = this._likes;
  }

  // event listeners on a card
  _setEventListeners() {
    // card image listener (preview popup)
    this._cardImage.addEventListener('click', () => {
      const imageName = this._cardImage.alt;
      const imageLink = this._cardImage.src;
      this._handleCardPreview(imageName, imageLink)
    });

    // like button listener
    this._likeButton.addEventListener('click', (event) => {
      this._like();
    });

    // delete button listener
    this._cardDeleteButton.addEventListener('click', () => {
      this._deleteCardHandler(this, this._cardId);
    });
  }

  // Handlers functions
    // like card function
  _like() {
    //! логику надо менять
    this._likeButton.classList.toggle('cards-item__like-button_active');
  }

  deleteCard() {
    this._htmlCard.style.transition = '0.5s';
    this._htmlCard.style.transform = 'scale(0, 0.3) rotate(360deg)';
    this._htmlCard.style.opacity = '0';
    setTimeout(() => {
      this._htmlCard.remove();
    }, 500);
  }
}

export default Card;

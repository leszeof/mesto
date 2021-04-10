class Card {
  constructor({cardData, cardSelector, currentUserId, handleCardPreview, deleteCardHandler, likeCardHandler}) {
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
    this._likesArr = cardData.likes;
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._isOwner = currentUserId === this._ownerId;
    this._isLiked =  this._isCardLikedByYou(currentUserId);
    // console.log(this._isLiked);
  }

  _isCardLikedByYou(currentUserId) {
    return this._likesArr.some( (user) => {
      // console.log(user);
      return user._id === currentUserId;
    })
  }

  _cardElementsBinding(cardSelector) {
    this._cardSelector = cardSelector;

    this._htmlCard = this._getTemplate();
    this._cardImageElem = this._htmlCard.querySelector('.cards-item__image');
    this._cardTitleElem = this._htmlCard.querySelector('.cards-item__title');
    this._likeButtonElem = this._htmlCard.querySelector('.cards-item__like-button');
    this._likeCounerElem = this._htmlCard.querySelector('.cards-item__like-counter');
    this._deleteButtonElem = this._htmlCard.querySelector('.cards-item__delete-button');
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
    this._cardTitleElem.textContent = this._name;
    this._cardImageElem.alt = this._name;
    this._cardImageElem.src = this._link;
    this._likeCounerElem.textContent = this._likesArr.length;
  }

  // event listeners on a card
  _setEventListeners() {
    // card image listener (preview popup)
    this._cardImageElem.addEventListener('click', () => {
      const imageName = this._cardImageElem.alt;
      const imageLink = this._cardImageElem.src;
      this._handleCardPreview(imageName, imageLink)
    });

    // like button listener
    this._likeButtonElem.addEventListener('click', () => {
      // this._like();
      this._likeCardHandler();

      // ход действий
      /*
      1) лайкаем карточку
      2) попадаем в _likeCardHandler для Card class
      3) в нем обращаемся к api (важно понятть удалять или увеличивать лайк)

      Как понять, что ты уже лайкал карточку:
      твой айдишник будет висеть в
      */
    });

    // delete button listener
    this._deleteButtonElem.addEventListener('click', () => {
      this._deleteCardHandler(this, this._cardId);
    });
  }

  // Handlers functions
    // like card function
  _like() {
    //! логику надо менять

    // this._likeButtonElem.classList.toggle('cards-item__like-button_active');
  }

  _updateLikeCounter () {
    // this._likeCounerElem.textContent =
  }

  deleteCard() {
    this._htmlCard.style.transition = '0.5s';
    this._htmlCard.style.transform = 'scale(0, 0.3) rotate(360deg)';
    this._htmlCard.style.opacity = '0';
    setTimeout( () => {
      this._htmlCard.remove();
    }, 500);
  }
}

export default Card;

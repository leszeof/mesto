class Card {
  constructor({cardData, cardSelector, handleCardPreview, deleteCardHandler}) {
    console.log(arguments);
    this._name = cardData.name;
    this._link = cardData.link;
    this._owner = cardData.owner;
    this._likes = cardData.likes;

    this._cardSelector = cardSelector;

    this._handleCardPreview = handleCardPreview;
    this._deleteCardHandler = deleteCardHandler;
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
    this._htmlCard.querySelector('.cards-item__like-counter').textContent = this._likes;

    this._setEventListeners();

    return this._htmlCard;
  }

  // event listeners on a card
  _setEventListeners() {
    // fill and open image preview popup
    this._htmlCard.querySelector('.cards-item__image').addEventListener('click', (event) => {
      const imageName = event.target.alt;
      const imageLink = event.target.src;
      this._handleCardPreview(imageName, imageLink)
    });

    // like card listener
    this._htmlCard.querySelector('.cards-item__like-button').addEventListener('click', (event) => {
      this._setLikeHandler(event);
    });

    // delete card listener
    this._htmlCard.querySelector('.cards-item__delete-button').addEventListener('click', () => {
      // nice animations
      this._htmlCard.style.transition = '0.5s';
      this._htmlCard.style.transform = 'scale(0, 0.3) rotate(360deg)';
      this._htmlCard.style.opacity = '0';
      setTimeout(() => {
        this._htmlCard.remove();
      }, 500);

      // delete callback
        //! в нем надо открывать попап (экземпляр класса) ХОТИТЕ УДАЛИТЬ
        //! при клике ДА - проваливаемся в САБМИТ ХЭНДЛЕР для ПОПАПА!
        //! в нем желательно иметь id карточки чтобы послать DELETE запрос на сервер
      this._deleteCardHandler();
    });
  }

  // Handlers functions
    // like card function
  _setLikeHandler(event) {
    event.target.classList.toggle('cards-item__like-button_active');
  }

    // delete card function
  // _deleteCardHandler() {
  //   this._htmlCard.style.transition = '0.5s';
  //   this._htmlCard.style.transform = 'scale(0, 0.3) rotate(360deg)';
  //   this._htmlCard.style.opacity = '0';
  //   setTimeout(() => {
  //     this._htmlCard.remove();
  //   }, 500);
  // }
}

export default Card;

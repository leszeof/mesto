export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl; // https://mesto.nomoreparties.co/v1/cohort-22
    this._headers = headers;
  }

  // return user data (object)
  getUserInfo() {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: this._headers,
      }
    )
    .then( (response) => this._handleResponse(response) );
  }

  // return array of cards
  getInitialCards() {
    return fetch(
      `${this._baseUrl}/cards`,
      {
        method: 'GET',
        headers: this._headers,
      }
    )
    .then( (response) => this._handleResponse(response) );
  }

  // return updated user data (object)
  updateUserInfo({name, about}) {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        }),
      }
    )
    .then( (response) => this._handleResponse(response) );
  }

  // return new card (object)
  postNewCard({name, link}) {
    return fetch(
      `${this._baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        }),
      }
    )
    .then( (response) => this._handleResponse(response) );
  }

  // return string 'Объект удален'
  deleteCard(id) {
    return fetch(
      `${this._baseUrl}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this._headers,
      }
    )
    .then( (response) => this._handleResponse(response) );
  }

  // return updated card (object)
  putLike(cardId) {
    return fetch(
      `${this._baseUrl}/cards/likes/${cardId}`,
      {
        method: 'PUT',
        headers: this._headers,
      }
    )
    .then( (response) => this._handleResponse(response) );
  }

  // return updated card (object)
  deleteLike(cardId) {
    return fetch(
      `${this._baseUrl}/cards/likes/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers,
      }
    )
    .then( (response) => this._handleResponse(response) );
  }

  // return updated user data (object)
  updateUserAvatar(newLink) {
    return fetch(
      `${this._baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: newLink
        }),
      }
    )
    .then( (response) => this._handleResponse(response) );
  }

  // handle all responses to Api, return error or final result
  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }

    // если ошибка сервера, отклоняем промис
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

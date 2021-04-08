export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl; // https://mesto.nomoreparties.co/v1/cohort-22
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: this._headers,
      }
    )
      .then( (response) => {
        if (response.ok) {
          return response.json();
        }

        // если ошибка сервера, отклоняем промис
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .then( (result) => {
        return result;
      })
      .catch( (err) => {
        console.log(err); // выведем ошибку в консоль (в дальнейшем лучше обработать)
      })
  }

  getInitialCards() {
    return fetch(
      `${this._baseUrl}/cards`,
      {
        method: 'GET',
        headers: this._headers,
      }
    )
      .then( (response) => {
        if (response.ok) {
          return response.json();
        }

        // если ошибка сервера, отклоняем промис
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .then( (result) => {
        return result;
      })
      .catch( (err) => {
        console.log(err); // выведем ошибку в консоль (в дальнейшем лучше обработать)
      })
  }

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
      .then( (response) => {
        if (response.ok) {
          return response.json();
        }

        // если ошибка сервера, отклоняем промис
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch( (err) => {
        console.log(err); // выведем ошибку в консоль (в дальнейшем лучше обработать)
      })
  }

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
      .then( (response) => {
        if (response.ok) {
          return response.json();
        }

        // если ошибка сервера, отклоняем промис
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch( (err) => {
        console.log(err); // выведем ошибку в консоль (в дальнейшем лучше обработать)
      })
  }


  updateUserAvatar(newLink) {
    console.log(newLink);
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
      .then( (response) => {
        if (response.ok) {
          return response.json();
        }

        // если ошибка сервера, отклоняем промис
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch( (err) => {
        console.log(err); // выведем ошибку в консоль (в дальнейшем лучше обработать)
      })
  }
}

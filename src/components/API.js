export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-22/users/me ', {
      headers: this._headers,
    })
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
        console.log(err); // выведем ошибку в консоль
      })
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-22/cards ', {
      headers: this._headers,
    })
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
        console.log(err); // выведем ошибку в консоль
      })
  }
}

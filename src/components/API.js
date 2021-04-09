export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl; // https://mesto.nomoreparties.co/v1/cohort-22
    this._headers = headers;
  }

  //! или может тут нафиг не нужен второй then...
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
      });
  }

  //! или может тут нафиг не нужен второй then...
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
      });
  }

//! разве тут не нужен еще один then ??
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
      });
  }

//! разве тут не нужен еще один then ??
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
      });
  }

//! разве тут не нужен еще один then ??
  deleteCard(id) {
    return fetch(
      `${this._baseUrl}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this._headers,
      }
    )
      .then( (response) => {
        if (response.ok) {
          // return response.json(); // ответ: "Пост удален"
          return Promise.resolve(); // можно и так
        }

        // если ошибка сервера, отклоняем промис
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch( (err) => {
        console.log(err); // выведем ошибку в консоль (в дальнейшем лучше обработать)
      });
  }

  putLike(cardId) {
    return fetch(
      `${this._baseUrl}/cards/likes/${cardId}`,
      {
        method: 'PUT',
        headers: this._headers,
      }
    )
      .then( (response) => {
        if (response.ok) {
          return response.json(); //! ИТАК возвоащает карточку с обновленными лайками
        }

        // если ошибка сервера, отклоняем промис
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch( (err) => {
        console.log(err); // выведем ошибку в консоль (в дальнейшем лучше обработать)
      });
  }

  deleteLike(cardId) {
    return fetch(
      `${this._baseUrl}/cards/likes/${cardId}`,
      {
        method: 'DELETE',
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
      .catch( (err) => {
        console.log(err); // выведем ошибку в консоль (в дальнейшем лучше обработать)
      });
  }

  //! разве тут не нужен еще один then ??
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

export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-22/users/me ', {
      headers: this._headers,
    })
      .then(res => res.json())
      .then((result) => {
        return result;
      });
  }

  getInitialCards() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-22/cards ', {
      headers: this._headers,
    })
      .then(res => res.json())
      .then((result) => {
        return result;
      });
  }
}

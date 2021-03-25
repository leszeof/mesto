class UserInfo {
  constructor({userNameSelector, userDescriptionSelector}) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userDescriptionElem = document.querySelector(userDescriptionSelector);
  }
}

class UserInfo {
  constructor({userNameSelector, userDescriptionSelector}) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userDescriptionElem = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      currentUserName: this._userNameElem.value,
      currentUserDescription: this._userDescriptionElem.value
    }
  }

  setUserInfo() {}
}

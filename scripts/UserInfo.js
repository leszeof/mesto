class UserInfo {
  constructor({userNameSelector, userDescriptionSelector}) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userDescriptionElem = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      currentUserName: this._userNameElem.textContent,
      currentUserDescription: this._userDescriptionElem.textContent
    }
  }

  setUserInfo(newData) {
    this._userNameElem.textContent = '';
    this._userDescriptionElem.textContent = '';
  }
}
export default UserInfo;

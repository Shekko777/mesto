class UserInfo {
  constructor({ userName, userInfo, profileNameElement, profileJobElement }) {
    this._profileNameElement = profileNameElement;
    this._profileJobElement = profileJobElement;
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      job: this._profileJobElement.textContent,
    };
  }

  setUserInfo(name, info) {
    this._profileNameElement.textContent = name;
    this._profileJobElement.textContent = info;
  }
}

export default UserInfo;

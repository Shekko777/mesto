class UserInfo {
  constructor({ profileNameElement, profileJobElement }) {
    this._profileNameElement = profileNameElement;
    this._profileJobElement = profileJobElement;
  }

  getUserInfo() {
    return {
      user: this._profileNameElement.textContent,
      job: this._profileJobElement.textContent,
    };
  }

  // ДЛЯ РЕВЬЮ: не совсем понял про проверкуаргументов
  setUserInfo(name, about) {
    this._profileNameElement.textContent = name;
    this._profileJobElement.textContent = about;
  }
}

export default UserInfo;

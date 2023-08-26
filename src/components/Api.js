export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(console.log(`Oops: ${res.status}`));
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getResponce);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getResponce);
  }

  setNewUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addNewCard(link, name) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: link,
        name: name,
      }),
    });
  }
}

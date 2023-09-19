// Класс API для работы с сервером.
export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // Функция проверки ответа от сервера.
  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(console.log(`Oops: ${res.status}`));
  }

  // Получить карточки.
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getResponce);
  }

  // Получить информацию о пользователе с сервера.
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getResponce);
  }

  // Изменить информацию о пользователе на сервере.
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

  // Добавить новую карточку на сервер.
  addNewCard(link, name) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: link,
        name: name,
      }),
    }).then(this._getResponce);
  }

  // Удалить карточку с сервера.
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Лайк карточки.
  likeCard() {
    return fetch(`${this._url}/cards/${this._id}/likes`, {
      method: "PUT",
      header: this._headers,
    }).then(this._getResponce);
  }

  // Не лайк карточки.
  unLikeCard() {
    return fetch(`${this._url}/cards/${this._id}/likes`, {
      method: "DELETE",
      header: this._headers,
    }).then(this._getResponce);
  }
}

class Card {
  constructor({ handleCardClick }, data, template) {
    this._template = template;
    this._name = data.description;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  // Создание карточки
  generateCard() {
    this._element = this._template
      .querySelector(".elements__item")
      .cloneNode(true);
    this._setEventsListener();
    this._element.querySelector(".elements__title").textContent = this._name;
    this._element.querySelector(".elements__img").alt = this._name;
    this._element.querySelector(".elements__img").src = this._link;
    return this._element;
  }

  // Лайк карточки
  _handlerLikeButton = () => {
    this._element
      .querySelector(".elements__like")
      .classList.toggle("elements__like_active");
  };

  // Удаление карточки
  _deleteButtonToggle = () => {
    this._element.remove();
    this._element = null;
  };

  // Навесить слушатели событий
  _setEventsListener = () => {
    this._element
      .querySelector(".elements__button-delete")
      .addEventListener("click", this._deleteButtonToggle);

    this._element
      .querySelector(".elements__like")
      .addEventListener("click", this._handlerLikeButton);

    this._element
      .querySelector(".elements__img")
      .addEventListener("click", this._handleCardClick);
  };
}
export default Card;

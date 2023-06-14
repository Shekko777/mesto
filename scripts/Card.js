import { openPopup } from "./utils.js";

export class Card {
  constructor(data, template) {
    this._template = template;
    this._name = data.name;
    this._link = data.link;
  }

  // Создание карточки
  generateCard() {
    this._element = this._template.cloneNode(true).children[0];
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

  // Открытие модалки с карточкой
  _openModalCard = () => {
    openPopup(popupImage);
    imageCard.src = this._link;
    imageCard.alt = this._name;
    figcaptionCard.textContent = this._name;
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
      .addEventListener("click", this._openModalCard);
  };
}

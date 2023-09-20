class Card {
  constructor(
    { ownerId, handleCardClick, handleButtonDeleteClick, handleLikeClick },
    data,
    template
  ) {
    this._template = template;
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes;
    this._id = data._id;
    this._ownerIdCard = data.owner._id;
    this._userId = ownerId;
    this._handleCardClick = handleCardClick;
    this._handleButtonDeleteClick = handleButtonDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._element.querySelector(".elements__counter").textContent =
      this._like.length;
    if (this._ownerIdCard !== this._userId) {
      this._element.querySelector(".elements__button-delete").remove();
    }
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
    this._handleButtonDeleteClick(this._id);
  };

  deleteCard() {
    this._element.remove();
    this._element = null;
<<<<<<< HEAD
    this._handleButtonDeleteClick(this._id);
  };
=======
  }
>>>>>>> 5946671

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

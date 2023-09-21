class Card {
  constructor(
    { ownerId, handleCardClick, handleButtonDeleteClick, handleLikeClick },
    data,
    template
  ) {
    this._template = template;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
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
    this._elementTitle = this._element.querySelector(
      ".elements__title"
    ).textContent = this._name;
    this._elementName = this._element.querySelector(".elements__img").alt =
      this._name;
    this._elementLink = this._element.querySelector(".elements__img").src =
      this._link;
    this._likeCount = this._element.querySelector(".elements__counter");
    this._likeIcon = this._element.querySelector(".elements__like");
    this._likeCount.textContent = this._likes.length;
    if (this._ownerIdCard !== this._userId) {
      this._element.querySelector(".elements__button-delete").remove();
    }
    this._setMyLike();
    return this._element;
  }

  // Удаление карточки
  _deleteButtonToggle = () => {
    this._handleButtonDeleteClick(this._id);
  };

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Установит лайк по умолчанию
  _setMyLike = () => {
    if (this.checkedMyLike()) {
      this._likeIcon.classList.add("elements__like_active");
    }
  };

  // Проверит наличие моего лайка
  checkedMyLike() {
    return this._likes.some((like) => this._userId === like._id);
  }

  // Функция постановки и снятия лайка
  handleClickLike(boolean, dataCard) {
    if (boolean) {
      this._likes = dataCard.likes;
      this._likeCount.textContent = dataCard.likes.length;
    } else {
      this._likes = dataCard.likes;
      this._likeCount.textContent = dataCard.likes.length;
    }
  }

  // Навесить слушатели событий
  _setEventsListener = () => {
    this._element
      .querySelector(".elements__button-delete")
      .addEventListener("click", this._deleteButtonToggle);

    this._element
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this._handleLikeClick(this._id);
        this._likeIcon.classList.toggle("elements__like_active");
      });

    this._element
      .querySelector(".elements__img")
      .addEventListener("click", this._handleCardClick);
  };
}
export default Card;

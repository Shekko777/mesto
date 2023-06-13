export class Card {
  constructor(template) {
    this._template = template;
  }

  // Создание карточки
  generateCard(name, link) {
    this._element = this._template.cloneNode(true);
    this._setEventsListener(name, link);
    this._element.querySelector(".elements__title").textContent = name;
    this._element.querySelector(".elements__img").src = link;
    this._element.querySelector(".elements__img").alt = name;
    return this._element;
  }

  // Нажатие кнопки лайка
  _handlerLikeButton() {
    this._element
      .querySelector(".elements__like")
      .addEventListener("click", function () {
        this.classList.toggle("elements__like_active");
      });
  }

  // Кнопка удаления карточки
  _handlerDeleteButtonCard() {
    const card = this._element
      .querySelector(".elements__button-delete")
      .addEventListener("click", function () {
        this.closest(".elements__item").remove();
      });
  }

  // Закрытие при нажатии ESC
  _closePopupKeydownEscape = (evt) => {
    if (evt.key === "Escape") {
      const activePopup = document.querySelector(".popup_opened");
      activePopup.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._closePopupKeydownEscape);
    }
  };

  // Открытие модалки с карточкой
  _openModalCard(name, link) {
    this._element
      .querySelector(".elements__img")
      .addEventListener("click", () => {
        popupImage.classList.add("popup_opened");
        imageCard.src = link;
        imageCard.alt = name;
        figcaptionCard.textContent = name;
        document.addEventListener("keydown", this._closePopupKeydownEscape);
      });
  }

  // Навесить слушатели событий
  _setEventsListener = (name, link) => {
    this._handlerLikeButton();
    this._handlerDeleteButtonCard();
    this._openModalCard(name, link);
  };
}

// Функция закрытия формы
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupKeydownEscape);
}

// Закрытие при нажатии на оверлей
function closePopupTouchOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
    evt.target.removeEventListener("mousedown", closePopupTouchOverlay);
  }
}

// Закрытие при нажатии на Escape
function closePopupKeydownEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
    document.removeEventListener("keydown", closePopupKeydownEscape);
  }
}

// Функция открытие попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("mousedown", closePopupTouchOverlay);
  document.addEventListener("keydown", closePopupKeydownEscape);
}

// Открыть попап с картинкой
function setPopupImage(popupImage, imageCard, figcaptionCard, imgCard) {
  openPopup(popupImage);
  imageCard.src = imgCard.src;
  imageCard.alt = `${imgCard.alt} в полном масштабе`;
  figcaptionCard.textContent = imgCard
    .closest(".elements__item")
    .querySelector(".elements__title").textContent;
}

// Функция добавления карточки
function createCard(image, title) {
  const liCard = templateCard.querySelector(".elements__item").cloneNode(true);
  const imgCard = liCard.querySelector(".elements__img");
  const titleCard = liCard.querySelector(".elements__title");
  const likeButton = liCard.querySelector(".elements__like");
  const deleteButton = liCard.querySelector(".elements__button-delete");
  imgCard.src = image;
  imgCard.alt = `Фотокарточка ${title}`;
  titleCard.textContent = title;
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like_active");
  });
  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".elements__item").remove();
  });
  imgCard.addEventListener("click", () => {
    setPopupImage(popupImage, imageCard, figcaptionCard, imgCard);
  });
  return liCard;
}

initialCards.forEach((card) => {
  cardListContainer.append(createCard(card.link, card.name));
});

// Функция изменения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputValueName.value;
  profileJob.textContent = inputValueJob.value;
  closePopup(popupEdit);
}
formProfile.addEventListener("submit", handleProfileFormSubmit);

// Сброс ошибок полей в попапах ниже
function resetErrorsWhenOpenPopup(popupElement) {
  const inputsList = popupElement.querySelectorAll(".popup__input");
  inputsList.forEach((inputElement) => {
    const errorSpan = popupElement.querySelector(`#${inputElement.name}-error`);
    const submitButtonForm = popupElement.querySelector(
      formObject.submitButtonSelector
    );
    resetError(popupElement, errorSpan, formObject, submitButtonForm);
  });
}

// Функция открытия редактирования профиля
function openProfilePopup(popupElement) {
  resetErrorsWhenOpenPopup(popupElement);
  openPopup(popupElement);
  inputValueName.value = profileName.textContent;
  inputValueJob.value = profileJob.textContent;
}

// Функция открытия попапа с добавлением карточки
function opepAddCardPopup(popupElement) {
  resetErrorsWhenOpenPopup(popupElement);
  openPopup(popupElement);
  popupAddForm.reset();
}

profileEditor.addEventListener("click", () => {
  openProfilePopup(popupEdit);
});
profileAdd.addEventListener("click", () => {
  opepAddCardPopup(popupAdd);
});

// Добавления карточки
function addNewsCard(evt) {
  evt.preventDefault();
  cardListContainer.prepend(createCard(popupAddLink.value, popupAddName.value));
  closePopup(popupAdd);
}

popupAddForm.addEventListener("submit", addNewsCard);

// Закрытие открытых попапов
buttonCloseElement.forEach((button) => {
  button.addEventListener("click", () => {
    const openedPopup = button.closest(".popup_opened");
    closePopup(openedPopup);
  });
});

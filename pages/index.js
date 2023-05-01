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
    popupImage.classList.add("popup_opened");
    imageCard.src = imgCard.src;
    imageCard.alt = `${imgCard.alt} в полном масштабе`;
    figcaptionCard.textContent = imgCard
      .closest(".elements__item")
      .querySelector(".elements__title").textContent;
  });
  return liCard;
}

initialCards.forEach((card) => {
  cardListContainer.append(createCard(card.link, card.name));
});

// Функция закрытия формы при отправки
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

// Функция изменения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputValueName.value;
  profileJob.textContent = inputValueJob.value;
  closePopup(popupEdit);
}
formProfile.addEventListener("submit", handleProfileFormSubmit);

// Функция открытие попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

// Функция открытия редактирования профиля
function openProfilePopup(popupElement) {
  openPopup(popupElement);
  inputValueName.value = profileName.textContent;
  inputValueJob.value = profileJob.textContent;
}

// Функция открытия попапа с добавлением карточки
function opepAddCardPopup(popupElement) {
  openPopup(popupElement);
  popupAddForm.reset();
}

profileEditor.addEventListener("click", () => {
  openProfilePopup(popupEdit);
}); // Открытие редактирование профиля
profileAdd.addEventListener("click", () => {
  opepAddCardPopup(popupAdd);
}); // Открытие добавления карточки

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

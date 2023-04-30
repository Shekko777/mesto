// Функция добавления карточки
function createCard(image, title) {
  const liCards = templateCards
    .querySelector(".elements__item")
    .cloneNode(true);
  const imgCard = liCards.querySelector(".elements__img");
  const titleCards = liCards.querySelector(".elements__title");
  imgCard.src = image;
  imgCard.alt = `Фотокарточка ${title}`;
  titleCards.textContent = title;
  const likeButton = liCards.querySelector(".elements__like");
  const deleteButton = liCards.querySelector(".elements__button-delete");
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
  return liCards;
}

initialCards.forEach((card) => {
  listCard.append(createCard(card.link, card.name));
});

// Функция изменения профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputValueName.value;
  profileJob.textContent = inputValueJob.value;
  popupEdit.classList.remove("popup_opened"); //Закроет редактирование при сохранении
}

formProfile.addEventListener("submit", handleFormSubmit);

// Функция открытие профиля
function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  inputValueName.value = profileName.textContent;
  inputValueJob.value = profileJob.textContent;
  popupAddName.value.reset();
  popupAddLink.value.reset();

  // Закрытие открытого popup
  popupName
    .closest(".popup")
    .querySelector(".popup__close")
    .addEventListener("click", function () {
      popupName.classList.remove("popup_opened");
    });
}

profileEditor.addEventListener("click", () => openPopup(popupEdit)); // Открытие редактирование профиля
profileAdd.addEventListener("click", () => openPopup(popupAdd)); // Открытие добавления карточки
popupImage.querySelector(".popup__close").addEventListener("click", () => {
  popupImage.classList.remove("popup_opened");
});

// Функция добавления карточки
function addNewsCard(evt) {
  evt.preventDefault();
  listCard.prepend(createCard(popupAddLink.value, popupAddName.value));

  popupAdd.classList.remove("popup_opened");
}

popupAddForm.addEventListener("submit", addNewsCard);

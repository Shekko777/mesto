// СПАСИБО большое за ревью! Просто не знаю, где там еще можно спасибку оставить! )) Так что будет тут.
// сильно сократил код - и это супер!

// Функция добавления карточки
function createCard(image, title) {
  const liCards = templateCards
    .querySelector(".elements__item")
    .cloneNode(true);
  const imgCard = liCards.querySelector(".elements__img");
  const titleCards = liCards.querySelector(".elements__title");
  const likeButton = liCards.querySelector(".elements__like");
  const deleteButton = liCards.querySelector(".elements__button-delete");
  imgCard.src = image;
  imgCard.alt = `Фотокарточка ${title}`;
  titleCards.textContent = title;
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
  cardListContainer.append(createCard(card.link, card.name));
});

// Функция закрытия формы при отправки
function closeFormSubmit(popupName) {
  popupName.classList.remove("popup_opened");
}

function closePopup(popupName) {
  popupName
    .querySelector(".popup__close")
    .addEventListener("click", () =>
      popupName.classList.remove("popup_opened")
    );
}

// Функция изменения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputValueName.value;
  profileJob.textContent = inputValueJob.value;
  closeFormSubmit(popupEdit);
}
formProfile.addEventListener("submit", handleProfileFormSubmit);

// Функция открытие попапа
function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  closePopup(popupName);
}

// Функция открытия редактирования профиля
function openProfilePopup(popupName) {
  openPopup(popupName);
  inputValueName.value = profileName.textContent;
  inputValueJob.value = profileJob.textContent;
}

// Функция открытия попапа с добавлением карточки
function opepAddCardPopup(popupName) {
  openPopup(popupName);
  popupAddForm.reset();
}

profileEditor.addEventListener("click", () => {
  openProfilePopup(popupEdit);
}); // Открытие редактирование профиля
profileAdd.addEventListener("click", () => {
  opepAddCardPopup(popupAdd);
}); // Открытие добавления карточки
popupImage.addEventListener("click", closePopup(popupImage));

// Добавления карточки
function addNewsCard(evt) {
  evt.preventDefault();
  cardListContainer.prepend(createCard(popupAddLink.value, popupAddName.value));
  closeFormSubmit(popupAdd);
}

popupAddForm.addEventListener("submit", addNewsCard);

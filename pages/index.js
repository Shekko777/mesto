// Список карточек "из коробки"
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Непойму где",
    link: "https://images.unsplash.com/photo-1682258688582-f6862ab34261?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const images = document.querySelectorAll(".elements__img"); //Картинки
const templateCards = document.querySelector(".template-cards").content; // Template для клонирования содержимого
const listCards = document.querySelector(".elements__list"); // Список карточек

// Popup изменения профиля
const inputValueName = document.querySelector(".popup__input_place_title"); //Имя профиля
const inputValueJob = document.querySelector(".popup__input_place_subtitle"); //Профессия
const profileName = document.querySelector(".profile__title"); //Имя в профиле
const profileJob = document.querySelector(".profile__subtitle"); //Профессия в профиле
const formProfile = document.querySelector(".popup__form_type_edit"); //Форма в popup-edit
const popupEdit = document.querySelector(".popup_type_edit"); // Popup изменения профиля
const profileEditor = document.querySelector(".profile__edit-btn"); //Кнопка изменения профиля

// Popup добавления карточки
const popupAdd = document.querySelector(".popup_type_add"); // Popup добавления новой карточки
const profileAdd = document.querySelector(".profile__add-btn"); // Кнопка добавления карточки
const popupAddName = document.querySelector(".popup__input_add_name"); // Инпут имени карточки
const popupAddLink = document.querySelector(".popup__input_add_link"); // Инпут ссылки карточки
const popupAddForm = document.querySelector(".popup__form_type_add"); // Форма добавления карточки

// Функция добавления карточки
function addCardsHandle(image, title) {
  const liCards = templateCards
    .querySelector(".elements__item")
    .cloneNode(true);
  liCards.querySelector(".elements__title").textContent = title;
  liCards.querySelector(".elements__img").src = image;
  liCards.querySelector(".elements__img").alt = `Фотокарточка ${title}`;
  listCards.append(liCards);
}

initialCards.forEach((card) => {
  addCardsHandle(card.link, card.name);
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

  popupAddName.value = "";
  popupAddLink.value = "";

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

// Функция удаления карточек
function deleteCardsHandle() {
  const deleteButtons = document.querySelectorAll(".elements__button-delete"); // Корзина для удаления карточек
  deleteButtons.forEach((el) => {
    el.addEventListener("click", () => {
      el.closest(".elements__item").remove();
    });
  });
}

// Ставить лайки на карточки
function likeCardsHandle() {
  const likeButtons = document.querySelectorAll(".elements__like"); // Лайки на карточках
  likeButtons.forEach((el) => {
    el.addEventListener("click", () =>
      el.classList.toggle("elements__like_active")
    );
  });
}

// Функция добавления карточки
function addNewsCards(evt) {
  evt.preventDefault();
  const liCards = templateCards
    .querySelector(".elements__item")
    .cloneNode(true);
  liCards.querySelector(".elements__title").textContent = popupAddName.value;
  liCards.querySelector(".elements__img").src = popupAddLink.value;
  liCards.querySelector(
    ".elements__img"
  ).alt = `Фотокарточка ${popupAddName.value}`;
  listCards.prepend(liCards);
  popupAdd.classList.remove("popup_opened");

  deleteCardsHandle();
  likeCardsHandle();
}

popupAddForm.addEventListener("submit", addNewsCards);

deleteCardsHandle();
likeCardsHandle();

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

// Функция добавления карточки из коробки
function addCardsHandle(image, title) {
  //Обьявил переменную в функции потому, что если определить за функцией, при добавлении карточки она не будет работать
  const liCards = templateCards
    .querySelector(".elements__item")
    .cloneNode(true);
  const imgCards = liCards.querySelector(".elements__img");
  const titleCards = liCards.querySelector(".elements__title");
  imgCards.src = image;
  imgCards.alt = `Фотокарточка ${title}`;
  titleCards.textContent = title;
  return liCards;
}

initialCards.forEach((card) => {
  listCards.append(addCardsHandle(card.link, card.name));
});

// Popup картинки
const popupImage = document.querySelector(".popup-images");
const imageCard = document.querySelector(".popup-images__img");
const figcaptionCard = document.querySelector(".popup-images__figcaption");

// Функция открытия картинки
function openPopupCards() {
  //Обьявил переменную в функции потому, что если определить за функцией, при добавлении карточки она не будет работать
  const cardsImages = document.querySelectorAll(".elements__img");
  cardsImages.forEach((el) => {
    el.addEventListener("click", () => {
      popupImage.classList.add("popup_opened");
      imageCard.src = el.src;
      imageCard.alt = `${el.alt} в полном масштабе`;
      figcaptionCard.textContent = el
        .closest(".elements__item")
        .querySelector(".elements__title").textContent;
    });
  });
}

openPopupCards();

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
popupImage.querySelector(".popup__close").addEventListener("click", () => {
  popupImage.classList.remove("popup_opened");
});

// Функция удаления карточек
function deleteCardsHandle() {
  //Обьявил переменную в функции потому, что если определить за функцией, при добавлении карточки она не будет работать
  const deleteButtons = document.querySelectorAll(".elements__button-delete"); // Корзина для удаления карточек
  deleteButtons.forEach((el) => {
    el.addEventListener("click", () => {
      el.closest(".elements__item").remove();
    });
  });
}
deleteCardsHandle();

// Ставить лайки на карточки
function likeCardsHandle() {
  //Обьявил переменную в функции потому, что если определить за функцией, при добавлении карточки она не будет работать
  const likeButtons = document.querySelectorAll(".elements__like"); // Лайки на карточках
  likeButtons.forEach((el) => {
    el.addEventListener("click", () =>
      el.classList.toggle("elements__like_active")
    );
  });
}
likeCardsHandle();

// Функция добавления карточки
function addNewsCards(evt) {
  evt.preventDefault();
  listCards.prepend(addCardsHandle(popupAddLink.value, popupAddName.value));

  popupAdd.classList.remove("popup_opened");

  deleteCardsHandle();
  likeCardsHandle();
  openPopupCards();
}

popupAddForm.addEventListener("submit", addNewsCards);

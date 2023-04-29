const popup = document.querySelector(".popup"); //Сам popup
const formProfile = document.querySelector(".popup__form"); //Форма в popup
const formInputs = document.querySelectorAll(".popup__input"); //Инпуты формы
const profileName = document.querySelector(".profile__title"); //Имя в профиле
const profileJob = document.querySelector(".profile__subtitle"); //Профессия в профиле
const profileEditor = document.querySelector(".profile__edit-btn"); //Кнопка изменения профиля
const images = document.querySelectorAll(".elements__img"); //Картинки
const inputValueName = document.querySelector(".popup__input_place_title"); //Имя профиля
const inputValueJob = document.querySelector(".popup__input_place_subtitle"); //Профессия
const profileEditorClose = document.querySelector(".popup__close"); //Крестик закрытия редактирования
const listCards = document.querySelector(".elements__list"); // Список карточек
const templateCards = document.querySelector(".template-cards").content; // Template для клонирования содержимого
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
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
]; // список карточек

// Функция добавления карточки
function addNewCards(image, title) {
  const liCards = templateCards
    .querySelector(".elements__item")
    .cloneNode(true);
  liCards.querySelector(".elements__title").textContent = title;
  liCards.querySelector(".elements__img").src = image;
  liCards.querySelector(".elements__img").alt = `Фотокарточка ${title}`;
  listCards.append(liCards);
}

initialCards.forEach((card) => {
  addNewCards(card.link, card.name);
});

// Функция изменения профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputValueName.value;
  profileJob.textContent = inputValueJob.value;
  popup.classList.remove("popup_opened"); //Закроет редактирование при сохранении
}

formProfile.addEventListener("submit", handleFormSubmit);

// Открытие профиля
function openPopup() {
  popup.classList.add("popup_opened");
  inputValueName.value = profileName.textContent;
  inputValueJob.value = profileJob.textContent;
}

//"Плитка шоколада" для буста skill's

profileEditor.addEventListener("click", openPopup);

// Закрытие редактирования профиля
function closePopup() {
  popup.classList.remove("popup_opened");
}

profileEditorClose.addEventListener("click", closePopup);

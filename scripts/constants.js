const images = document.querySelectorAll(".elements__img"); //Картинки
const templateCard = document.querySelector(".template-card").content; // Template для клонирования содержимого
const cardListContainer = document.querySelector(".elements__list"); // Список карточек
const buttonCloseElement = document.querySelectorAll(".popup__close"); // Крестик закрытия попапов
const popupForms = document.querySelector(".popup__form");

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

// Popup картинки
const popupImage = document.querySelector(".popup-images"); // Попап картинок
const imageCard = document.querySelector(".popup-images__img"); // Картинка
const figcaptionCard = document.querySelector(".popup-images__figcaption"); // Описание картинки

// Обьект формы
const formObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

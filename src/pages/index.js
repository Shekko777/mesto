// ИМПОРТЫ
import "./index.css";
import {
  templateCard,
  inputValueJob,
  inputValueName,
  profileName,
  profileAdd,
  profileJob,
  profileEditor,
  formObject,
  formProfile,
  popupAddForm,
} from "../scripts/constants.js";
import { initialCards } from "../scripts/cards.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo.js";

// Создаём карточки из коробки
function createNewCard(item) {
  const cardItem = new Card(
    {
      handleCardClick: () => {
        const openModalCard = new PopupWithImage({
          popupSelector: "popup-images",
          imageTitle: item.description,
          imageSrc: item.link,
        });
        openModalCard.open();
        openModalCard.setEventListeners();
      },
    },
    item,
    templateCard
  );
  const newCard = cardItem.generateCard();
  return newCard;
}

const renderCards = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = createNewCard(item);
      renderCards.addItem(cardElement, true);
    },
  },
  ".elements__list"
);

renderCards.renderElements();

// Попап редактирования профиля
const newUserInfo = new UserInfo({
  userName: inputValueName,
  userInfo: inputValueJob,
  profileNameElement: profileName,
  profileJobElement: profileJob,
});

const openPopupUserInfo = new PopupWithForm({
  popupSelector: "popup_type_edit",
  submit: (data) => {
    newUserInfo.setUserInfo(data.name, data.job);
  },
});
openPopupUserInfo.setEventListeners();

profileEditor.addEventListener("click", () => {
  formUserValidation.resetError();
  openPopupUserInfo.open();
  newUserInfo.getUserInfo();
});

// Попап с добавлением карточки
const popupWithNewCard = new PopupWithForm({
  popupSelector: "popup_type_add",
  submit: (item) => {
    const createNewsCard = new Section(
      {
        data: [],
        renderer: () => {},
      },
      ".elements__list"
    );
    const cardElement = createNewCard(item);
    createNewsCard.addItem(cardElement, false);
  },
});

popupWithNewCard.setEventListeners();

profileAdd.addEventListener("click", () => {
  formAddNewCardValidation.resetError();
  popupWithNewCard.open();
});

// Проверка валидности формы информации юзера
const formUserValidation = new FormValidator(formObject, formProfile);
formUserValidation.enableValidation();

// Проверка валидности добавления карточки
const formAddNewCardValidation = new FormValidator(formObject, popupAddForm);
formAddNewCardValidation.enableValidation();

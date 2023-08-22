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
  apiConfig,
} from "../scripts/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

const api = new Api(apiConfig);

const popupImage = new PopupWithImage({
  popupSelector: "popup-images",
});
popupImage.setEventListeners();

// Создаём карточки из коробки
function createNewCard(item) {
  const cardItem = new Card(
    {
      handleCardClick: () => {
        popupImage.open(item.name, item.link);
      },
    },
    item,
    templateCard
  );
  const newCard = cardItem.generateCard();
  return newCard;
}

api.getCards().then((data) => {
  const renderCards = new Section(
    {
      data: data,
      renderer: (item) => {
        const cardElement = createNewCard(item);
        renderCards.addItem(cardElement, true);
      },
    },
    ".elements__list"
  );
  renderCards.renderElements();
});

// Попап редактирования профиля
const newUserInfo = new UserInfo({
  profileNameElement: profileName,
  profileJobElement: profileJob,
});

const popupEditProfile = new PopupWithForm({
  popupSelector: "popup_type_edit",
  submit: (data) => {
    newUserInfo.setUserInfo(data.name, data.job);
  },
});
popupEditProfile.setEventListeners();

profileEditor.addEventListener("click", () => {
  const { name, job } = newUserInfo.getUserInfo();
  inputValueName.value = name;
  inputValueJob.value = job;
  formUserValidation.resetError();
  popupEditProfile.open();
});

// Попап с добавлением карточки
const createNewsCard = new Section(
  {
    data: [],
    renderer: () => {},
  },
  ".elements__list"
);

const popupWithNewCard = new PopupWithForm({
  popupSelector: "popup_type_add",
  submit: (item) => {
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

export class FormValidator {
  constructor(config, formElement) {
    // параметры
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    // форма
    this._formElement = formElement;
  }

  // Показать ошибку
  _showErrorMessage = (inputElement, errorSpan) => {
    errorSpan.classList.add(this._errorClass);
    errorSpan.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  };

  // Скрыть ошибку
  _hideErrorMessage = (inputElement, errorSpan) => {
    errorSpan.classList.remove(this._errorClass);
    errorSpan.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
  };

  // Включить кнопку
  _activeButton = () => {
    const buttonSave = this._formElement.querySelector(
      this._submitButtonSelector
    );
    buttonSave.disabled = false;
    buttonSave.classList.remove(this._inactiveButtonClass);
  };

  // Заблокировать кнопку
  _blockedButton = () => {
    const buttonSave = this._formElement.querySelector(
      this._submitButtonSelector
    );
    buttonSave.disabled = true;
    buttonSave.classList.add(this._inactiveButtonClass);
  };

  // Проверить статус кнопки
  _setButtonStatus = (status) => {
    !status ? this._blockedButton() : this._activeButton();
  };

  // Проверить валидность кнопки
  _checkInputValidate = (inputElement) => {
    const inputValidStatus = inputElement.validity.valid;
    const errorSpan = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );

    !inputValidStatus
      ? this._showErrorMessage(inputElement, errorSpan)
      : this._hideErrorMessage(inputElement, errorSpan);
  };

  // Повесить обработчики событий
  _setEventListener = () => {
    const inputsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._setButtonStatus(false);

    inputsList.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        this._checkInputValidate(inputItem);
        this._setButtonStatus(this._formElement.checkValidity());
      });
    });
  };

  // Сбросить ошибки
  resetError() {
    const inputsList = this._formElement.querySelectorAll(this._inputSelector);
    const buttonSave = this._formElement.querySelector(
      this._submitButtonSelector
    );
    inputsList.forEach((inputElement) => {
      const errorSpan = this._formElement.querySelector(
        `#${inputElement.name}-error`
      );
      errorSpan.classList.remove("popup__error_visible");
      errorSpan.textContent = "";
      inputElement.classList.remove("popup__input_type_error");
      buttonSave.disabled = true;
      buttonSave.classList.add("popup__save-btn_disabled");
    });
  }

  // Включить проверку формы
  enableValidation() {
    this._setEventListener(this._formElement);
  }
}

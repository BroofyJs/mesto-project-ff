import "./pages/index.css";
import { createCard } from "./components/card.js";
import Modal from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserData,
  getInitialCards,
  editUserProfile,
  addNewCard,
  deleteCard,
  addLike,
  removeLike,
  updateUserAvatar,
} from "./components/api.js";

const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");

const imageProfile = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

let userData;

function removeCard(element, cardId) {
  deleteCard(cardId)
    .then(() => {
      element.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

function handleLike(element, card) {
  const likeHandleFunction = card.canLike ? addLike : removeLike;

  likeHandleFunction(card._id)
    .then((card) => {
      const cardElement = document.querySelector(`.card#card-${card._id}`);
      const likeElement = cardElement.querySelector(".card__likes-amount");

      likeElement.textContent = card.likes.length;
      element.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
};

function updateUserData(user) {
  userData = user;

  imageProfile.src = userData.avatar;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
};

function initEditProfile() {
  const modale = document.querySelector(".popup_type_edit");

  const formElement = document.querySelector('[name="edit-profile"]');
  const submitBtn = formElement.querySelector(".popup__button");
  const nameInput = formElement.querySelector(".popup__input_type_name");
  const jobInput = formElement.querySelector(".popup__input_type_description");

  const modal = Modal(modale);

  function handleFormSubmit(evt) {
    evt.preventDefault();

    submitBtn.textContent = "Сохранение...";

    editUserProfile(nameInput.value, jobInput.value)
      .then((user) => {
        updateUserData(user);
        modal.closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  formElement.addEventListener("submit", handleFormSubmit);

  return {
    openEditProfileModal: () => {
      nameInput.value = profileTitle.textContent;
      jobInput.value = profileDescription.textContent;
      submitBtn.textContent = "Сохранить";

      clearValidation(formElement, {
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "popup__button_disabled",
        inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible",
      });
      modal.showModal();
    },
  };
};

function initShowImage() {
  const modale = document.querySelector(".popup_type_image");
  const modaleImg = modale.querySelector(".popup__image");
  const modaleCaption = modale.querySelector(".popup__caption");

  const modal = Modal(modale);

  return {
    openShowImageModal: (card) => {
      modaleImg.src = card.link;
      modaleImg.alt = card.name;
      modaleCaption.textContent = card.name;

      modal.showModal();
    },
  };
};

function initEditProfileImage() {
  const modale = document.querySelector(".popup_type_avatar");

  const formElement = document.querySelector('[name="updateAvatar"]');

  const submitBtn = formElement.querySelector(".popup__button");

  const urlInput = formElement.querySelector("#url-avatar-input");

  const modal = Modal(modale);

  function handleFormSubmit(evt) {
    evt.preventDefault();

    submitBtn.textContent = "Сохранение...";

    updateUserAvatar(urlInput.value)
      .then((user) => {
        updateUserData(user);
        modal.closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  formElement.addEventListener("submit", handleFormSubmit);

  return {
    openEditProfileImageModal: () => {
      submitBtn.textContent = "Сохранить";

      clearValidation(formElement, {
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "popup__button_disabled",
        inputErrorClass: "popup__input-error",
        errorClass: "popup__error_visible",
      });
      modal.showModal();
    },
  };
};

function initAddCard() {
  const modale = document.querySelector(".popup_type_new-card");
  const submitBtn = modale.querySelector(".popup__button");
  const formElement = document.querySelector('[name="new-place"]');

  const placeNameInput = formElement.querySelector(
    ".popup__input_type_card-name"
  );
  const placeLinkInput = formElement.querySelector(".popup__input_type_url");
  const modal = Modal(modale, clearForm);

  function clearForm() {
    clearValidation(formElement, {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    });

    formElement.reset();
  };

  function handleFormSubmit(evt) {
    evt.preventDefault();
    submitBtn.textContent = "Сохранение...";
    addNewCard(placeNameInput.value, placeLinkInput.value)
      .then((card) => {
        const likes = card.likes;
        card.isLiked =
          likes.filter((likeUser) => likeUser._id === userData._id).length > 0;
        card.canRemove = card.owner._id === userData._id;

        cardsContainer.prepend(
          createCard(
            card,
            cardTemplate,
            removeCard,
            handleLike,
            openShowImageModal
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });

    modal.closeModal();
  };

  formElement.addEventListener("submit", handleFormSubmit);
  return {
    openAddCardModal: () => {
      submitBtn.textContent = "Сохранить";
      modal.showModal();
    },
  };
};

const { openAddCardModal } = initAddCard();
const { openEditProfileModal } = initEditProfile();
const { openShowImageModal } = initShowImage();
const { openEditProfileImageModal } = initEditProfileImage();

Promise.all([getUserData(), getInitialCards()])
  .then((response) => {
    const user = response[0];
    const cards = response[1];

    updateUserData(user);

    cards.forEach((card) => {
      const likes = card.likes;
      card.isLiked =
        likes.filter((likeUser) => likeUser._id === userData._id).length > 0;
      card.canLike = !card.isLiked;
      card.canRemove = card.owner._id === user._id;

      cardsContainer.append(
        createCard(
          card,
          cardTemplate,
          removeCard,
          handleLike,
          openShowImageModal
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

buttonAddCard.addEventListener("click", function () {
  openAddCardModal();
});

buttonEditProfile.addEventListener("click", function () {
  openEditProfileModal();
});

imageProfile.addEventListener("click", function () {
  openEditProfileImageModal();
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

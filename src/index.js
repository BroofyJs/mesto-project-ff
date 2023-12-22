import "./pages/index.css";
import initialCards from "./components/cards.js";
import { createCard, removeCard, handleLike } from "./components/card.js";
import Modal from "./components/modal.js";

const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");

const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function initAddCard() {
  const modale = document.querySelector(".popup_type_new-card");

  const formElement = document.querySelector('[name="new-place"]');

  const placeNameInput = formElement.querySelector(
    ".popup__input_type_card-name"
  );
  const placeLinkInput = formElement.querySelector(".popup__input_type_url");

  const modal = Modal(modale, clearForm);

  function clearForm() {
    formElement.reset();
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    const card = {
      name: placeNameInput.value,
      link: placeLinkInput.value,
    };

    cardsContainer.prepend(
      createCard(card, cardTemplate, removeCard, handleLike, showImage)
    );

    modal.closeModal();
  }

  formElement.addEventListener("submit", handleFormSubmit);

  return {
    openAddCardModal: modal.showModal,
  };
}

function initEditProfile() {
  const modale = document.querySelector(".popup_type_edit");

  const formElement = document.querySelector('[name="edit-profile"]');

  const nameInput = formElement.querySelector(".popup__input_type_name");
  const jobInput = formElement.querySelector(".popup__input_type_description");

  const editNameElement = document.querySelector(".profile__title");
  const editDescriptionElement = document.querySelector(
    ".profile__description"
  );

  const modal = Modal(modale);

  function handleFormSubmit(evt) {
    evt.preventDefault();
    editNameElement.textContent = nameInput.value;
    editDescriptionElement.textContent = jobInput.value;

    modal.closeModal();
  }

  formElement.addEventListener("submit", handleFormSubmit);

  return {
    openEditProfileModal: () => {
      nameInput.value = editNameElement.textContent;
      jobInput.value = editDescriptionElement.textContent;
      modal.showModal();
    },
  };
}

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
}

const { openAddCardModal } = initAddCard();
const { openEditProfileModal } = initEditProfile();
const { openShowImageModal } = initShowImage();

initialCards.forEach((card) => {
  cardsContainer.append(
    createCard(card, cardTemplate, removeCard, handleLike, openShowImageModal)
  );
});

buttonAddCard.addEventListener("click", function () {
  openAddCardModal();
});

buttonEditProfile.addEventListener("click", function () {
  openEditProfileModal();
});

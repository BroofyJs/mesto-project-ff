import "./pages/index.css";
import initialCards from "./components/cards.js";
import { createCard, removeCard, handleLike } from "./components/card.js";
import Modal from "./components/modal.js";

const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");

const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

initialCards.forEach((card) => {
  cardsContainer.append(
    createCard(card, cardTemplate, removeCard, handleLike, showImage)
  );
});

buttonAddCard.addEventListener("click", function () {
  addCard();
});

buttonEditProfile.addEventListener("click", function () {
  editProfile();
});

function addCard() {
  const modale = document.querySelector(".popup_type_new-card");

  const formElement = document.querySelector('[name="new-place"]');

  const placeNameInput = formElement.querySelector(
    ".popup__input_type_card-name"
  );
  const placeLinkInput = formElement.querySelector(".popup__input_type_url");

  const modal = Modal(modale, clearForm);

  function clearForm() {
    formElement.removeEventListener("submit", handleFormSubmit);

    placeNameInput.value = "";
    placeLinkInput.value = "";
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

  modal.showModal();
}

function editProfile() {
  const modale = document.querySelector(".popup_type_edit");

  const formElement = document.querySelector('[name="edit-profile"]');

  const nameInput = formElement.querySelector(".popup__input_type_name");
  const jobInput = formElement.querySelector(".popup__input_type_description");

  const editNameElement = document.querySelector(".profile__title");
  const editDescriptionElement = document.querySelector(
    ".profile__description"
  );

  nameInput.value = editNameElement.textContent;
  jobInput.value = editDescriptionElement.textContent;

  const modal = Modal(modale);

  function handleFormSubmit(evt) {
    evt.preventDefault();
    editNameElement.textContent = nameInput.value;
    editDescriptionElement.textContent = jobInput.value;

    modal.closeModal();
  }

  formElement.addEventListener("submit", handleFormSubmit);

  modal.showModal();
}

function showImage(card) {
  const modale = document.querySelector(".popup_type_image");
  const modaleImg = modale.querySelector(".popup__image");
  const modaleCaption = modale.querySelector(".popup__caption");

  modaleImg.src = card.link;
  modaleImg.alt = card.name;
  modaleCaption.textContent = card.name;

  const modal = Modal(modale);
  modal.showModal();
}

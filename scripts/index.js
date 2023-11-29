// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function removeCard(element) {
  element.remove();
}

function createCard(card, onDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const removeBtn = cardElement.querySelector(".card__delete-button");

  title.textContent = card.name;
  image.src = card.link;
  image.alt = card.name;

  removeBtn.addEventListener('click', () => onDelete(cardElement));

  return cardElement;
}

initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, removeCard))
});
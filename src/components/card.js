function createCard(
  card,
  cardTemplate,
  onClickDelete,
  onClickLike,
  onClickImage
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const removeBtn = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");

  likeBtn.addEventListener("click", function () {
    onClickLike(likeBtn);
  });

  title.textContent = card.name;
  image.src = card.link;
  image.alt = card.name;

  removeBtn.addEventListener("click", function () {
    onClickDelete(cardElement);
  });
  image.addEventListener("click", function () {
    onClickImage(card);
  });

  return cardElement;
}

function removeCard(element) {
  element.remove();
}

function handleLike(element) {
  element.classList.toggle("card__like-button_is-active");
}

export { createCard, removeCard, handleLike };

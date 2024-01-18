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
  const likeAmount = cardElement.querySelector(".card__likes-amount");

  const cardId = card._id;

  cardElement.id = `card-${cardId}`;

  if (card.isLiked) {
    likeBtn.classList.add("card__like-button_is-active");
  }

  likeBtn.addEventListener("click", function () {
    onClickLike(likeBtn, card);
    card.canLike = !card.canLike;
  });

  title.textContent = card.name;
  image.src = card.link;
  image.alt = card.name;
  likeAmount.textContent = card.likes.length;

  if (card.canRemove) {
    removeBtn.addEventListener("click", function () {
      onClickDelete(cardElement, cardId);
    });
  } else {
    removeBtn.remove();
  }

  image.addEventListener("click", function () {
    onClickImage(card);
  });

  return cardElement;
}


export { createCard };

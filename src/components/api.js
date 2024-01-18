const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "3c620510-f850-4243-9498-38a4912009e6",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

const sendRequest = (url, method = "GET", body = null) => {
  const params = {
    headers: config.headers,
    method: method,
  };

  if (body) {
    params.body = body;
  }

  return fetch(`${config.baseUrl}${url}`, params).then((res) =>
    getResponseData(res)
  );
};

//Загрузка информации о пользователе с сервера
const getUserData = () => {
  return sendRequest("/users/me");
};

//Загрузка карточек с сервера
const getInitialCards = () => {
  return sendRequest("/cards");
};

//Редактирование профиля
const editUserProfile = (name, about) => {
  const body = JSON.stringify({
    name: name,
    about: about,
  });
  return sendRequest("/users/me", "PATCH", body);
};

//Добавление новой карточки
const addNewCard = (name, link) => {
  const body = JSON.stringify({
    name: name,
    link: link,
  });
  return sendRequest("/cards", "POST", body);
};

//Удаление карточки
const deleteCard = (cardId) => {
  return sendRequest(`/cards/${cardId}`, "DELETE");
};

//Постановка лайка
const addLike = (cardId) => {
  return sendRequest(`/cards/likes/${cardId}`, "PUT");
};

//Cнятие лайка
const removeLike = (cardId) => {
  return sendRequest(`/cards/likes/${cardId}`, "DELETE");
};

//Обновление аватара пользователя
const updateUserAvatar = (avatar) => {
  const body = JSON.stringify({
    avatar: avatar,
  });
  return sendRequest(`/users/me/avatar`, "PATCH", body);
};

export {
  getUserData,
  getInitialCards,
  editUserProfile,
  addNewCard,
  deleteCard,
  addLike,
  removeLike,
  updateUserAvatar,
};

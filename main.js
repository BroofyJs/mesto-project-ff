(()=>{"use strict";function e(e,t,o,n,r){var u=t.querySelector(".card").cloneNode(!0),c=u.querySelector(".card__image"),i=u.querySelector(".card__title"),a=u.querySelector(".card__delete-button"),p=u.querySelector(".card__like-button"),l=u.querySelector(".card__likes-amount"),s=e._id;return u.id="card-".concat(s),e.isLiked&&p.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){n(p,e),e.canLike=!e.canLike})),i.textContent=e.name,c.src=e.link,c.alt=e.name,l.textContent=e.likes.length,e.canRemove?a.addEventListener("click",(function(){o(u,s)})):a.remove(),c.addEventListener("click",(function(){r(e)})),u}const t=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};e.querySelector(".popup__close").addEventListener("click",(function(){n()}));var o=function(e){"Escape"===e.key&&n()};e.addEventListener("mousedown",(function(t){t.target===e&&n()}));var n=function(){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o),t&&t()};return{showModal:function(){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)},closeModal:n}};var o,n=function(e,t,o){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(o.inputErrorClass),n.classList.remove(o.errorClass),n.textContent=""},r=function(e,t,o){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(o.inactiveButtonClass):t.classList.add(o.inactiveButtonClass)},u=function(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),u=e.querySelector(t.submitButtonSelector);r(o,u,t),o.forEach((function(o){n(e,o,t)}))},c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-4",headers:{authorization:"3c620510-f850-4243-9498-38a4912009e6","Content-Type":"application/json"}},i=function(e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o={headers:c.headers,method:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET"};return t&&(o.body=t),fetch("".concat(c.baseUrl).concat(e),o).then((function(e){return function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}(e)}))},a=function(e){return i("/cards/likes/".concat(e),"PUT")},p=function(e){return i("/cards/likes/".concat(e),"DELETE")},l=document.querySelector(".profile__add-button"),s=document.querySelector(".profile__edit-button"),d=document.querySelector(".profile__image"),_=document.querySelector(".profile__title"),f=document.querySelector(".profile__description"),v=document.querySelector(".places__list"),m=document.querySelector("#card-template").content;function y(e,t){(function(e){return i("/cards/".concat(e),"DELETE")})(t).then((function(){e.remove()})).catch((function(e){console.log(e)}))}function S(e,t){(t.canLike?a:p)(t._id).then((function(t){document.querySelector(".card#card-".concat(t._id)).querySelector(".card__likes-amount").textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))}function b(e){var t=e.likes;return e.isLiked=t.filter((function(e){return e._id===o._id})).length>0,e.canRemove=e.owner._id===o._id,e.canLike=!e.isLiked,e}function C(e){o=e,d.src=o.avatar,_.textContent=o.name,f.textContent=o.about}var q,h,E,L,k,g,M,x=(q=document.querySelector(".popup_type_new-card"),h=q.querySelector(".popup__button"),E=document.querySelector('[name="new-place"]'),L=E.querySelector(".popup__input_type_card-name"),k=E.querySelector(".popup__input_type_url"),g=t(q,(function(){u(E,{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),E.reset()})),E.addEventListener("submit",(function(t){var o,n,r;t.preventDefault(),h.textContent="Сохранение...",(o=L.value,n=k.value,r=JSON.stringify({name:o,link:n}),i("/cards","POST",r)).then((function(t){var o=b(t);v.prepend(e(o,m,y,S,P)),g.closeModal()})).catch((function(e){console.log(e)}))})),{openAddCardModal:function(){h.textContent="Сохранить",g.showModal()}}).openAddCardModal,w=function(){var e=document.querySelector(".popup_type_edit"),o=e.querySelector('[name="edit-profile"]'),n=o.querySelector(".popup__button"),r=o.querySelector(".popup__input_type_name"),c=o.querySelector(".popup__input_type_description"),a=t(e);return o.addEventListener("submit",(function(e){var t,o,u;e.preventDefault(),n.textContent="Сохранение...",(t=r.value,o=c.value,u=JSON.stringify({name:t,about:o}),i("/users/me","PATCH",u)).then((function(e){C(e),a.closeModal()})).catch((function(e){console.log(e)}))})),{openEditProfileModal:function(){r.value=_.textContent,c.value=f.textContent,n.textContent="Сохранить",u(o,{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),a.showModal()}}}(),B=w.openEditProfileModal,A=function(){var e=document.querySelector(".popup_type_image"),o=e.querySelector(".popup__image"),n=e.querySelector(".popup__caption"),r=t(e);return{openShowImageModal:function(e){o.src=e.link,o.alt=e.name,n.textContent=e.name,r.showModal()}}}(),P=A.openShowImageModal,T=function(){var e=document.querySelector(".popup_type_avatar"),o=e.querySelector('[name="updateAvatar"]'),n=o.querySelector(".popup__button"),r=o.querySelector("#url-avatar-input"),c=t(e,(function(){u(o,{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),o.reset()}));return o.addEventListener("submit",(function(e){var t,o;e.preventDefault(),n.textContent="Сохранение...",(t=r.value,o=JSON.stringify({avatar:t}),i("/users/me/avatar","PATCH",o)).then((function(e){C(e),c.closeModal()})).catch((function(e){console.log(e)}))})),{openEditProfileImageModal:function(){n.textContent="Сохранить",u(o,{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input-error",errorClass:"popup__error_visible"}),c.showModal()}}}(),D=T.openEditProfileImageModal;Promise.all([i("/users/me"),i("/cards")]).then((function(t){var o=t[0],n=t[1];C(o),n.forEach((function(t){var o=b(t);v.append(e(o,m,y,S,P))}))})).catch((function(e){console.log(e)})),l.addEventListener("click",(function(){x()})),s.addEventListener("click",(function(){B()})),d.addEventListener("click",(function(){D()})),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(M.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),u=e.querySelector(t.submitButtonSelector);r(o,u,t),o.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,o){t.validity.valid?n(e,t,o):function(e,t,o,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),r.textContent=o,r.classList.add(n.errorClass)}(e,t,t.validity.patternMismatch?t.dataset.error:t.validationMessage,o)}(e,c,t),r(o,u,t)}))}))}(e,M)}))})();
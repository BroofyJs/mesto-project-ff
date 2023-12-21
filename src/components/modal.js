const Modal = function (modalElement, onClose = function() {}) {
  const closeBtn = modalElement.querySelector(".popup__close");

  closeBtn.addEventListener("click", function () {
    closeModal();
  });

  const closeModalByEsc = function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  const closeModalByOverlay = function (event) {
    if (event.target === modalElement) {
      closeModal();
    }
  };

  modalElement.addEventListener("mousedown", closeModalByOverlay);

  const showModal = function () {
    modalElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeModalByEsc);
  };

  const closeModal = function () {
    modalElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeModalByEsc);
    if (onClose) {
        onClose();
    }
  };

  return {
    showModal,
    closeModal,
  };
};

export default Modal;

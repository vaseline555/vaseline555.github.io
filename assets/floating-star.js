(function () {
  function setupFloatingSticker() {
    const sticker = document.querySelector(".floating-sticker");
    if (!sticker || sticker.dataset.ready === "true") return;
    sticker.dataset.ready = "true";

    let dragging = false;
    let didDrag = false;
    let offsetX = 0;
    let offsetY = 0;
    let startX = 0;
    let startY = 0;
    const dragThreshold = 4;

    const clampStickerToViewport = () => {
      if (!sticker.style.left || !sticker.style.top) return;

      const rect = sticker.getBoundingClientRect();
      const x = Math.min(
        Math.max(12, rect.left),
        window.innerWidth - sticker.offsetWidth - 12,
      );
      const y = Math.min(
        Math.max(12, rect.top),
        window.innerHeight - sticker.offsetHeight - 12,
      );

      sticker.style.left = `${x}px`;
      sticker.style.top = `${y}px`;
      sticker.style.right = "auto";
      sticker.style.bottom = "auto";
    };

    const moveSticker = (clientX, clientY) => {
      if (!didDrag && Math.hypot(clientX - startX, clientY - startY) > dragThreshold) {
        didDrag = true;
      }

      const x = Math.min(
        Math.max(12, clientX - offsetX),
        window.innerWidth - sticker.offsetWidth - 12,
      );
      const y = Math.min(
        Math.max(12, clientY - offsetY),
        window.innerHeight - sticker.offsetHeight - 12,
      );

      sticker.style.left = `${x}px`;
      sticker.style.top = `${y}px`;
      sticker.style.right = "auto";
      sticker.style.bottom = "auto";
    };

    const startDrag = (clientX, clientY) => {
      dragging = true;
      didDrag = false;
      startX = clientX;
      startY = clientY;
      sticker.classList.add("is-dragging");
      const rect = sticker.getBoundingClientRect();
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
    };

    const stopDrag = () => {
      if (!dragging) return;
      dragging = false;
      sticker.classList.remove("is-dragging");
    };

    const onPointerDown = (event) => {
      startDrag(event.clientX, event.clientY);
      if (sticker.setPointerCapture) {
        sticker.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
    };

    const onPointerMove = (event) => {
      if (dragging) moveSticker(event.clientX, event.clientY);
    };

    const onClick = (event) => {
      if (didDrag) {
        didDrag = false;
        event.preventDefault();
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    sticker.addEventListener("pointerdown", onPointerDown);
    sticker.addEventListener("click", onClick);
    window.addEventListener("resize", clampStickerToViewport);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", stopDrag);
    document.addEventListener("pointercancel", stopDrag);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupFloatingSticker);
  } else {
    setupFloatingSticker();
  }
})();

aboutLink.addEventListener("click", (e) => {
  overlay.style.display = "block";
  aboutPopup.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  aboutPopup.style.display = "none";
});

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  aboutPopup.style.display = "none";
});

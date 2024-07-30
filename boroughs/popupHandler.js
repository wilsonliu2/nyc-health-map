const aboutLink = document.getElementById("about-link");
const aboutPopup = document.getElementById("about-popup");
const closeBtn = document.querySelector("#about-popup .close-btn");
const overlay = document.getElementById("overlay");

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

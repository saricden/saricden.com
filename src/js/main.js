var toggleMenu = function() {
  document.querySelector(".side-column").classList.add("open");
  document.querySelector(".overlay").classList.add("open");
};

var closeAll = function() {
  var openOverlays = document.querySelectorAll(".open");
  for (var i = 0; i < openOverlays.length; i++) {
    openOverlays[i].classList.remove("open");
  }
};

document.querySelector(".mobile-menu").addEventListener("click", toggleMenu);
document.querySelector(".mobile-close").addEventListener("click", closeAll);
document.querySelector(".overlay").addEventListener("click", closeAll);
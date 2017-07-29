var nav = document.getElementById("navMenu");
var overlay = document.getElementById("overlay");

var openNav = function() {
  nav.classList.add("open");
  overlay.classList.add("open");
};
var closeNav = function() {
  nav.classList.remove("open");
  overlay.classList.remove("open");
};

document.getElementById("openNavBtn").addEventListener("click", openNav);
document.getElementById("closeNavBtn").addEventListener("click", closeNav);
document.getElementById("overlay").addEventListener("click", closeNav);
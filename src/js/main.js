var nav = document.getElementById("navMenu");

var openNav = function() {
  nav.classList.add("open");
};
var closeNav = function() {
  nav.classList.remove("open");
};

document.getElementById("openNavBtn").addEventListener("click", openNav);
document.getElementById("closeNavBtn").addEventListener("click", closeNav);
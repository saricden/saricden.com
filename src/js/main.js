// Needs cleaning

document.querySelector(".mobile-nav").addEventListener("click", function(e) {
  e.preventDefault();

  document.querySelector(".test-menu").classList.add("open");
  document.querySelector(".x").classList.add("open");

  var navLinks = document.querySelectorAll(".page-link");
  var delay = 100;
  var offset = 0;

  for (var i = 0; i < navLinks.length; i++) {
    setTimeout(function() {
      var posOffset = 60+(offset*50);
      navLinks[offset].classList.add("open");
      navLinks[offset].style.top = posOffset+"px";
      offset ++;
    }, delay);
    delay += 100;
  }

});

var closeMenu = function(e) {
  document.querySelector(".test-menu").classList.remove("open");
  document.querySelector(".x").classList.remove("open");
  var navLinks = document.querySelectorAll(".page-link");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("open");
  }
};

var closeEles = document.querySelectorAll(".test-menu, .x");

for (var i = 0; i < closeEles.length; i++) {
  closeEles[i].addEventListener("click", closeMenu);
}
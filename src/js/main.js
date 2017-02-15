var toggleMenu = function() {
  var menuItems = document.querySelectorAll(".tabs a");
  for (var i = 0; i < menuItems.length; i++) {
    if (menuItems[i].className != "mobile-menu") {
      var isOpen = (menuItems[i].style.display == "block");
      if (isOpen) {
        menuItems[i].style.display = "none";
      }
      else {
        menuItems[i].style.display = "block";
      }
    }
  }
};

document.querySelector(".mobile-menu").addEventListener("click", toggleMenu);
function e(id) {
  return document.getElementById(id);
}

var navMenuBtn = e('menu-btn');
var navPanels = e('nav-panels');

function openNavMenu(e) {
  e.preventDefault();
  //var newClass = open ? "open" : "";
  navPanels.className = "open";
};

navMenuBtn.onclick = openNavMenu;
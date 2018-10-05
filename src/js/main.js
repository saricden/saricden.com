// Nav stuff
var container = document.querySelector("div.container");
var nav = document.querySelector("nav.primary");
document.querySelector("button.nav-btn").addEventListener("click", function() {
  if (this.className === "nav-btn open") {
    container.classList.remove("nav-open");
    this.classList.remove("open");
    nav.classList.remove("open");
  }
  else {
    container.classList.add("nav-open");
    this.classList.add("open");
    nav.classList.add("open");
  }
});

var social_nav = document.querySelector("nav.social");

document.getElementById('connectLink').addEventListener("click", function(e) {
  e.preventDefault();
  social_nav.classList.toggle("open");
});

social_nav.addEventListener("click", function(e) {
  if (e.target == this)
  social_nav.classList.toggle("open");
});
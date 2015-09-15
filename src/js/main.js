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

var closeMenus = function(e) {
  document.querySelector(".test-menu").classList.remove("open");
  document.querySelector(".x").classList.remove("open");
  var navLinks = document.querySelectorAll(".page-link");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("open");
  }

  document.querySelector(".search-panel").classList.remove("open");
  document.querySelector(".search-panel input").value = "";
  document.querySelector(".results").innerHTML = "";
};

var closeEles = document.querySelectorAll(".test-menu, .x");

for (var i = 0; i < closeEles.length; i++) {
  closeEles[i].addEventListener("click", closeMenus);
}

document.querySelector(".search").addEventListener("click", function(e) {
  e.preventDefault();
  document.querySelector(".search-panel").classList.add("open");
  document.querySelector(".x").classList.add("open");
  setTimeout(function() {
    document.querySelector(".search-panel input").focus();
  }, 700);
});

// 'searchables' is coming in from a seperate file being generated

document.querySelector(".search-panel input").addEventListener("keyup", function(e) {
  // Setup vars
  var resultListDOM = document.querySelector(".results");
  var results = [];
  var val = this.value.toLowerCase();

  // Loop through all potential results & build new arrray
  for (var i = 0; i < searchables.length; i++) {
    if (searchables[i].title.toLowerCase().search(val) > -1 || searchables[i].snippet.toLowerCase().search(val) > -1) {
      results.push(searchables[i]);
    }
  }

  // Clear out whatever was in the result list, and update w/ new results
  resultListDOM.innerHTML = "";
  if (this.value != "") {
    for (var i = 0; i < results.length; i++) {
      var markup = "<li>";
      markup    += "<a href='"+results[i].url+"'>";
      markup    += results[i].title;
      markup    += "</a>";
      markup    += results[i].snippet;
      markup   += "</li>";
      resultListDOM.innerHTML += markup;
    }
  }
});
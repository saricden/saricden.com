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

var shareHREFs = document.querySelectorAll("[data-share-href]");

for (var i in shareHREFs) {
  if (typeof shareHREFs[i] == "object") {
    if (navigator.share) {
      shareHREFs[i].addEventListener("click", function(e) {
        e.preventDefault();
        var title = this.getAttribute("data-share-title");
        var text = this.getAttribute("data-share-text");
        var url = this.getAttribute("data-share-href");

        navigator.share({
            title: title,
            text: text,
            url: url,
        })
        .then(function() { console.log('Successful share') })
        .catch(function(error) { console.log('Error sharing', error) });
      });
    }
    else {
      shareHREFs[i].style.opacity = 0.25;
      shareHREFs[i].setAttribute("title", "Sharing not supported by your device / browser. :'(");
      shareHREFs[i].style.cursor = "not-allowed";
    }
  }
}
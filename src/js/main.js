var nav = document.getElementById("navMenu");
var overlay = document.getElementById("overlay");
var loader = document.getElementById("loader");
var gallery = document.getElementById("gallery");
var galleryImg = document.getElementById("galleryImg");

// Functions for opening and closing nav menu
var openNav = function() {
  nav.classList.add("open");
  overlay.classList.add("open");
};
var closeAll = function() {
  nav.classList.remove("open");
  overlay.classList.remove("open");
  if (gallery != null) gallery.classList.remove("open");
  if (loader != null) loader.classList.remove("open");
};

// Functions for box img links (gallery)
var openBoxImg = function(e) {
  // Sanity check for DOM objects
  if (loader == null || gallery == null || galleryImg == null) {
    return false;
  }

  // Prevent link click
  e.preventDefault();

  // Set src of image object for preloading
  var imgSrc = this.getAttribute("data-box-img");
  var imgObj = new Image();
  imgObj.src = imgSrc;

  // Display the loader
  loader.classList.add("open");
  overlay.classList.add("open");

  // Hide loader, display image
  imgObj.addEventListener("load", function() {
    // Change CSS classes to display, give image source
    loader.classList.remove("open");
    galleryImg.src = imgObj.src;
    gallery.classList.add("open");

    galleryImg.style.width = "100%";
    galleryImg.style.height = "auto";

    // Check for spillage and re-adjust
    if (galleryImg.offsetHeight > window.innerHeight) {
      galleryImg.style.width = "auto";
      galleryImg.style.height = "100%";
    }

    // Check if img dimensions exceed natural dimensions and re-adjust
    if (galleryImg.offsetWidth > imgObj.width && galleryImg.offsetHeight > imgObj.height) {
      galleryImg.style.width = imgObj.width+"px";
      galleryImg.style.height = imgObj.height+"px";
    }
  });
};

// Binding
document.getElementById("openNavBtn").addEventListener("click", openNav);
document.getElementById("closeNavBtn").addEventListener("click", closeAll);
document.getElementById("overlay").addEventListener("click", closeAll);
var boxImgLinks = document.querySelectorAll("[data-box-img]");
for (var i = 0; i < boxImgLinks.length; i++) {
  boxImgLinks[i].addEventListener("click", openBoxImg);
}
if (galleryImg != null) {
  gallery.addEventListener("click", closeAll);
}
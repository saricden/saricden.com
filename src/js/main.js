var nav = document.getElementById("navMenu");
var overlay = document.getElementById("overlay");
var loader = document.getElementById("loader");
var gallery = document.getElementById("gallery");
var galleryImg = document.getElementById("galleryImg");
var latestCommit = document.getElementById("latestCommit");

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

// Function for box img links (gallery)
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

// Functions for loading latest commit on homepage
var getJSON = function(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      var data = JSON.parse(xhttp.responseText);
      if (callback) callback(data);
    }
  };
  xhttp.open('GET', url);
  xhttp.send(); 
};
var formatDate = function(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex]+' '+day+', '+year;
}
var showCommit = function(data) {
  var date = new Date(data.author.date);
  date = formatDate(date);
  var message = data.message;
  var pageURL = data.html_url;
  latestCommit.innerHTML = "<span>"+date+"</span> "+message;
  latestCommit.href = pageURL;
};
var getCommitURL = function(data) {
  var url = data.object.url;
  if (url) {
    getJSON(url, showCommit);
  }
};
var showLatestCommit = function() {
  getJSON("https://api.github.com/repos/saricden/saricden.com/git/refs/heads/gh-pages", getCommitURL);
};

// Contact Modal
var contactModal = document.getElementById('contact-modal');
var contactBtn = document.getElementById('contact-btn');
var cancelBtn = document.getElementById('cancel-btn');
var contactForm = document.getElementById('ef');
var submitting = false;

var openContactModal = function(e) {
  if (!submitting) {
    e.preventDefault();
    contactModal.classList.add("open");
  }
};
var closeContactModal = function(e) {
  if (!submitting) {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      contactModal.classList.remove("open");
    }
  }
};
var showSendingMsg = function(e) {
  submitting = true;
  var fields = contactForm.querySelectorAll("input, textarea, button");
  for (var i = 0; i < fields.length; i++) {
    fields[i].readonly = true;
  }
  document.getElementById('submit-btn').innerHTML = "<i class=\"fa fa-circle-o-notch fa-spin fa-fw\"></i> Redirecting...";
  contactForm.classList.add('disabled');
};

if (contactModal)
  contactModal.addEventListener("click", closeContactModal);
if (contactBtn)
  contactBtn.addEventListener("click", openContactModal);
if (cancelBtn)
  cancelBtn.addEventListener("click", closeContactModal);
if (contactForm)
  contactForm.addEventListener("submit", showSendingMsg);

// Binding / calling
// document.getElementById("openNavBtn").addEventListener("click", openNav);
// document.getElementById("closeNavBtn").addEventListener("click", closeAll);
// document.getElementById("overlay").addEventListener("click", closeAll);
// var boxImgLinks = document.querySelectorAll("[data-box-img]");
// for (var i = 0; i < boxImgLinks.length; i++) {
//   boxImgLinks[i].addEventListener("click", openBoxImg);
// }
// if (galleryImg != null) {
//   gallery.addEventListener("click", closeAll);
// }
// if (latestCommit != null) {
//   showLatestCommit();
// }

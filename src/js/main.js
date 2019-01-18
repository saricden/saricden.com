// Nav stuff
var container = document.querySelector("div.container");
var containerOverlay = document.querySelector("div.container-overlay");
var nav = document.querySelector("nav.primary");
var navbar = document.querySelector("nav.bar");
var body = document.body;
var navBtn = document.querySelector("button.nav-btn");

function openNav() {
  container.classList.add("nav-open");
  navBtn.classList.add("open");
  nav.classList.add("open");
  body.classList.add("nav-open");
  containerOverlay.classList.add("on");
}

function closeNav() {
  container.classList.remove("nav-open");
  navBtn.classList.remove("open");
  nav.classList.remove("open");
  body.classList.remove("nav-open");
  containerOverlay.classList.remove("on");
}

navBtn.addEventListener("click", function() {
  if (this.className === "nav-btn open") {
    closeNav();
  }
  else {
    openNav();
  }
});

// Close nav on overlay click/tap
containerOverlay.addEventListener("click", closeNav);

// Tint navbar on scroll
window.addEventListener("scroll", function(e) {
  var scrollPos = window.pageYOffset;
  if (scrollPos > 0 && navbar.className === "bar") {
    navbar.classList.add("scrolled");
  }
  else if (scrollPos === 0 && navbar.className === "bar scrolled") {
    navbar.classList.remove("scrolled");
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
      shareHREFs[i].style.textDecoration = "line-through";
    }
  }
}


/* PARALLAX BIZNESS
--------------------------------- */

// Step 1: Grab all parallax elements
var parallaxElements = document.querySelectorAll('[data-parallax-offset]');

// Step 2: Create a function to be triggered on window scroll event
function translateParallaxElements() {
  // Step 3: In the function, grab the height of the document minus the height of the viewport, and create a scalar value using those
  var docHeight = document.body.scrollHeight - window.innerHeight;
  var scrollPos = window.pageYOffset;
  var scalar = scrollPos / docHeight;

  // Step 4: Still in the function, loop over all elements and apply the scalar value to their offset value, and assign that value to their transform: translateY() property
  parallaxElements.forEach(function(element) {
    var yOffset = element.getAttribute('data-parallax-offset') * scalar;
    element.style.transform = "translateY("+yOffset+"px)";
  });
}

// Step 5: Bind that function to the event handler
window.addEventListener('scroll', translateParallaxElements);


/* LOGO PARTY EASTER EGG
--------------------------------- */
var body = document.body;
var logo = document.querySelector('header.logo button');

var toggleEgg = function() {
  body.className = (body.className === "" ? "egg-active" : "");
};

logo.addEventListener('click', toggleEgg);


/* NEW YEARS PARTY EASTER EGG
--------------------------------- */
// var date = midnight = new Date();
// var currentMonth = (date.getMonth() + 1);
// var currentDay = date.getDate();
// midnight.setHours(0, 22, 0, 0);

// // Function to determine seconds until midnight
// var secondsToMidnight = function() {
//   return Math.floor((midnight.getTime() - (new Date()).getTime()) / 1000);
// };

// if (currentMonth === 1 && currentDay === 11) {
//   // First inject the new years countdown on the appropriate day
//   body.innerHTML += "<div class='nye-countdown'><span></span></div>";
//   var countContainer = document.querySelector("div.nye-countdown");
//   var count = countContainer.querySelector("span");
//   var countdown = null;

//   // Create a function for our countdown
//   var updateCountdown = function() {
//     var secondsRemaining = secondsToMidnight();
//     console.log(secondsRemaining, ' seconds until 12:22...');

//     // Do nothing all day, until there's 10 seconds left
//     if (secondsRemaining <= 10 && secondsRemaining >= 0) {
//       // Start the countdown
//       count.innerHTML = secondsRemaining;
//       countContainer.classList.add('active');

//       if (secondsRemaining > 0) {
//         // Start the grow effect
//         count.classList.remove('growing');
//         count.classList.add('growing');
//         console.log("Greater than zero!");
//       }
//       else {
//         // Start the party
//         countContainer.classList.remove('active');
//         toggleEgg();
//         clearInterval(countdown);
//         console.log("**************");
//         console.log("* PARTY TIME *");
//         console.log("**************");
//       }

//     }

//   };

//   // Only on NYE, start a countdown interval and assign it to a var
//   countdown = setInterval(updateCountdown, 500);
// }
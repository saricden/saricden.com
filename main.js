// Set height of full panels
var fullpanels = document.querySelectorAll(".fullpanel");
var screenHeight = window.innerHeight;
for (i = 0; i < fullpanels.length; i++) {
  fullpanels[i].style.height = screenHeight+"px";
}
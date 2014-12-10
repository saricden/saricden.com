// Helpers
e = function(id) {
    return document.getElementById(id);
};


// Globals
var nav = e('sidebar');
var navBtn = e('nav-btn');
var main = e('content');


// Functions
openMenu = function() {
    nav.className = 'open';
    navBtn.className = 'hide';
    console.log(main.style.width);
};


// Asssigning stuff
navBtn.onclick = openMenu;
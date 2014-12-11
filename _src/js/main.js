// Helpers
e = function(id) {
    return document.getElementById(id);
};

// http://stackoverflow.com/questions/15733365/cross-browser-ie8-getcomputedstyle-with-javascript#22744598
getCS = function (el, prop) {
    if (getComputedStyle !== 'undefined') {
        return getComputedStyle(el, null).getPropertyValue(prop);
    } else {
        return el.currentStyle[prop];
    }
}


// Globals
var nav = e('sidebar');
var navBtn = e('nav-btn');
var main = e('content');


// Functions
openMenu = function() {
    nav.className = 'open';
    navBtn.className = 'hide';
    main.style.width = getCS(main, 'width');
    main.style.marginLeft = '200px';
    main.style.cursor = 'pointer';
};

closeMenu = function() {
    nav.removeAttribute('class');
    navBtn.removeAttribute('class');
    main.style.marginLeft = '0';
    main.style.cursor = 'initial';
};

closeAndResize = function() {
    closeMenu();
    main.removeAttribute('style');
};


// Asssigning stuff
navBtn.onclick = openMenu;
main.onclick = closeMenu;
window.onresize = closeAndResize;
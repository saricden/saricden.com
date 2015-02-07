// Helpers
var e = function(id) {
    return document.getElementById(id);
};

var toggleClass = function(el, className) {
    if (el.classList) {
        el.classList.toggle(className);
    }
    else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        el.className = classes.join(' ');
    }
}

e('mobile-menu').onclick = function() {
    toggleClass(e('nav'), 'open');
};

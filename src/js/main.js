/*

This is going to be refactored so hard.

*/

function e(id) {
  return document.getElementById(id);
}

var navMenuBtn = e('menu-btn');
var navPanels = e('nav-panels');

function openNavMenu(e) {
  e.preventDefault();
  //var newClass = open ? "open" : "";
  navPanels.className = "open";
};

navMenuBtn.onclick = openNavMenu;

if (e('sosneaky')) {
  var falnfsa = new Array(0x6B, 'i', 0x72, 'k', 0x40, 'sar', 0x69, 'cde', 0x6E, 0x2E, 'c', 'o', 0x6D);
  var jjnlngf = '';
  for (var i in falnfsa) {
    var c = falnfsa[i];
    if (typeof c == 'string') {
      jjnlngf += c;
    }
    else {
      jjnlngf += String.fromCharCode(c);
    }
  }
  e('sosneaky').href = "mailto:"+jjnlngf;
  e('sosneaky').innerHTML = jjnlngf;
}
function numberWithCommas(x) {
  return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getRandomButExclude(min, max, exclude) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === exclude) ? getRandomButExclude(min, max) : num;
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function startGitHubCounts() {
  ghCountStarted = true;
  setInterval(function() {
  
    if (currentLines < totalLines)
      currentLines += (totalLines * 0.05);
    else
      currentLines = totalLines;
  
    if (currentCommits < totalCommits)
      currentCommits += (totalCommits * 0.05);
    else
      currentCommits = totalCommits;
  
    if (currentContributors < totalContributors)
      currentContributors += (totalContributors * 0.05);
    else
      currentContributors = totalContributors;
  
    counterCodeLn.innerHTML = numberWithCommas(currentLines);
    counterCommits.innerHTML = numberWithCommas(currentCommits);
    counterContrib.innerHTML = numberWithCommas(currentContributors);
  
  
  }, 150);
}

function scrollSpy() {
  if (!ghCountStarted && isElementInViewport(counterCodeLn)) {
    startGitHubCounts();
  }
}

var counterCodeLn = document.getElementById('counter-codeln');
var counterCommits = document.getElementById('counter-commits');
var counterContrib = document.getElementById('counter-contrib');

var totalLines = 0;
var totalCommits = 0;
var totalContributors = 1; // Init to 1 to include Emman!!

var currentLines = 0;
var currentCommits = 0;
var currentContributors = 0;

var ghCountStarted = false;

fetch('https://api.github.com/repos/saricden/no-place-like/stats/contributors')
.then(function(data) {
  return data.json();
})
.then(function(json) {
  json.forEach(function(authorData) {
    authorData.weeks.forEach(function(week) {
      totalLines += (week.a + week.d);
      totalCommits += week.c;
    });
    totalContributors++;
  });

  if (!ghCountStarted && isElementInViewport(counterCodeLn)) {
    startGitHubCounts();
  }
})
.catch(function(e) {
  console.log('ohhh nuuuuu', e);
});

// FREEDOM ticker!
var tickerItems = document.querySelectorAll('.freedom-ticker ul li');
var tickerList = document.querySelector('.freedom-ticker ul');
var tickerItemHeight = (tickerItems[0].clientHeight);
var tickerItemCount = (tickerItems.length);
var lastRandomIndex = 0;

setInterval(function() {
  var randomIndex = getRandomButExclude(0, (tickerItemCount - 1), lastRandomIndex);
  var translateOffset = (randomIndex * tickerItemHeight);
  tickerList.style.transform = 'translateY(-'+translateOffset+'px)';
  lastRandomIndex = randomIndex;
}, 2000);

// Binding events
window.addEventListener('scroll', scrollSpy);
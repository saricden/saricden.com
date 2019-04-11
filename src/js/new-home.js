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

function calcTime(offset) {
  d = new Date();
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  nd = new Date(utc + (3600000*offset));
  return nd;
}

function updateTicker() {
  // Date representation of now and next stream (PST)
  var now = calcTime('-8');
  var nextStream = calcTime('-8');

  // Set next stream to 6:30pm
  nextStream.setHours(18);
  nextStream.setMinutes(30);
  nextStream.setSeconds(0);

  if (now > nextStream) {
    nextStream.setDate(nextStream.getDate() + 2);
  }

  if (now.getDay() === 0 || now.getDay() === 6) {
    // https://stackoverflow.com/questions/33078406/getting-the-date-of-next-monday
    // Set the next stream to next Monday
    nextStream.setDate(nextStream.getDate() + (1 + 7 - nextStream.getDay()) % 7);
  }

  // Tuesday or Thursday
  if (now.getDay() === 2 || now.getDay() === 4) {
    nextStream.setDate(nextStream.getDate() + 1);
  }

  var seconds = Math.floor((nextStream - (now)) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours = hours - (days * 24);
  minutes = minutes - (days * 24 * 60) - (hours * 60);
  seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

  daysDOM.innerHTML = '<em>'+days+(days === 1 ? '</em> day' : '</em> days');
  hoursDOM.innerHTML = '<em>'+hours+(hours === 1 ? '</em> hour' : '</em> hours');
  minutesDOM.innerHTML = '<em>'+minutes+(minutes === 1 ? '</em> minute' : '</em> minutes');
  secondsDOM.innerHTML = '<em>'+seconds+(seconds === 1 ? '</em> second' : '</em> seconds');
}

var counterCodeLn = document.getElementById('counter-codeln');
var counterCommits = document.getElementById('counter-commits');
var counterContrib = document.getElementById('counter-contrib');
var daysDOM = document.querySelector('.days');
var hoursDOM = document.querySelector('.hours');
var minutesDOM = document.querySelector('.minutes');
var secondsDOM = document.querySelector('.seconds');

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

// Setting things on timers
setInterval(function() {
  var randomIndex = getRandomButExclude(0, (tickerItemCount - 1), lastRandomIndex);
  var translateOffset = (randomIndex * tickerItemHeight);
  tickerList.style.transform = 'translateY(-'+translateOffset+'px)';
  lastRandomIndex = randomIndex;
}, 2000);

setInterval(updateTicker, 1000);

// Binding events
window.addEventListener('scroll', scrollSpy);
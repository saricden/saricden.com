function numberWithCommas(x) {
  return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var counterCodeLn = document.getElementById('counter-codeln');
var counterCommits = document.getElementById('counter-commits');
var counterContrib = document.getElementById('counter-contrib');

var totalLines = 23155;
var totalCommits = 116;
var totalContributors = 4;

var currentLines = 0;
var currentCommits = 0;
var currentContributors = 0;

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
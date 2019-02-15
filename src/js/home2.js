var calcTime = function(offset) {
  d = new Date();
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  nd = new Date(utc + (3600000*offset));
  return nd;
}

var Homepage = function(config) {
  var dom = {
    days: document.querySelector('.days'),
    hours: document.querySelector('.hours'),
    minutes: document.querySelector('.minutes'),
    seconds: document.querySelector('.seconds')
  };

  var updateTicker = function() {
    // Date representation of now and next stream (PST)
    var now = calcTime('-8');
    var nextStream = calcTime('-8');

    if (now.getDay() === 0 || now.getDay() === 6) {
      // https://stackoverflow.com/questions/33078406/getting-the-date-of-next-monday
      // Set the next stream to next Monday
      nextStream.setDate(nextStream.getDate() + (1 + 7 - nextStream.getDay()) % 7);
    }

    // Set next stream to 9:30pm
    nextStream.setHours(21);
    nextStream.setMinutes(30);
    nextStream.setSeconds(0);

    var seconds = Math.floor((nextStream - (now)) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    dom.days.innerHTML = '<em>'+days+(days === 1 ? '</em> day' : '</em> days');
    dom.hours.innerHTML = '<em>'+hours+(hours === 1 ? '</em> hour' : '</em> hours');
    dom.minutes.innerHTML = '<em>'+minutes+(minutes === 1 ? '</em> minute' : '</em> minutes');
    dom.seconds.innerHTML = '<em>'+seconds+(seconds === 1 ? '</em> second' : '</em> seconds');
  };

  // var initAJAX = function() {
  //   var 
  // };
  
  // Init
  updateTicker();
  setInterval(updateTicker, 1000);
};

Homepage({
  // config
});
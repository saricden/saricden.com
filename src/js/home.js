function getRandomButExclude(min, max, exclude) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === exclude) ? getRandomButExclude(min, max) : num;
}

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

document.addEventListener('DOMContentLoaded', function() {
  // Some vars
  var startBtn = document.getElementById('btn_join');
  var modal = document.getElementById('quiz_modal');
  var modalUpper = document.getElementById('quiz_modal_upper');
  var overlay = document.getElementById('overlay');
  
  // Starts / resumes the quiz
  function openModal() {
    modal.classList.add('open');
    modalUpper.classList.add('open');
    overlay.classList.add('open');
  }

  // Exits quiz
  function closeModal() {
    startBtn.classList.remove('sleep');
    modal.classList.remove('open');
    modalUpper.classList.remove('open');
    overlay.classList.remove('open');
  }

  // Events.
  startBtn.addEventListener('click', function() {
    startBtn.classList.add('sleep');

    setTimeout(openModal, 500);
  });

  overlay.addEventListener('click', closeModal);

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

  // THE QUIZ SYSTEM
  var animConfig = {
    panelExitSpeed: 500,
    buttonFocusSpeed: 700,
    quoteVisibleFor: 5500,
    showSubCheck: 1500,
    transBuffer: 50
  };
  var points = {
    prodev: 0,
    artist: 0,
    newdev: 0,
    player: 0
  };
  var roleAliases = {
    prodev: "Pro Developer",
    artist: "Artist",
    newdev: "Novice Game Developer",
    player: "Gamer"
  };
  var chosenRole = isContributor = null;

  // Function to return the speeds of various transitions (in milleseconds)
  var animDelay = function() {
    var totalDelay = 0;

    for (var arg = 0; arg < arguments.length; ++ arg) {
      var anim = arguments[arg];
      switch (anim) {
        case "panel-exit": totalDelay += animConfig.panelExitSpeed;
        break;
        case "button-focus": totalDelay += animConfig.buttonFocusSpeed;
        break;
        case "quote-visible": totalDelay += animConfig.quoteVisibleFor;
        break;
        case "sub-check": totalDelay += animConfig.showSubCheck;
        break;
        default: console.log('Error! Unknown anim key!');
        return false;
      };
    }

    totalDelay += animConfig.transBuffer;

    return totalDelay;
  }
  
  // Returns the count of unanswered questions
  var getUnansweredCount = function() {
    return document.querySelectorAll('[data-quiz-question]:not([data-quiz-done])').length;
  }

  // Randomly select an unanswered regular question
  var activateRandomUnanswered = function() {
    var unanswered = document.querySelectorAll('[data-quiz-question]:not([data-quiz-done])');
    var selectedIndex = getRandomButExclude(0, unanswered.length-1, -1);
    var selected = unanswered[selectedIndex];

    selected.setAttribute('data-quiz-active', '');

    // Scroll the panel to the top between trans
    document.querySelector('.modal').scrollTo(0, 0);
  }

  // Calculates the progress through ALL panels (not only questions) and updates the status display & bars accordingly
  var updateStatusBar = function() {
    var answeredCount = document.querySelectorAll('[data-quiz-progress-key][data-quiz-done]').length;

    var totalQuestionsCount = document.querySelectorAll('[data-quiz-question]').length;

    var usedProgressKeys = [];
    var uniqueTotalCount = 0;
    document.querySelectorAll('[data-quiz-progress-key]').forEach(function(progressItem) {
      var itemKey = progressItem.getAttribute('data-quiz-progress-key');
      console.log(itemKey);
      if (usedProgressKeys.indexOf(itemKey) === -1) {
        uniqueTotalCount++;
        usedProgressKeys.push(itemKey);
      }
    });

    var completionPercent = answeredCount / (uniqueTotalCount - 1) * 100;
    var questionNum = answeredCount;

    var progressBar = document.querySelector('[data-quiz-progress-bar] > div');
    progressBar.style.width = completionPercent+'%';

    var questionNumDisplay = document.querySelector('[data-quiz-question-number]');

    // Quiz stage display logic
    if (questionNum <= totalQuestionsCount) {
      questionNumDisplay.innerHTML = "Question "+questionNum+" / "+totalQuestionsCount;
    }
    else {
      var activePanel = document.querySelector('[data-quiz-panel][data-quiz-active]');
      var progressKey = '';
      if (activePanel)
        progressKey = activePanel.getAttribute('data-quiz-progress-key');
      
      switch (progressKey) {
        case 'qrs': questionNumDisplay.innerHTML = "Your Role"; break;
        case 'qf': questionNumDisplay.innerHTML = "Contribution"; break;
        case 'sub': questionNumDisplay.innerHTML = "Your Subscription"; break;
        case 'shr': questionNumDisplay.innerHTML = "Complete!"; break;
        default: break;
      }
    }
  };

  var focusButton = function(button) {
    button.parentNode.classList.add('selected');
    button.classList.add('selected');
  };
  
  var initQuiz = function(e) {
    // Reset points to zero
    for (var i in points) {
      points[i] = 0;
    }

    // Randomize order of answers
    var btnPanels = document.querySelectorAll('[data-quiz-panel-buttons]:not([data-quiz-noshuffle])');
    btnPanels.forEach(function(panel) {
      var buttons = panel.querySelectorAll('button');
      var order = shuffle([1, 2, 3, 4]);
      console.log(order);

      buttons.forEach(function(button, i) {
        button.style.order = order[i];
      });
    });
    
    // Wait for the transition to complete, then activate first question
    focusButton(e.currentTarget);

    // chosenRole = "artist"; // TODO -- remove debug

    setTimeout(
      function() {
        // Hide the start / intro panel
        document.querySelector('[data-quiz-start]').removeAttribute('data-quiz-active');
        document.querySelector('[data-quiz-start]').setAttribute('data-quiz-done', '');
        updateStatusBar();
      },
      animDelay('button-focus')
    );

    
    setTimeout(
      activateRandomUnanswered,
      // completeQuiz,
      // showRandomQuoteAndSubscription,
      animDelay('button-focus', 'panel-exit')
    );
  }

  // Increase points[key] count based off `data-quiz-pointkey` attr
  var givePoint = function(button) {
    var pointKey = button.getAttribute('data-quiz-pointkey');

    if (pointKey !== 'none')
      points[pointKey]++;

    console.log(points);
  };

  // Figures out the top roles for the user and displays the results panel
  var calculateAndShowResults = function() {
    var perfectRole = false; // 4/4 question match (single).
    var almostPerfectRole = false; // 3/4 question match (single).
    var goodRoles = []; // 2/4 question matches (up to 2 matches).
    var maybeRoles = []; // 1/4 question matches (up to 4 matches).
    
    for (var role in points) {
      var pointCount = points[role];
      switch (pointCount) {
        case 0: break;
        case 1: maybeRoles.push(role); break;
        case 2: goodRoles.push(role); break;
        case 3: almostPerfectRole = role; break;
        case 4: perfectRole = role; break;
        default: console.log('Impossible score detected:', pointCount, '('+role+')'); break;
      }
    };

    console.log("... And the results are in:");
    console.log("Perfect role:", perfectRole);
    console.log("Almost perfect:", almostPerfectRole);
    console.log("Good roles:", goodRoles);
    console.log("Maybe roles:", maybeRoles);

    // ~~ RESULTS DISPLAY LOGIC ~~
    var resultSelectionPanel = document.querySelector('[data-quiz-result-selection]');
    var roleMessage = document.querySelector('[data-quiz-role-message]');
    var roleSelected = document.querySelector('[data-quiz-role-selected]');
    var roleSelectedOther = document.querySelector('[data-quiz-role-selected-other]');
    var roleList = document.querySelector('[data-quiz-role-list]');
    var roleListItems = document.querySelectorAll('[data-quiz-choose-role]');

    // First fill in the aliases into the role list items
    roleListItems.forEach(function(li) {
      var liRole = li.getAttribute('data-quiz-choose-role');
      li.innerHTML = roleAliases[liRole];
    });

    // Prioritize a perfect role match
    if (perfectRole) {
      chosenRole = perfectRole;
      var message = "You perfectly matched the role of "+roleAliases[perfectRole]+". ";

      switch (perfectRole) {
        case 'prodev': message += "Science says so. You've got those sweet sweet dev moves and can l33t h@ckz0r 👨‍💻 your way out of any buggy situation.<br /><br /><small>But! If I'm wrong, hit \"I want to choose my role\" below.</small>";
        break;
        case 'artist': message += "It's in your bones. Whatever creative thing it is you do, you love doing it (and I'm willing to bet you're good at it 😉).<br /><br /><small>If you beg to differ, press \"I want to choose my role\" below.</small>";
        break;
        case 'newdev': message += "You're here to learn how to code games! Those mysterious underlying mechanics speak to you, and you yearn to know just how they work 👨‍💻.<br /><br /><small>If I got it wrong, hit \"I want to choose my role\" below.</small>";
        break;
        case 'player': message += "You're here to shoot first and ask questions later. You eat n00bs for breakfast and take no prisoners.<br /><br /><small>If I made a mistake, press \"I want to choose my role\" below.</small>";
        break;
      }

      roleMessage.innerHTML = message;
      roleSelected.innerHTML = roleAliases[perfectRole];
    }
    // Give secondary priority to a 3/4 match
    else if (almostPerfectRole) {
      chosenRole = almostPerfectRole;
      var postMessage = "";
      // sanity check:
      var tendancyRole = maybeRoles.length > 0 ? maybeRoles[0] : false;
      if (tendancyRole) {
        postMessage = " with some "+roleAliases[tendancyRole]+" tendancies";
      }
      var message = "You fit the description of \""+roleAliases[almostPerfectRole]+postMessage+".\" ";

      switch (almostPerfectRole) {
        case 'prodev': message += "Who needs bug spray with coding chops like yours? On a good day you could out-logic Spock with ease.<br /><br /><small>But! If I'm wrong, hit \"I want to choose my role\" below.</small>";
        break;
        case 'artist': message += "Whether you're an illustrator, a musician, or something else entirely... You're as creative as they come.<br /><br /><small>If you beg to differ, press \"I want to choose my role\" below.</small>";
        break;
        case 'newdev': message += "You want to know how to build games. The idea of taking one of the many ideas in your head and translating it into reality truly excites you.<br /><br /><small>If I got it wrong, hit \"I want to choose my role\" below.</small>";
        break;
        case 'player': message += "Video games bring you a lot of joy and are something you often seek out for fun. I'm willing to bet you've been playing since a young age!<br /><br /><small>If I made a mistake, press \"I want to choose my role\" below.</small>";
        break;
      }

      roleMessage.innerHTML = message;
      roleSelected.innerHTML = roleAliases[almostPerfectRole];
    }
    // Next priority is if there's a single 2/4 match
    else if (goodRoles.length === 1) {
      var goodRole = goodRoles[0];
      var message = "You were a little harder to peg, but I'm thinking \""+roleAliases[goodRole]+"\" would be a good fit.";

      chosenRole = goodRole;

      // sanity check:
      var hasTendancyRoles = (maybeRoles.length > 0);
      if (hasTendancyRoles) {
        message += " You also showed interest in the ";
        for (var i = 0; i < maybeRoles.length; i++) {
          if (i > 0) 
            message += " & ";
          
          message += roleAliases[maybeRoles[i]]+" ";
        }
        message += (maybeRoles.length > 1) ? "roles." : "role.";
      }

      message += "<br /><br /><small>If you want to choose your own role, press \"I want to choose my role\" below.</small>";

      roleMessage.innerHTML = message;
      roleSelected.innerHTML = roleAliases[goodRole];
    }
    // Or if there's a double 2/4 match...
    else if (goodRoles.length === 2) {
      var firstRole = roleAliases[goodRoles[0]];
      var secondRole = roleAliases[goodRoles[1]];

      var message = "You'll have to help me out here... You appear to be a good fit for both the "+firstRole+" & "+secondRole+" roles.<br /><br />Press \"Choose my role.\" below to tell me where you fit.";

      document.querySelector('[data-quiz-actionkey="confirm-role"]').style.display = "none";
      document.querySelectorAll('[data-quiz-actionkey="choose-role"]')[0].style.display = "none";
      document.querySelector('.or-txt').style.display = "block";
      document.querySelectorAll('[data-quiz-actionkey="choose-role"]')[1].style.display = "block";
      
      roleSelectedOther.style.display = "block";

      roleMessage.innerHTML = message;
      roleSelected.innerHTML = firstRole;
      roleSelectedOther.innerHTML = secondRole;
    }
    // Or if the user only got 1/4 match(es)
    else if (maybeRoles.length > 0) {
      var firstRole = roleAliases[maybeRoles[0]];
      var roleSentance = "You did show interest in the ";

      for (var i = 0; i < maybeRoles.length; i++) {
        if (i > 0) {
          roleSentance += ", "
        }
        if (i === maybeRoles.length - 1 && maybeRoles.length > 1) {
          roleSentance += " & ";
        }

        roleSentance += roleAliases[maybeRoles[i]];
      }

      roleSentance += (maybeRoles.length > 1) ? ' roles...' : ' role...';

      var message = "This is embarrassing, but I'm not really sure which role is best for you. "+roleSentance+" The choice is yours.<br /><br />Please tell me what role you see yourself in.";

      document.querySelector('[data-quiz-actionkey="confirm-role"]').style.display = "none";
      document.querySelectorAll('[data-quiz-actionkey="choose-role"]')[0].style.display = "none";
      document.querySelectorAll('[data-quiz-actionkey="choose-role"]')[1].style.display = "block";
      
      document.querySelector('[data-quiz-your-role]').style.display = "none";
      roleMessage.innerHTML = message;
      roleSelected.style.display = "none";
    }
    // No strong match
    else {

      var message = "So it looks like you didn't have a strong match for any roles in our community. That's no problem though, if you'd like, you can still join without a role.<br /><br />You can choose a role, or continue without a role.";

      // Hide / show the buttons
      document.querySelector('[data-quiz-actionkey="confirm-role"]').style.display = "none";
      document.querySelectorAll('[data-quiz-actionkey="choose-role"]')[0].style.display = "none";
      document.querySelectorAll('[data-quiz-actionkey="choose-role"]')[1].style.display = "block";
      
      document.querySelector('[data-quiz-your-role]').style.display = "none";
      roleMessage.innerHTML = message;
      roleSelected.style.display = "none";
    }


    // ~~ ANIMATION LOGIC ~~
    resultSelectionPanel.setAttribute('data-quiz-active', '');
    updateStatusBar();

    // Scroll the panel to the top between trans
    document.querySelector('.modal').scrollTo(0, 0);
  };

  var answerQuestion = function(e) {
    var button = e.currentTarget;
    givePoint(button);
    
    // Remove click listeners from button & siblings so users can't double tap answers mid-transition
    var panelButtons = button.parentNode.childNodes;
    panelButtons.forEach(function(button) {
      button.removeEventListener('click', answerQuestion);
    });

    // Fire up dem animations
    focusButton(button);

    setTimeout(
      function() {
        // Hide the current question panel & flag as answered
        var questionPanel = button.parentNode.parentNode;
        questionPanel.removeAttribute('data-quiz-active');
        questionPanel.setAttribute('data-quiz-done', '');

        updateStatusBar();
      },
      animDelay('button-focus')
    );

    setTimeout(
      function() {
        if (getUnansweredCount() > 0) {
          activateRandomUnanswered();
        }
        else {
          calculateAndShowResults();
        }
      },
      animDelay('button-focus', 'panel-exit')
    );
  };

  var chooseAndShowBonusQuestion = function() {
    var roleBonusPanel = document.querySelector('[data-quiz-bonus="'+chosenRole+'"]');
    roleBonusPanel.setAttribute('data-quiz-active', '');

    updateStatusBar();

    // Scroll the panel to the top between trans
    document.querySelector('.modal').scrollTo(0, 0);
  };

  var orderAndShowChooseRole = function() {
    var chooseRolePanel = document.querySelector('[data-quiz-role-select]');
    chooseRolePanel.setAttribute('data-quiz-active', '');

    // Scroll the panel to the top between trans
    document.querySelector('.modal').scrollTo(0, 0);
  };

  var setRoleAndGoToBonus = function(e) {
    var button = e.currentTarget;
    var roleKey = (button) ? button.getAttribute('data-quiz-rolekey') : false;
    
    if (roleKey) {
      chosenRole = roleKey;

      // Animate to bonus question
      focusButton(button);

      setTimeout(
        function() {
          // Hide the current panel & flag as answered
          var panel = button.parentNode.parentNode;
          panel.removeAttribute('data-quiz-active');
          panel.setAttribute('data-quiz-done', '');
        },
        animDelay('button-focus')
      );
  
      setTimeout(
        chooseAndShowBonusQuestion,
        animDelay('button-focus', 'panel-exit')
      );
    }
    else {
      console.log('[data-quiz-rolekey] unknown event-attribute mismatch.');
    }
  };

  var configAndShowSubscription = function() {
    // Hide the wrong feature checklists
    var featureSets = document.querySelectorAll(
      '[data-quiz-panel][data-quiz-subscription] ul:not([data-quiz-role-features="'+chosenRole+'"])'
    );
    featureSets.forEach(function(featureSet) {
      featureSet.style.display = 'none';
    });

    // Show the panel
    var subPanel = document.querySelector('[data-quiz-subscription]');
    subPanel.setAttribute('data-quiz-active', '');
    updateStatusBar();
  };

  var showRandomQuoteAndSubscription = function() {
    var quotes = [
      {
        quote: "Alone we can do so little, together we can do so much.",
        author: "Helen Keller"
      },
      {
        quote: "If everyone is moving forward together, then success takes care of itself.",
        author: "Henry Ford"
      },
      {
        quote: "A sustainable world means working together to create prosperity for all.",
        author: "Jacqueline Novogratz"
      },
      {
        quote: "What is important is that we make sure to work together, that we understand our strength comes from unity and not division.",
        author: "Barack Obama"
      }
    ];
    var randomIndex = getRandomButExclude(0, quotes.length - 1, -1);
    var selectedQuote = quotes[randomIndex];
    
    if (selectedQuote) {
      var quoteP = document.querySelector('[data-quiz-quote]');
      var authorP = document.querySelector('[data-quiz-quote-author]');
      var quotePanel = document.querySelector('[data-quiz-completion-quote]');

      quoteP.innerHTML = '"'+selectedQuote.quote+'"';
      authorP.innerHTML = '- '+selectedQuote.author;

      quotePanel.setAttribute('data-quiz-active', '');

      setTimeout(function() {
        quotePanel.removeAttribute('data-quiz-active');
        quotePanel.setAttribute('data-quiz-done', '');

        setTimeout(
          configAndShowSubscription,
          animDelay('panel-exit')
        );
      }, animDelay('quote-visible'));
    }
  };

  var pressActionButton = function(e) {
    var button = e.currentTarget;
    var actionKey = (button) ? button.getAttribute('data-quiz-actionkey') : false;
    
    switch (actionKey) {
      case 'confirm-role':
        // Animate to bonus question
        focusButton(button);

        setTimeout(
          function() {
            // Hide the current panel & flag as answered
            var panel = button.parentNode.parentNode;
            panel.removeAttribute('data-quiz-active');
            panel.setAttribute('data-quiz-done', '');
          },
          animDelay('button-focus')
        );
    
        setTimeout(
          chooseAndShowBonusQuestion,
          animDelay('button-focus', 'panel-exit')
        );
      break;

      case 'choose-role':
        // Animate to choose role panel
        focusButton(button);

        setTimeout(
          function() {
            // Hide the current panel & flag as answered
            var panel = button.parentNode.parentNode;
            panel.removeAttribute('data-quiz-active');
            panel.setAttribute('data-quiz-done', '');
          },
          animDelay('button-focus')
        );
    
        setTimeout(
          orderAndShowChooseRole,
          animDelay('button-focus', 'panel-exit')
        );
      break;

      case 'contribute-yes':
        // User selected yes to being open to contributing
        isContributor = true;
        focusButton(button);

        setTimeout(
          function() {
            // Hide the current panel & flag as answered
            var panel = button.parentNode.parentNode;
            panel.removeAttribute('data-quiz-active');
            panel.setAttribute('data-quiz-done', '');
          },
          animDelay('button-focus')
        );

        setTimeout(
          showRandomQuoteAndSubscription,
          animDelay('button-focus', 'panel-exit')
        );
      break;

      case 'contribute-no':
        // User selected no to being open to contributing
        isContributor = false;
        focusButton(button);

        setTimeout(
          function() {
            // Hide the current panel & flag as answered
            var panel = button.parentNode.parentNode;
            panel.removeAttribute('data-quiz-active');
            panel.setAttribute('data-quiz-done', '');
          },
          animDelay('button-focus')
        );

        setTimeout(
          showRandomQuoteAndSubscription,
          animDelay('button-focus', 'panel-exit')
        );
      break;

      default:
        console.log('Uh oh... Invalid [data-quiz-actionkey]!');
      break;
    }
  };

  var completeQuiz = function() {
    var subPanel = document.querySelector('[data-quiz-subscription]');
    subPanel.removeAttribute('data-quiz-active');
    subPanel.setAttribute('data-quiz-done', '');

    setTimeout(function() {
      var sharePanel = document.querySelector('[data-quiz-complete-share]');
      document.querySelector('.modal').scrollTo(0, 0);
      sharePanel.setAttribute('data-quiz-active', '');
      updateStatusBar();
    }, animDelay('panel-exit'));
  };

  var submitSubscriptionForm = function(e) {
    e.preventDefault();

    this._form = form;

    var checkForText = this._form.querySelectorAll("[data-required-text]");
    var checkForEmail = this._form.querySelectorAll("[data-required-email]");
    var finalErrorNode = this._form.querySelector(".final-error-msg");
    
    var errorCount = 0;

    // Validate all required text fields
    for (var t = 0; t < checkForText.length; t++) {
      var inputNode = checkForText[t];
      var errorNode = inputNode.parentNode.querySelector(".error-msg");
      errorNode.classList.remove('active');
      inputNode.classList.remove('error');
      if (inputNode.value.trim().length === 0) {
        errorCount++;
        inputNode.classList.add('error');
        var msg = inputNode.getAttribute("data-required-text");
        errorNode.innerHTML = msg;
        errorNode.classList.add('active');
      }
    }

    // Validate all email fields
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    for (var e = 0; e < checkForEmail.length; e++) {
      var emailNode = checkForEmail[e];
      var errorNode = emailNode.parentNode.querySelector(".error-msg");
      emailNode.classList.remove('error');
      errorNode.classList.remove('active');

      if (!re.test(String(emailNode.value).toLowerCase())) {
        errorCount++;
        emailNode.classList.add('error');
        var msg = emailNode.getAttribute('data-required-email');
        errorNode.innerHTML = msg;
        errorNode.classList.add('active');
      }
    }

    // If there's one or more errors, return out of the function and show a message
    finalErrorNode.classList.remove('active');
    if (errorCount === 1) {
      finalErrorNode.classList.add('active');
      finalErrorNode.innerHTML = "There was "+errorCount+" error in your subscription. It has been highlighted above. Please review your submission, make correct the error, and re-submit!";
      return false;
    }
    else if (errorCount > 0) {
      finalErrorNode.classList.add('active');
      finalErrorNode.innerHTML = "There were "+errorCount+" errors in your subscription. They have been highlighted above. Please review your submission, correct the errors, and re-submit!";
      return false;
    }

    // Birthday fields don't need validation as they're always filled.

    // Collect all the form attributes
    this._action = this._form.getAttribute("data-"+chosenRole+"-action");
    this._first = this._form.querySelector("input[name='FNAME']").value;
    this._last = this._form.querySelector("input[name='LNAME']").value;
    this._email = this._form.querySelector("input[name='EMAIL']").value;
    this._bday_m = document.getElementById("mce-BIRTHDAY-month").value;
    this._bday_d = document.getElementById("mce-BIRTHDAY-day").value;

    document.MC_overlay_loading = this._form.querySelector(".overlay-loading");
    document.MC_overlay_response = this._form.querySelector(".overlay-response");

    // Set the document MailChimp callback
    document.MC_callback = function(response) {
      document.MC_overlay_loading.classList.remove('active');
      document.MC_overlay_response.querySelector("i.success").style.display = "none";
      document.MC_overlay_response.querySelector("i.warning").style.display = "none";
      if(response.result == "success") {
        document.MC_overlay_response.classList.add('success');
        document.MC_overlay_response.querySelector("i.success").style.display = "inline";
        document.MC_overlay_response.querySelector(".message").style.display = "none";

        setTimeout(completeQuiz, animDelay('sub-check'));
      } else {
        document.MC_overlay_response.classList.add('warning');
        document.MC_overlay_response.querySelector("i.warning").style.display = "inline";

        var overlayMsg = response.msg.replace(/<a href=".+\/a>/, "").trim();
        var lastChar = overlayMsg[overlayMsg.length-1];
        if (lastChar !== '.' && lastChar !== '!') {
          overlayMsg += '.';
        }
        
        document.MC_overlay_response.querySelector(".message span").innerText = overlayMsg;
      }
    }

    // Create a script element and append it to the head... Not hacky at all.
    this._script = document.createElement("script");
    this._script.type = "text/javascript";
    this._script.src = this._action + "&c=document.MC_callback&FNAME="+this._first+"&LNAME="+this._last+"&EMAIL="+this._email+"&BIRTHDAY[month]="+this._bday_m+"&BIRTHDAY[day]="+this._bday_d;

    document.getElementsByTagName("head")[0].appendChild(this._script);

    // Show the spinner
    this._form.querySelector('.overlay-loading').classList.add('active');
  };

  var socialDispatch = function(e) {
    var button = e.currentTarget;
    var socialOutlet = button.getAttribute('data-quiz-share');
    var shareURL = "https://saricden.com/";
    var url = "";

    switch (socialOutlet) {
      case "facebook": url = "https://www.facebook.com/sharer.php?p[url]="+shareURL; break;
      case "twitter": url = "https://twitter.com/home?status="+shareURL; break;
      case "tumblr": url = "https://www.tumblr.com/share/link?url="+shareURL; break;
      case "linkedin": url = "https://www.linkedin.com/shareArticle?mini=true&url="+shareURL; break;
      default: break;
    }

    var win = window.open(url, '_blank');
    win.focus();
  };

  // Event binding
  document.querySelector('button[data-quiz-launch]').addEventListener('click', initQuiz);

  document.querySelectorAll('[data-quiz-pointkey]').forEach(function(button) {
    button.addEventListener('click', answerQuestion);
  });

  document.querySelector('button[data-quiz-goback]').addEventListener('click', closeModal);

  document.querySelectorAll('[data-quiz-actionkey]').forEach(function(button) {
    button.addEventListener('click', pressActionButton);
  });

  document.querySelectorAll('[data-quiz-rolekey]').forEach(function(button) {
    button.addEventListener('click', setRoleAndGoToBonus);
  });

  var form = document.getElementById('mc-form');
  
  form.addEventListener('submit', submitSubscriptionForm);

  // Reset form link (on failed submits)
  document.querySelector('a.try-again').addEventListener('click', function(e) {
    e.preventDefault();
    this.parentNode.parentNode.classList.remove('warning');
  });

  // Binding social media buttons to their respective functions
  document.querySelectorAll('[data-quiz-share]').forEach(function(button) {
    button.addEventListener('click', socialDispatch);
  });
});
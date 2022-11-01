let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
// for Detecting keyboard keys
$(document).keydown(function() {
  // alert("working");
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// for user clicks
$(".btn").click(userClicks);

function userClicks() {
  let userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  let currentLevel = userClickedPattern.indexOf(userChosenColour);
  checkAnswer(currentLevel);

  setTimeout(nextSequence(), 1000);
  console.log(userClickedPattern);
  while (userClickedPattern.length > 0) {
    userClickedPattern.pop();
  }
  console.log(userClickedPattern);
}

// computer player
function nextSequence() {
  $("#level-title").text("Level " + level);

  level++;

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  gamePattern.push(randomChosenColour);

  return randomChosenColour;
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("sucess");
  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// sounds for individual buttons
function playSound(name) {
  // $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// animation for each press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

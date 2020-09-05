var colors = ["green", "red", "yellow", "blue"];
var patt = [];
var userColorPattern = [];
var level = 0;

var start = false;
$(document).keydown(function () {
  if (!start) {
    ranval();
    start = true;
  }
});

function ranval() {
  userColorPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var value = Math.floor(Math.random() * 4);
  var chosenColor = colors[value];
  patt.push(chosenColor);

  $("#" + chosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  buttonSound(chosenColor);
}

$(".btn").click(function (event) {
  var buttonColor = $(this).attr("id");
  userColorPattern.push(buttonColor);
  buttonSound(buttonColor);
  animatePress(buttonColor);
  checkans(userColorPattern.length - 1);
});

function checkans(currlevel) {
  if (patt[currlevel] === userColorPattern[currlevel]) {
    console.log("success");
    if (patt.length === userColorPattern.length) {
      setTimeout(function () {
        ranval();
      }, 1000);
    }
  } else {
    console.log("wrong");
    buttonSound("wrong");
    $("body").addClass("gameover");
    setTimeout(function () {
      $("body").removeClass("gameover");
    }, 200);
    startOver();
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
}

function startOver() {
  start = false;
  level = 0;
  patt = [];
}
function buttonSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

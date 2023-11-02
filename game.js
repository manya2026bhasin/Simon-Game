var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level = 0;
var buttonColors=["red","blue","green","yellow"];
$(document).keypress(function() {
    if (!started) {
      nextSequence();
      started = true;
    }
  });
  $(".box").click(function(){
    var userChosenColor=$(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    setTimeout(function(){
        $("."+userChosenColor).removeClass("press");
    },10);
    $("."+userChosenColor).addClass("press");
    checkAnswer(userClickedPattern.length-1);

});
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
  
    $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    setTimeout(function(){
        $("."+randomChosenColor).removeClass("press");
    },10);
    $("."+randomChosenColor).addClass("press");
    playSound(randomChosenColor);
}

function playSound(name){
    if(name==="yellow"){
        var audio = new Audio("sounds/yellow2.mp3");
        audio.play();
    }
    else{
        var audio = new Audio("sounds/" + name + "-sound.wav");
        audio.play();
    }

}
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        $("h1").text("Game Over");
        $("h1").append('<img id="gif" src="sad2.gif">')
        var audio = new Audio("sounds/yellow-sound.wav");
        audio.play();
      startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }



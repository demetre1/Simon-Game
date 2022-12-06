var buttonColors = ["red", "blue", "green", "yellow"]; 

var gamePattern = []  ;
var userClickedPattern = [] ; 

var started = false;
var level  = 0;

$(document).keypress(function(){
  if(!started){

    $("#level-title").text("level " + level);
    nextSequance();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  pressed(userChosenColour);
  checkAnswer(userClickedPattern.length - 1,);

});

function nextSequance(){
  userClickedPattern = [];
  level++;

  $("#level-title").text("level " + level);
  
  var randromNumber = Math.floor((Math.random()  * 4)); 
  var randomChosenColour = buttonColors[randromNumber];

  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColour);

  
}


function playSound(name) {

  
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function pressed(currentColor){
  
  var activeButton  = $("#"+ currentColor);
  $(activeButton).addClass("pressed");
  
setTimeout(function(){
  $(activeButton).removeClass("pressed");
}, 100);


}

function checkAnswer(currentLevel){
                                          
 if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
  console.log("Success");
  
  if(userClickedPattern.length == gamePattern.length){ 
    setTimeout(function(){
    nextSequance()
    
    },1000)
  }
 }else{
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
    playSound("wrong");
  },200);
  console.log("Wrong");

  $("#level-title").text("Game Over, Press Any Key to Restart");

  startOver();
 }


 
}

function startOver(){
  
  level = 0;
  gamePattern = []
  started = false;
 
}
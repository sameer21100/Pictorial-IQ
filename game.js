function startOver(){
gamePattern=[];
started=false;
level=0;
}


var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;


var level = 0;

$(document).keydown(function () {

    if (!started) {
        nextSequence();
        started = true;
    }
    $("h1").text("Level  " + level);

});



function nextSequence() {
    userClickedPattern = [];

    var a = Math.floor((Math.random()) * 4);
    level++;
    $("h1").text("Level  " + level);
    var randomChosenColor = buttonColors[a];
    gamePattern.push(randomChosenColor);

    $("." + randomChosenColor).fadeOut().fadeIn();                    //good feature
    playSound(randomChosenColor);


}



$(".btn").click(function () {



    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length);
    playSound(userChosenColor);
    animatePress(userChosenColor);


});



function checkAnswer(index) {
    var a = index;
    if (gamePattern[a - 1] === userClickedPattern[a - 1]) {
        console.log("coorect");
        if (userClickedPattern.length === gamePattern.length) {


            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
       var wrong=new Audio("wrong.mp3");
       wrong.play();
       $("h1").text("Game over, Press any key to restart");
       $("body").addClass("game-over");
       setTimeout(function(){
        $("body").removeClass("game-over");
       },100);
       startOver();
    }
}

function playSound(name) {
    var a = new Audio("sounds/" + name + ".mp3");
    a.play();
}

function animatePress(clicked) {
    $("." + clicked).addClass("pressed");
    setTimeout(function () {
        $("." + clicked).removeClass("pressed")
    }, 100);
}

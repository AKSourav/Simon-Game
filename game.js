//Setting Base
var sysStart=false;
var level = 0;
var userSequence= [];
var gameSequence= [];
var buttons = {
    1: "green",
    2: "red",
    3: "yellow",
    4: "blue"
}
function waiting()
{
    $(document).keypress(function(event)
    {
        if(sysStart==false)
        {
            sysStart=true;
            setTimeout(game(),1000);
        }
    })
}
waiting();
function ButtonSound(buttonPressed) {
    // console.log(buttonPressed);
    $("#" + buttonPressed).addClass("pressed");
    setTimeout(function () {
        $("#" + buttonPressed).removeClass("pressed");
    }, 200);
    switch (buttonPressed) {
        case "green":
            var greenAudio = new Audio("./sounds/green.mp3");
            greenAudio.play();
            break;
        case "red":
            var redAudio = new Audio("./sounds/red.mp3");
            redAudio.play();
            break;
        case "yellow":
            var yellowAudio = new Audio("./sounds/yellow.mp3");
            yellowAudio.play();
            break;
        case "blue":
            var blueAudio = new Audio("./sounds/blue.mp3");
            blueAudio.play();
            break;
    }
}
//function for checking sequence
$(".btn").click(function () {
    var bPressed = this.getAttribute("id");
    ButtonSound(bPressed);
    userSequence.push(bPressed);
    checkSequence(userSequence.length-1);
});
function checkSequence(currentPress)
{
    console.log("Checking!!");
    if(userSequence[currentPress]==gameSequence[currentPress])
    {
        if(userSequence.length==gameSequence.length)
            setTimeout(function(){
                game();
            },1000);
    }
    else
    {
        gameOver();
    }
    
}
//creating game
function game() {
    console.log("gamee!!");
    userSequence=[];
    level++;
    $("#level-title").text(`Level ${level}`);
    tiles = Math.floor(Math.random() * 4) + 1;
    gameSequence.push(buttons[tiles]);
    // console.log(gameSequence);
    var buttPressed = buttons[tiles];
    $("#"+buttPressed).fadeIn(100).fadeOut(100).fadeIn(100);
    checkSequence(gameSequence);
}
function gameOver() {
    $("#level-title").text(`Game Over! Enter Any Key to restart!`);
    var worngSound = new Audio("./sounds/wrong.mp3");
    worngSound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    sysStart=false;
    level=0;
    userSequence=[];
    gameSequence=[];
    waiting();
}
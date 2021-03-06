"use strict"
var playerName;
var playerNameInput = document.getElementById('playerNameInput');
var socket;

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

//performance debugging widget
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

//Set canvas size to window size and create variable to access it.
var c = document.getElementById('cvs');
var canvas = c.getContext('2d');
c.width = screenWidth; c.height = screenHeight;
var game;





function startGame() {
    playerName = playerNameInput.value.replace(/(<([^>]+)>)/ig, '');
    document.getElementById('gameAreaWrapper').style.display = 'block';
    document.getElementById('startMenuWrapper').style.display = 'none';
    game = new Game(canvas);
    socket = io();
    SetupSocket(socket);
    
    animloop();
}

// check if nick is valid alphanumeric characters (and underscores)
function validNick() {
    var regex = /^\w*$/;
    //console.log('Regex Test', regex.exec(playerNameInput.value));
    return regex.exec(playerNameInput.value) !== null;
}


window.onload = function() {

    var btn = document.getElementById('startButton'),
        nickErrorText = document.querySelector('#startMenu .input-error');

    btn.onclick = function () {

        // check if the nick is valid
        if (validNick()) {
            startGame();
        } else {
            nickErrorText.style.display = 'inline';
        }
    };

    playerNameInput.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;

        if (key === globalVals.KEY_ENTER) {
            if (validNick()) {
                startGame();
            } else {
                nickErrorText.style.display = 'inline';
            }
        }
    });
};

function SetupSocket(socket) {
  game.handleNetwork(socket);
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
})();

//The client side game loop speed is determined by the requestAnimFrame rate.
function animloop(){

    requestAnimFrame(animloop);
    stats.begin(); //This is the watcher for the little performance window 
    gameLoop();
    stats.end();
}

function gameLoop() {
    game.handleLogic();
    game.handleGraphics();
}

window.addEventListener('resize', function() {
    console.log("window resized");
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    c.width = screenWidth;
    c.height = screenHeight;
    if(game !== undefined)
    {
        game.handleScreenResize(screenWidth, screenHeight);
    }
}, true);

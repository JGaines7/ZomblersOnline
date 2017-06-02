//An instance of a running 'game'. Clients get their own Game that is updated with a mix of user input and server updates.
//handles the network callbacks, gameloop logic, and drawing of the game.
//Destroy the game if client is in lobby or login page etc.


function Game(canvas) { 
  this.inputsCanvas = new InputsCanvas();
  this.gameWorld = new GameWorld(3000,3000);
  this.renderer = new Renderer(canvas);

  //some placeholder players
  var tmpZombies = [];
  for(var i = 0; i < 1000; i++)
  {
    tmpZombies.push(new Zombie(new Vector(Math.random()*this.gameWorld.worldWidth,Math.random()*this.gameWorld.worldHeight), new Vector(Math.random(),Math.random()),0));
  }
  this.gameWorld.zombies = tmpZombies;

  //Test initial viewport and player
  var tmpPlayer = new Player(new Vector(300,300),new Vector(0,0),"Bantha");
  this.gameWorld.players.push(tmpPlayer);
  var viewPort = new Viewport();
  viewPort.dimensions = new Vector(canvas.width,canvas.height);
  viewPort.setCenterPosition(tmpPlayer.position);
  this.renderer.currentViewport = viewPort;


};

Game.prototype.handleNetwork = function(socket) {
  console.log('Game connection process here');
  console.log(socket);
  // This is where you receive all socket messages



}

Game.prototype.handleLogic = function() {
  //console.log('Game is running');
  // This is where you update your game logic
  var currentKeys = this.inputsCanvas.getKeysDown();
  

  //Some simple movement logic
  var dir = this.inputsCanvas.getMovementDirection();
  //console.log("DIR: " + dir.x + " : " + dir.y)
  this.gameWorld.players[0].velocity = Vector.multiply(dir, 5);
  this.inputsCanvas.clearKeys();
  //Time delta = x;


  var zombies = this.gameWorld.zombies;
  for(i = 0; i < zombies.length; i++)
  {
    zombies[i].updatePosition(1);
  }

  var players = this.gameWorld.players;
  for(i = 0; i < players.length; i++)
  {

    players[i].updatePosition(1);
  }


  this.renderer.currentViewport.setCenterPosition(this.gameWorld.players[0].position);


  //network callbacks will have updated our gamestate

  //update our gamestate based on the time delta
  //updateSimulation(this.gameWorld);
  //iterate through players
  //update their velocity based on inputs
  //update their positions based on velocity
  //do collision checking
  //


  //console.log("Gameloop. Curr keys: " + currentKeys);
}

Game.prototype.handleGraphics = function() {
  // This is where you draw everything
  this.renderer.render(this.gameWorld);
}



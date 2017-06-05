"use strict"
//An instance of a running 'game'. Clients get their own Game that is updated with a mix of user input and server updates.
//handles the network callbacks, gameloop logic, and drawing of the game.
//Destroy the game if client is in lobby or login page etc.


function Game(canvas) { 

  var canvasUserInputs = new CanvasUserInputs();
  var gameWorld = new GameWorld(8000,8000);
  var renderer = new Renderer(canvas);

  //some placeholder zombie spawning
  var tmpZombies = [];
  for(var i = 0; i < 10000; i++)
  {
    tmpZombies.push(new Zombie(new Vector(Math.random()*gameWorld.worldWidth,Math.random()*gameWorld.worldHeight), new Vector(Math.random()-.5,Math.random()-.5), 0));
  }
  gameWorld.zombies = tmpZombies;

  //Test initial viewport and player
  var tmpPlayer = new Player(new Vector(300,300),new Vector(0,0),"Bantha");
  gameWorld.players.push(tmpPlayer);

  var viewPort = new Viewport();
  viewPort.setDimensions(new Vector(screenWidth,screenHeight));
  viewPort.setCenterPosition(tmpPlayer.position);

  //Set the viewport to render for
  //We can theoretically render to multiple viewports
  renderer.setViewport(viewPort);

  this.handleNetwork = function(socket) {
  console.log('Game connection process here');
  console.log(socket);
  // This is where you receive all socket messages
  }


  this.handleLogic = function() {
    //console.log('Game is running');
    // This is where you update your game logic

    handleUserInputs();
    moveEntities();
    checkCollisions();
    updateCamera();

    //network callbacks will have updated our gamestate
    //update our gamestate based on the time delta
    //updateSimulation(this.gameWorld);
    //iterate through players
    //update their velocity based on inputs
    //update their positions based on velocity
    //do collision checking
    //
  }

  this.handleGraphics = function() {
  // This is where you draw everything
    renderer.render(gameWorld);
  }

  this.handleScreenResize = function()
  {
    viewPort.setDimensions(new Vector(screenWidth,screenHeight));
    //viewPort.setCenterPosition(tmpPlayer.position);
  }

  //--------------- Private Functions --------------//

  function handleUserInputs() {
    //Some simple player movement logic (assumes you are player[0])
    var dir = canvasUserInputs.getMovementDirection();
    gameWorld.players[0].velocity = Vector.multiply(dir, globalVals.PLAYER_MAX_SPEED);

  }

  function moveEntities() {
   
    var zombies = gameWorld.zombies;
    for(var i = 0; i < zombies.length; i++)
    {

      //randomizeDirection  (This kinda stuff will have to either be in the zombie class or in some kind of helper file. Want to minimize code overhead in high count objects)
      zombies[i].velocity = Vector.add(zombies[i].velocity, new Vector((Math.random() - 0.5) * 0.2,(Math.random() - 0.5) * 0.2));
      if (zombies[i].velocity.length() > globalVals.ZOMBIE_MAX_SPEED)
      {
        zombies[i].velocity.normalize();
        zombies[i].velocity.multiply(globalVals.ZOMBIE_MAX_SPEED);
      }
      //move based on current velocity
      zombies[i].updatePosition(1);
    }

    var players = gameWorld.players;
    for(i = 0; i < players.length; i++)
    {

      players[i].updatePosition(1);
    }
  }

  function checkCollisions() {
   
    //For every zombie in game,
    //check if it is colliding with an obstacle.
    //if it is, move back to just before it collided

    
    checkWorldEdgeCollisions(gameWorld.zombies, globalVals.ZOMBIE_RADIUS);
    checkWorldEdgeCollisions(gameWorld.players, globalVals.PLAYER_RADIUS);
    

    function checkWorldEdgeCollisions(items, radius)
    {
      for(var i = 0; i < items.length; i++)
      {
        //for each wall, check if zombie is past the bound. if it is, move it back. i.e. left wall collision, x = 0 + radius.
        var collidingWalls = checkWorldEdgeCollision(items[i].position, radius);
        if(collidingWalls.left)
        {
          items[i].position.x = 0 + radius;
          items[i].velocity.x = 0.2;
        }
        if(collidingWalls.right)
        {
          items[i].position.x = gameWorld.worldWidth - radius;
          items[i].velocity.x = -0.2;
        }
        if(collidingWalls.top)
        {
          items[i].position.y = 0 + radius;
          items[i].velocity.y = 0.2;
        }
        else if(collidingWalls.bottom)
        {
          items[i].position.y = gameWorld.worldHeight - radius;
          items[i].velocity.y = -0.2;
        }

      }
    }

    function checkWorldEdgeCollision(position, radius)
    {
      //crappy box bounding check
      var retVal = {}
      retVal.left = false;
      retVal.top = false;
      retVal.right = false;
      retVal.bottom = false;
      //left wall
      if(position.x - radius < 0)
      {
        retVal.left = true;
      }
      else if(position.x + radius > gameWorld.worldWidth)
      {
        retVal.right = true;
      }
      if(position.y - radius < 0)
      {
        retVal.top = true;
      }
      else if(position.y + radius > gameWorld.worldHeight)
      {
        retVal.bottom = true;
      }
      return retVal;
    }

  }

  function updateCamera() {

    viewPort.setCenterPosition(gameWorld.players[0].position);
    //renderer.getCurrentViewPort.setCenterPosition(gameWorld.players[0].position);

  }

};


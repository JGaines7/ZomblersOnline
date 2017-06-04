"use strict"
//This class takes information from the GameWorld and renders them.


function Renderer(canvas)
{
	//The canvas element to draw to.
	var _canvas = canvas;
	//The viewport to draw to.
	var _currentViewport = undefined;

	this.setViewport = function(viewPort) { _currentViewport = viewPort;}
	//TODO eventually we could have multiple layered canvases for different elements (Game, minimap, UI)

	this.render = function(gameWorldObject)
	{
		drawBackground();
		drawPlayers(gameWorldObject.players);
		drawZombies(gameWorldObject.zombies);
		drawBorder(gameWorldObject.worldWidth, gameWorldObject.worldHeight);
		drawDebugValues(canvas);
	}

	//internal functions


	function drawBackground()
	{
		_canvas.fillStyle = '#FFFFFF';
		_canvas.fillRect(0, 0, screenWidth, screenHeight);
	}

	function drawZombies(zombies)
	{
		var zombieColor = '#FF0000';

		var adjustedPosition;
		for(var i = 0; i < zombies.length; i++)
		{
			adjustedPosition = _currentViewport.getViewOffsetFromVec(zombies[i].position);
			if(_currentViewport.isInView(zombies[i].position))
			{
				drawCircle(_canvas, adjustedPosition.x, adjustedPosition.y, globalVals.ZOMBIE_RADIUS, 5, zombieColor);
			}
		}
	};

	function drawPlayers(players)
	{
		var playerColor = '#00FF00';

		_canvas.font = "30px Arial";

		debugLog("Viewport X" , _currentViewport.getPosition().x);
		debugLog("Viewport Y" , _currentViewport.getPosition().y);

		var adjustedPosition;
		for(var i = 0; i < players.length; i++)
		{
			adjustedPosition = _currentViewport.getViewOffsetFromVec(players[i].position);
			drawCircle(_canvas, adjustedPosition.x, adjustedPosition.y, globalVals.PLAYER_RADIUS, 8, playerColor);
		}
	};

	function drawBorder(width, height)
	{
		var adj = _currentViewport.getViewOffset;
		var adjustedPosition;

		_canvas.fillStyle = "#0000FF"
		_canvas.beginPath();
		_canvas.moveTo(adj(0,0).x, adj(0,0).y);
		_canvas.lineTo(adj(width,0).x, adj(width,0).y);
		_canvas.lineTo(adj(width,height).x, adj(width,height).y);
		_canvas.lineTo(adj(0,height).x, adj(0,height).y);
		_canvas.lineTo(adj(0,0).x, adj(0,0).y);
		_canvas.stroke();
	}



	//function drawUI();


	//primitive functions (Move to lib?)

	function drawCircle(canvas, centerX, centerY, radius, sides, color) {
	    var theta = 0;
	    var x = 0;
	    var y = 0;

	    canvas.fillStyle = color;
	    canvas.beginPath();

	    for (var i = 0; i < sides; i++) {
	        theta = (i / sides) * 2 * Math.PI;
	        x = centerX + radius * Math.sin(theta);
	        y = centerY + radius * Math.cos(theta);
	        canvas.lineTo(x, y);
	    }

	    canvas.closePath();
	    //canvas.stroke();
	    canvas.fill();
	}

}


function Viewport()
{
	//Position TopLeft
	var position = new Vector(0,0);
	this.getPosition = function() {return position;}
	this.setPosition = function(pos) { position = pos;}

	var dimensions = new Vector(0,0);
	this.getDimensions = function(){return dimensions;}
	this.setDimensions = function(dim) { dimensions = dim; console.log("Set dimesions to : " + dimensions.x);}
	
	this.setCenterPosition = function(pos)
	{
		//Need center position subtracted by half of the size
		position = Vector.subtract(pos, Vector.multiply(new Vector(dimensions.x, dimensions.y), 0.5))
	}

	this.getViewOffset = function(x,y)
	{
		return Vector.subtract(new Vector(x,y), position);
	}
	this.getViewOffsetFromVec = function(pos)
	{
		return Vector.subtract(pos, position);
	}

	this.isInView = function(testPos)
	{
		//basic check, if object is within 100 tiles of view, just draw it. (assuming all objects < 100 radius)

		var cullDist = 100;

		if(testPos.x > position.x - cullDist && testPos.x < position.x + dimensions.x + cullDist
		&& testPos.y > position.y - cullDist && testPos.y < position.y + dimensions.y + cullDist)
		{
			return true;
		}
		else
		{
			return false;
		}
	}


}

//This class takes information from the GameWorld and renders them.


function Renderer(canvas)
{
	//The canvas element to draw to.
	this._canvas = canvas;
	//The viewport to draw to.
	this.currentViewport = undefined;
	//TODO eventually we could have multiple layered canvases for different elements (Game, minimap, UI)

	this.render = function(gameWorldObject)
	{
		this.drawBackground();
		this.drawPlayers(gameWorldObject.players);
		this.drawZombies(gameWorldObject.zombies);
		this.drawBorder(gameWorldObject.worldWidth, gameWorldObject.worldHeight);
		drawDebugValues(canvas);
	}

	//internal functions
	this.drawBackground = function()
	{
		this._canvas.fillStyle = '#FFFFFF';
		this._canvas.fillRect(0, 0, screenWidth, screenHeight);
	}

	this.drawZombies = function(zombies)
	{
		var zombieColor = '#FF0000';

		var adjustedPosition;
		for(i = 0; i < zombies.length; i++)
		{
			adjustedPosition = this.currentViewport.getViewOffsetFromVec(zombies[i].position);
			drawCircle(this._canvas, adjustedPosition.x, adjustedPosition.y, 15, 5, zombieColor);
		}
	};

	this.drawPlayers = function(players)
	{
		var playerColor = '#00FF00';

		this._canvas.font = "30px Arial";

		debugLog("Viewport X" , this.currentViewport.getPosition().x);
		debugLog("Viewport Y" , this.currentViewport.getPosition().y);

		var adjustedPosition;
		for(i = 0; i < players.length; i++)
		{
			adjustedPosition = this.currentViewport.getViewOffsetFromVec(players[i].position);
			drawCircle(this._canvas, adjustedPosition.x, adjustedPosition.y, 15, 8, playerColor);
		}
	};

	this.drawBorder = function(width, height)
	{
		var adj = this.currentViewport.getViewOffset;
		var adjustedPosition;

		debugLog("width",width);
		debugLog("adj width",this.currentViewport.getViewOffset(width,0).x);
		this._canvas.fillStyle = "#0000FF"
		this._canvas.beginPath();
		this._canvas.moveTo(adj(0,0).x, adj(0,0).y);
		this._canvas.lineTo(adj(width,0).x, adj(width,0).y);
		this._canvas.lineTo(adj(width,height).x, adj(width,height).y);
		this._canvas.lineTo(adj(0,height).x, adj(0,height).y);
		this._canvas.lineTo(adj(0,0).x, adj(0,0).y);
		this._canvas.stroke();
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

}

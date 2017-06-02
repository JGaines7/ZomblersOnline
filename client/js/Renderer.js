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

		for(i = 0; i < zombies.length; i++)
		{
			drawCircle(this._canvas, zombies[i].position.x - this.currentViewport.position.x, zombies[i].position.y - this.currentViewport.position.y, 15, 5, zombieColor);
		}
	};

	this.drawPlayers = function(players)
	{
		var playerColor = '#00FF00';

		for(i = 0; i < players.length; i++)
		{
			drawCircle(this._canvas, players[i].position.x - this.currentViewport.position.x, players[i].position.y - this.currentViewport.position.y, 15, 8, playerColor);
		}
	};
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
	this.position = new Vector(0,0);
	this.dimensions = new Vector(100,100);

	this.setCenterPosition = function(position)
	{
		//Need center position subtracted by half of the size
		this.position = Vector.subtract(position, Vector.multiply(new Vector(this.dimensions.x, this.dimensions.y), 0.5))
	}


}
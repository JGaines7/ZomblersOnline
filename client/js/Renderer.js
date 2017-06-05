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


	//Experiment with high performance drawing by blitting an offscreen canvas to the screen for repeated identical objects (zombies)
	var zombieBlitCanvas = document.createElement('canvas');
	var zombieBlitCanvasContext = zombieBlitCanvas.getContext('2d');
	zombieBlitCanvas.height = globalVals.ZOMBIE_RADIUS * 2;
	zombieBlitCanvas.width = globalVals.ZOMBIE_RADIUS * 2;
	drawCircle(zombieBlitCanvasContext, globalVals.ZOMBIE_RADIUS, globalVals.ZOMBIE_RADIUS, globalVals.ZOMBIE_RADIUS, 45, '#FF0000');
	var zombieImage = zombieBlitCanvasContext.getImageData(0,0,globalVals.ZOMBIE_RADIUS * 2,globalVals.ZOMBIE_RADIUS * 2); 
            
            


	this.render = function(gameWorldObject)
	{
		drawBackground();
		drawGrid(gameWorldObject.worldWidth, gameWorldObject.worldHeight);
		
		drawZombies(gameWorldObject.zombies);
		drawPlayers(gameWorldObject.players);
		drawBorder(gameWorldObject.worldWidth, gameWorldObject.worldHeight);
		drawDebugValues(canvas);
	}

	//internal functions


	function drawBackground()
	{
		_canvas.fillStyle = '#FFFFFF';
		_canvas.fillRect(0, 0, screenWidth, screenHeight);
	}

	function drawGrid(worldWidth, worldHeight)
	{
		//simple grid to let player have frame of reference for movement
		var gridSpacing = 100;
		var gridColor = "#999999";
		_canvas.strokeStyle = gridColor

		//needs to align to world canvas, but only draw over viewport
		var startX = -_currentViewport.getPosition().x % gridSpacing;
		if(startX < _currentViewport.getViewOffset(0,0).x) { startX += Math.floor(_currentViewport.getViewOffset(0,0).x / gridSpacing) * gridSpacing;}
		var stopX = Math.min( _currentViewport.getDimensions().x, _currentViewport.getViewOffset(worldWidth,0).x);

		var startY = -_currentViewport.getPosition().y % gridSpacing;
		if(startY < _currentViewport.getViewOffset(0,0).y) { startY+= Math.floor(_currentViewport.getViewOffset(0,0).y / gridSpacing) * gridSpacing;}
		var stopY = Math.min( _currentViewport.getDimensions().y, _currentViewport.getViewOffset(0,worldHeight).y);

		for(var i = startX; i < stopX; i += gridSpacing)
		{
			_canvas.beginPath();
			_canvas.moveTo(i, Math.max(0, _currentViewport.getViewOffset(0,0).y)); //start at top of viewport or edge of world border
			_canvas.lineTo(i, stopY );
			_canvas.stroke();
		}
		
		for(var i = startY; i < stopY; i += gridSpacing)
		{
			_canvas.beginPath();
			_canvas.moveTo(Math.max(0, _currentViewport.getViewOffset(0,0).x),i); //start at top of viewport or edge of world border
			_canvas.lineTo(stopX, i );
			_canvas.stroke();
		}


	}

	function drawZombies(zombies)
	{
		var zombieColor = '#FF0000';

		var adjustedPosition;
		var drawnZombies = 0;
		for(var i = 0; i < zombies.length; i++)
		{

			adjustedPosition = _currentViewport.getViewOffsetFromVec(zombies[i].position);

			if(_currentViewport.isInView(zombies[i].position))
			{
				drawnZombies++;
				// 'efficient' way to draw zombies
				_canvas.drawImage(zombieBlitCanvas, adjustedPosition.x - globalVals.ZOMBIE_RADIUS, adjustedPosition.y - globalVals.ZOMBIE_RADIUS);
				
				// Simple way to draw zombies
				//drawCircle(_canvas, adjustedPosition.x, adjustedPosition.y, globalVals.ZOMBIE_RADIUS, 30, zombieColor);
			}
		}
		debugLog("#zombiesDrawn", drawnZombies);
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
			drawCircle(_canvas, adjustedPosition.x, adjustedPosition.y, globalVals.PLAYER_RADIUS, 10, playerColor);
		}
	};

	function drawBorder(width, height)
	{
		var adj = _currentViewport.getViewOffset;
		var adjustedPosition;

		_canvas.lineStyle = "#0000FF"
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


